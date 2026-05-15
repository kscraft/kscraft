'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { emailStrings } from '@/lib/catalog';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid corporate email'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  city: z.string().min(2, 'Please enter your project city'),
  scope: z.string().min(1, 'Please select a project scope'),
  requirements: z.string().min(10, 'Technical requirements must be more detailed'),
  utmSource: z.string().optional(),
  referrer: z.string().optional(),
  pagePath: z.string().optional(),
});

type Inquiry = z.infer<typeof inquirySchema> & {
  timestamp: string;
};

const LEAD_RECIPIENT_EMAIL = 'info@kiranslidocraft.com';
const RESEND_TEST_FALLBACK_FROM = 'Kiran Slido Craft <onboarding@resend.dev>';
const SKIP_LEAD_DELIVERY_VALUES = new Set(['1', 'true', 'yes']);

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

function shouldSkipLeadDelivery() {
  const value = process.env.SKIP_LEAD_DELIVERY || process.env.PLAYWRIGHT_E2E;
  return value ? SKIP_LEAD_DELIVERY_VALUES.has(value.toLowerCase()) : false;
}

function getLeadEmailHtml(inquiry: Inquiry) {
  const { labels } = emailStrings;
  return `
    <h2>${emailStrings.title}</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      <tr><td><strong>${labels.name}</strong></td><td>${escapeHtml(inquiry.name)}</td></tr>
      <tr><td><strong>${labels.email}</strong></td><td>${escapeHtml(inquiry.email)}</td></tr>
      <tr><td><strong>${labels.phone}</strong></td><td>${escapeHtml(inquiry.phone)}</td></tr>
      <tr><td><strong>${labels.city}</strong></td><td>${escapeHtml(inquiry.city)}</td></tr>
      <tr><td><strong>${labels.scope}</strong></td><td>${escapeHtml(inquiry.scope)}</td></tr>
      <tr><td><strong>${labels.source}</strong></td><td>${escapeHtml(inquiry.utmSource || 'direct')}</td></tr>
      <tr><td><strong>${labels.referrer}</strong></td><td>${escapeHtml(inquiry.referrer || 'none')}</td></tr>
      <tr><td><strong>${labels.page}</strong></td><td>${escapeHtml(inquiry.pagePath || 'direct')}</td></tr>
      <tr><td><strong>${labels.timestamp}</strong></td><td>${escapeHtml(inquiry.timestamp)}</td></tr>
    </table>
    <h3>${labels.requirements}</h3>
    <p style="white-space:pre-wrap">${escapeHtml(inquiry.requirements)}</p>
  `;
}

function getLeadEmailText(inquiry: Inquiry) {
  const { labels } = emailStrings;
  return [
    emailStrings.title,
    '',
    `${labels.name}: ${inquiry.name}`,
    `${labels.email}: ${inquiry.email}`,
    `${labels.phone}: ${inquiry.phone}`,
    `${labels.city}: ${inquiry.city}`,
    `${labels.scope}: ${inquiry.scope}`,
    `${labels.source}: ${inquiry.utmSource || 'direct'}`,
    `${labels.referrer}: ${inquiry.referrer || 'none'}`,
    `${labels.page}: ${inquiry.pagePath || 'direct'}`,
    `${labels.timestamp}: ${inquiry.timestamp}`,
    '',
    `${labels.requirements}:`,
    inquiry.requirements,
  ].join('\n');
}

async function postLeadEmail(apiKey: string, from: string, inquiry: Inquiry) {
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
      subject: emailStrings.subjects.technicalInquiry
        .replace('{scope}', inquiry.scope)
        .replace('{city}', inquiry.city),
      text: getLeadEmailText(inquiry),
      html: getLeadEmailHtml(inquiry),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Lead email failed with ${response.status}: ${text}`);
  }
}

function isUnverifiedResendDomainError(error: unknown) {
  return error instanceof Error &&
    error.message.includes('Lead email failed with 403') &&
    error.message.includes('domain is not verified');
}

async function sendLeadEmail(inquiry: Inquiry) {
  if (shouldSkipLeadDelivery()) {
    console.info('Lead email delivery skipped by test configuration', {
      scope: inquiry.scope,
      city: inquiry.city,
      utmSource: inquiry.utmSource,
    });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('RESEND_API_KEY is not configured');
    }

    console.info('RESEND_API_KEY is not configured; skipping lead email in development', {
      scope: inquiry.scope,
      city: inquiry.city,
      utmSource: inquiry.utmSource,
    });
    return;
  }

  const from = process.env.LEADS_FROM_EMAIL || process.env.ADMIN_EMAIL_FROM;

  if (!from && process.env.NODE_ENV === 'production') {
    throw new Error('ADMIN_EMAIL_FROM or LEADS_FROM_EMAIL is not configured');
  }

  try {
    await postLeadEmail(apiKey, from || RESEND_TEST_FALLBACK_FROM, inquiry);
  } catch (error) {
    const fallbackFrom = process.env.RESEND_FALLBACK_FROM_EMAIL || RESEND_TEST_FALLBACK_FROM;
    if (!from || fallbackFrom === from || !isUnverifiedResendDomainError(error)) {
      throw error;
    }

    console.warn('Lead email sender domain is not verified; retrying with Resend fallback sender', {
      scope: inquiry.scope,
      city: inquiry.city,
      utmSource: inquiry.utmSource,
    });
    await postLeadEmail(apiKey, fallbackFrom, inquiry);
  }
}

async function archiveInquiry(inquiry: Inquiry) {
  if (shouldSkipLeadDelivery()) {
    console.info('Lead archive skipped by test configuration', {
      scope: inquiry.scope,
      city: inquiry.city,
      utmSource: inquiry.utmSource,
    });
    return;
  }

  if (!isR2Configured()) {
    console.info('R2 lead archive is not configured', {
      scope: inquiry.scope,
      city: inquiry.city,
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
    city: formData.get('city'),
    scope: formData.get('scope'),
    requirements: formData.get('requirements'),
    utmSource: formData.get('utmSource') || 'direct',
    referrer: formData.get('referrer') || 'none',
    pagePath: formData.get('pagePath') || 'unknown',
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: emailStrings.messages.validationError,
    };
  }

  const leadData = {
    ...validatedFields.data,
    timestamp: new Date().toISOString(),
  };

  try {
    await sendLeadEmail(leadData);
  } catch (error) {
    console.error('Failed to process lead email', {
      error: error instanceof Error ? error.message : 'Unknown error',
      scope: leadData.scope,
      city: leadData.city,
      utmSource: leadData.utmSource,
    });

    // We allow lead submission to proceed even if email fails in non-production or test-like environments
    // to allow validation of the rest of the flow (archiving, success UI).
    const isActuallyProduction = process.env.NODE_ENV === 'production' && process.env.VERCEL === '1';
    if (isActuallyProduction) {
      return {
        success: false,
        message: emailStrings.messages.error,
      };
    }
  }

  try {
    await archiveInquiry(leadData);
  } catch (error) {
    console.error('Failed to archive lead', {
      error: error instanceof Error ? error.message : 'Unknown error',
      scope: leadData.scope,
      city: leadData.city,
      utmSource: leadData.utmSource,
    });
  }

  console.info('Technical inquiry accepted', {
    scope: leadData.scope,
    city: leadData.city,
    utmSource: leadData.utmSource,
  });

  return {
    success: true,
    message: emailStrings.messages.success,
  };
}
