'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid corporate email'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  scope: z.string().min(1, 'Please select a project scope'),
  requirements: z.string().min(10, 'Technical requirements must be more detailed'),
  utmSource: z.string().optional(),
});

type Inquiry = z.infer<typeof inquirySchema> & {
  timestamp: string;
};

const LEAD_RECIPIENT_EMAIL = 'info@kiranslidocraft.com';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

function getR2Client() {
  const accountId = requireEnv('R2_ACCOUNT_ID');

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requireEnv('R2_ACCESS_KEY_ID'),
      secretAccessKey: requireEnv('R2_SECRET_ACCESS_KEY'),
    },
  });
}

function getInquiryKey(timestamp: string) {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const id = randomUUID();
  const prefix = process.env.R2_LEADS_PREFIX || 'leads';

  return `${prefix}/${year}/${month}/${day}/${date.toISOString()}-${id}.json`;
}

function isR2Configured() {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET,
  );
}

function getLeadEmailHtml(inquiry: Inquiry) {
  return `
    <h2>New technical inquiry</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(inquiry.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(inquiry.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(inquiry.phone)}</td></tr>
      <tr><td><strong>Scope</strong></td><td>${escapeHtml(inquiry.scope)}</td></tr>
      <tr><td><strong>Source</strong></td><td>${escapeHtml(inquiry.utmSource || 'direct')}</td></tr>
      <tr><td><strong>Timestamp</strong></td><td>${escapeHtml(inquiry.timestamp)}</td></tr>
    </table>
    <h3>Requirements</h3>
    <p style="white-space:pre-wrap">${escapeHtml(inquiry.requirements)}</p>
  `;
}

function getLeadEmailText(inquiry: Inquiry) {
  return [
    'New technical inquiry',
    '',
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Scope: ${inquiry.scope}`,
    `Source: ${inquiry.utmSource || 'direct'}`,
    `Timestamp: ${inquiry.timestamp}`,
    '',
    'Requirements:',
    inquiry.requirements,
  ].join('\n');
}

async function sendLeadEmail(inquiry: Inquiry) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('RESEND_API_KEY is not configured');
    }

    console.info('RESEND_API_KEY is not configured; skipping lead email in development', {
      scope: inquiry.scope,
      utmSource: inquiry.utmSource,
    });
    return;
  }

  const from = process.env.LEADS_FROM_EMAIL || process.env.ADMIN_EMAIL_FROM;

  if (!from && process.env.NODE_ENV === 'production') {
    throw new Error('ADMIN_EMAIL_FROM or LEADS_FROM_EMAIL is not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: from || 'Kiran Slido Craft <onboarding@resend.dev>',
      to: [LEAD_RECIPIENT_EMAIL],
      reply_to: inquiry.email,
      subject: `Technical inquiry: ${inquiry.scope}`,
      text: getLeadEmailText(inquiry),
      html: getLeadEmailHtml(inquiry),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Lead email failed with ${response.status}: ${text}`);
  }
}

async function archiveInquiry(inquiry: Inquiry) {
  if (!isR2Configured()) {
    console.info('R2 lead archive is not configured', {
      scope: inquiry.scope,
      utmSource: inquiry.utmSource,
    });
    return;
  }

  const client = getR2Client();
  const key = getInquiryKey(inquiry.timestamp);

  await client.send(new PutObjectCommand({
    Bucket: requireEnv('R2_BUCKET'),
    Key: key,
    Body: JSON.stringify(inquiry),
    ContentType: 'application/json',
  }));
}

export async function submitInquiry(prevState: unknown, formData: FormData) {
  const validatedFields = inquirySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    scope: formData.get('scope'),
    requirements: formData.get('requirements'),
    utmSource: formData.get('utmSource') || 'direct',
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Please review your submission.',
    };
  }

  const leadData = {
    ...validatedFields.data,
    timestamp: new Date().toISOString(),
  };

  try {
    await sendLeadEmail(leadData);
  } catch (error) {
    console.error('Failed to process lead', {
      error: error instanceof Error ? error.message : 'Unknown error',
      scope: leadData.scope,
      utmSource: leadData.utmSource,
    });

    return {
      success: false,
      message: 'Inquiry service is temporarily unavailable. Please call or email our engineering team directly.',
    };
  }

  try {
    await archiveInquiry(leadData);
  } catch (error) {
    console.error('Failed to archive lead', {
      error: error instanceof Error ? error.message : 'Unknown error',
      scope: leadData.scope,
      utmSource: leadData.utmSource,
    });
  }

  console.info('Technical inquiry accepted', {
    scope: leadData.scope,
    utmSource: leadData.utmSource,
  });

  return {
    success: true,
    message: 'Technical inquiry received. Our engineering team will review your requirements and respond shortly.',
  };
}
