'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';
import { isIP } from 'node:net';
import { headers } from 'next/headers';
import { userAgentFromString } from 'next/server';
import { emailStrings } from '@/lib/catalog';
import {
  countryCodeRecords,
  inquirySchema,
  type InquiryInput,
} from '@/lib/inquiry-validation';
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_SUBMISSIONS = 5;
const RATE_LIMIT_MAX_BUCKETS = 2048;
const RATE_LIMIT_PRUNE_INTERVAL_MS = 60 * 1000;
const MIN_FORM_ELAPSED_MS = 500;
const MAX_FORM_ELAPSED_MS = 2 * 60 * 60 * 1000;
const allowedSubmissionHosts = new Set([
  'soundproofindia.com',
  'www.soundproofindia.com',
  'doorwindowcraft.com',
  'www.doorwindowcraft.com',
  'localhost',
  '127.0.0.1',
  '::1',
]);
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();
let lastRateLimitPruneAt = 0;

function canLogServerDiagnostics() {
  return process.env.NODE_ENV !== 'production';
}

function logServerInfo(message: string, context?: Record<string, unknown>) {
  if (canLogServerDiagnostics()) {
    console.info(message, context);
  }
}

function logServerWarn(message: string, context?: Record<string, unknown>) {
  if (canLogServerDiagnostics()) {
    console.warn(message, context);
  }
}

function logServerError(message: string, context?: Record<string, unknown>) {
  if (canLogServerDiagnostics()) {
    console.error(message, context);
  }
}

function isLatitude(value: string) {
  const number = Number(value);
  return Number.isFinite(number) && number >= -90 && number <= 90;
}

function isLongitude(value: string) {
  const number = Number(value);
  return Number.isFinite(number) && number >= -180 && number <= 180;
}

type IpDerivedGeolocation = {
  country?: string;
  region?: string;
  city?: string;
  latitude?: string;
  longitude?: string;
  timezone?: string;
  source: 'vercel' | 'cloudflare';
};
type RequestHeaders = {
  get(name: string): string | null;
};

type ClientDetails = {
  browser: string;
  deviceType: string;
  device: string;
  operatingSystem: string;
};

type Inquiry = InquiryInput & {
  timestamp: string;
  geolocation?: IpDerivedGeolocation;
  clientDetails: ClientDetails;
};
type InquiryFormErrors = Partial<Record<keyof InquiryInput | 'human', string[]>>;

export type InquiryActionState = {
  success: boolean;
  message: string;
  errors?: InquiryFormErrors;
};

function getPhoneCountryName(countryCode: string, countryName?: string) {
  if (
    countryName &&
    countryCodeRecords.some((country) => country.country === countryName && country.dialCode === countryCode)
  ) {
    return countryName;
  }

  return countryCodeRecords.find((country) => country.dialCode === countryCode)?.country;
}

function getCombinedPhone(countryCode: string, phone: string, countryName?: string) {
  const normalizedPhone = phone.replace(/\s+/g, ' ').trim();
  const resolvedCountryName = getPhoneCountryName(countryCode, countryName);

  if (!resolvedCountryName) {
    return `${countryCode} - ${normalizedPhone}`;
  }

  return `${resolvedCountryName} (${countryCode}) - ${normalizedPhone}`;
}

function hasHoneypotValue(formData: FormData) {
  const value = formData.get('website');
  return typeof value === 'string' && value.trim().length > 0;
}

function hasValidSubmissionTiming(value: FormDataEntryValue | null) {
  if (value === null && !isProductionRuntime()) {
    return true;
  }

  if (typeof value !== 'string') {
    return false;
  }

  const startedAt = Number(value);
  const elapsed = Date.now() - startedAt;

  return Number.isFinite(startedAt) && elapsed >= MIN_FORM_ELAPSED_MS && elapsed <= MAX_FORM_ELAPSED_MS;
}

function isAllowedSubmissionOrigin(requestHeaders: RequestHeaders) {
  const origin = requestHeaders.get('origin');
  const referer = requestHeaders.get('referer');
  const candidate = origin || referer;

  if (!candidate) {
    return !isProductionRuntime();
  }

  try {
    const url = new URL(candidate);
    return allowedSubmissionHosts.has(url.hostname);
  } catch {
    return false;
  }
}

function getClientIp(requestHeaders: RequestHeaders) {
  const candidates = [
    requestHeaders.get('cf-connecting-ip'),
    requestHeaders.get('x-forwarded-for')?.split(',')[0],
    requestHeaders.get('x-real-ip'),
  ];

  return candidates
    .map((candidate) => candidate?.trim())
    .find((candidate): candidate is string => Boolean(candidate && isIP(candidate)));
}

function pruneRateLimitBuckets(now: number) {
  if (
    now - lastRateLimitPruneAt < RATE_LIMIT_PRUNE_INTERVAL_MS &&
    rateLimitBuckets.size < RATE_LIMIT_MAX_BUCKETS
  ) {
    return;
  }

  for (const [ip, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) {
      rateLimitBuckets.delete(ip);
    }
  }

  lastRateLimitPruneAt = now;
}

function isRateLimited(ip: string | undefined) {
  if (!ip) {
    return false;
  }

  const now = Date.now();
  pruneRateLimitBuckets(now);
  const current = rateLimitBuckets.get(ip);

  if (!current || current.resetAt <= now) {
    if (rateLimitBuckets.size >= RATE_LIMIT_MAX_BUCKETS) {
      return true;
    }

    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_SUBMISSIONS;
}

function decodeHeaderValue(value: string | null) {
  if (!value) {
    return undefined;
  }

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getIpDerivedGeolocation(requestHeaders: RequestHeaders): IpDerivedGeolocation | undefined {
  const cloudflareCountry = decodeHeaderValue(requestHeaders.get('cf-ipcountry'));

  if (requestHeaders.get('cf-connecting-ip') && cloudflareCountry) {
    return {
      country: cloudflareCountry,
      source: 'cloudflare',
    };
  }

  const vercelCountry = decodeHeaderValue(requestHeaders.get('x-vercel-ip-country'));
  const vercelRegion = decodeHeaderValue(requestHeaders.get('x-vercel-ip-country-region'));
  const vercelCity = decodeHeaderValue(requestHeaders.get('x-vercel-ip-city'));
  const vercelLatitude = requestHeaders.get('x-vercel-ip-latitude') || undefined;
  const vercelLongitude = requestHeaders.get('x-vercel-ip-longitude') || undefined;
  const vercelTimezone = decodeHeaderValue(requestHeaders.get('x-vercel-ip-timezone'));

  if (vercelCountry || vercelRegion || vercelCity || vercelLatitude || vercelLongitude || vercelTimezone) {
    return {
      country: vercelCountry,
      region: vercelRegion,
      city: vercelCity,
      latitude: vercelLatitude && isLatitude(vercelLatitude) ? vercelLatitude : undefined,
      longitude: vercelLongitude && isLongitude(vercelLongitude) ? vercelLongitude : undefined,
      timezone: vercelTimezone,
      source: 'vercel',
    };
  }

  if (cloudflareCountry) {
    return {
      country: cloudflareCountry,
      source: 'cloudflare',
    };
  }

  return undefined;
}

function normalizeClientDetail(value: string | undefined, maxLength = 80) {
  if (!value) {
    return undefined;
  }

  const printableValue = Array.from(value, (character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127 ? ' ' : character;
  }).join('');
  const normalized = printableValue.replace(/\s+/g, ' ').trim();

  return normalized ? normalized.slice(0, maxLength) : undefined;
}

function formatClientName(name: string | undefined, version: string | undefined) {
  const normalizedName = normalizeClientDetail(name);
  const normalizedVersion = normalizeClientDetail(version, 40);

  return [normalizedName, normalizedVersion].filter(Boolean).join(' ') || 'Unknown';
}

function getDeviceTypeLabel(
  type: string | undefined,
  isMobileHint: boolean,
  hasDesktopSignal: boolean,
) {
  const deviceTypes: Record<string, string> = {
    console: 'Console',
    embedded: 'Embedded',
    mobile: 'Mobile',
    smarttv: 'Smart TV',
    tablet: 'Tablet',
    wearable: 'Wearable',
  };
  const normalizedType = normalizeClientDetail(type)?.toLowerCase();

  return (normalizedType && deviceTypes[normalizedType]) ||
    (isMobileHint ? 'Mobile' : hasDesktopSignal ? 'Desktop' : 'Unknown');
}

function getClientDetails(requestHeaders: RequestHeaders): ClientDetails {
  const userAgent = requestHeaders.get('user-agent')?.slice(0, 512);
  const platformHint = normalizeClientDetail(
    requestHeaders.get('sec-ch-ua-platform')?.replace(/^"|"$/g, ''),
  );
  const mobileHint = requestHeaders.get('sec-ch-ua-mobile');
  const fallbackDetails: ClientDetails = {
    browser: 'Unknown',
    deviceType: mobileHint === '?1' ? 'Mobile' : mobileHint === '?0' ? 'Desktop' : 'Unknown',
    device: 'Unknown',
    operatingSystem: platformHint || 'Unknown',
  };

  if (!userAgent) {
    return fallbackDetails;
  }

  try {
    const parsedUserAgent = userAgentFromString(userAgent);
    const hasDesktopSignal = mobileHint === '?0' || Boolean(
      parsedUserAgent.browser.name || parsedUserAgent.os.name,
    );
    const deviceType = parsedUserAgent.isBot
      ? 'Bot'
      : getDeviceTypeLabel(
        parsedUserAgent.device.type,
        mobileHint === '?1',
        hasDesktopSignal,
      );
    const device = [
      normalizeClientDetail(parsedUserAgent.device.vendor),
      normalizeClientDetail(parsedUserAgent.device.model),
    ].filter(Boolean).join(' ');

    return {
      browser: formatClientName(parsedUserAgent.browser.name, parsedUserAgent.browser.version),
      deviceType,
      device: device || 'Unknown',
      operatingSystem: formatClientName(
        parsedUserAgent.os.name || platformHint,
        parsedUserAgent.os.version,
      ),
    };
  } catch {
    return fallbackDetails;
  }
}

const LEAD_RECIPIENT_EMAIL = 'info@kiranslidocraft.com';
const RESEND_TEST_FALLBACK_FROM = 'Kiran Slido Craft <onboarding@resend.dev>';
const SKIP_LEAD_DELIVERY_VALUES = new Set(['1', 'true', 'yes']);
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

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

function isProductionRuntime() {
  return process.env.NODE_ENV === 'production' && process.env.VERCEL === '1';
}

async function verifyHumanChallenge(token: FormDataEntryValue | null, clientIp: string | undefined) {
  const secret = process.env.TURNSTILE_SECRET;

  if (!secret) {
    logServerError('TURNSTILE_SECRET is not configured for form verification');
    return { success: false };
  }

  if (typeof token !== 'string' || token.trim().length === 0) {
    return { success: false };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: clientIp || '',
  });

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (!response.ok) {
      logServerError('Turnstile verification request failed', {
        status: response.status,
      });
      return { success: false };
    }

    const payload = await response.json() as { success?: boolean };
    return { success: payload.success === true };
  } catch (error) {
    logServerError('Turnstile verification failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return { success: false };
  }
}

function getLeadEmailHtml(inquiry: Inquiry) {
  const { labels } = emailStrings;
  const geolocation = inquiry.geolocation
    ? [
      inquiry.geolocation.city,
      inquiry.geolocation.region,
      inquiry.geolocation.country,
      inquiry.geolocation.latitude && inquiry.geolocation.longitude
        ? `${inquiry.geolocation.latitude}, ${inquiry.geolocation.longitude}`
        : undefined,
      inquiry.geolocation.timezone,
      `source: ${inquiry.geolocation.source}`,
    ].filter(Boolean).join(' | ')
    : 'not provided by host';

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
      <tr><td><strong>${labels.geolocation}</strong></td><td>${escapeHtml(geolocation)}</td></tr>
      <tr><td><strong>${labels.browser}</strong></td><td>${escapeHtml(inquiry.clientDetails.browser)}</td></tr>
      <tr><td><strong>${labels.deviceType}</strong></td><td>${escapeHtml(inquiry.clientDetails.deviceType)}</td></tr>
      <tr><td><strong>${labels.device}</strong></td><td>${escapeHtml(inquiry.clientDetails.device)}</td></tr>
      <tr><td><strong>${labels.operatingSystem}</strong></td><td>${escapeHtml(inquiry.clientDetails.operatingSystem)}</td></tr>
      <tr><td><strong>${labels.timestamp}</strong></td><td>${escapeHtml(inquiry.timestamp)}</td></tr>
    </table>
    <h3>${labels.requirements}</h3>
    <p style="white-space:pre-wrap">${escapeHtml(inquiry.requirements)}</p>
  `;
}

function getLeadEmailText(inquiry: Inquiry) {
  const { labels } = emailStrings;
  const geolocation = inquiry.geolocation
    ? [
      inquiry.geolocation.city,
      inquiry.geolocation.region,
      inquiry.geolocation.country,
      inquiry.geolocation.latitude && inquiry.geolocation.longitude
        ? `${inquiry.geolocation.latitude}, ${inquiry.geolocation.longitude}`
        : undefined,
      inquiry.geolocation.timezone,
      `source: ${inquiry.geolocation.source}`,
    ].filter(Boolean).join(' | ')
    : 'not provided by host';

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
    `${labels.geolocation}: ${geolocation}`,
    `${labels.browser}: ${inquiry.clientDetails.browser}`,
    `${labels.deviceType}: ${inquiry.clientDetails.deviceType}`,
    `${labels.device}: ${inquiry.clientDetails.device}`,
    `${labels.operatingSystem}: ${inquiry.clientDetails.operatingSystem}`,
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
    logServerInfo('Lead email delivery skipped by test configuration', {
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

    logServerInfo('RESEND_API_KEY is not configured; skipping lead email in development', {
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

    logServerWarn('Lead email sender domain is not verified; retrying with Resend fallback sender', {
      scope: inquiry.scope,
      city: inquiry.city,
      utmSource: inquiry.utmSource,
    });
    await postLeadEmail(apiKey, fallbackFrom, inquiry);
  }
}

async function archiveInquiry(inquiry: Inquiry) {
  if (shouldSkipLeadDelivery()) {
    logServerInfo('Lead archive skipped by test configuration', {
      scope: inquiry.scope,
      city: inquiry.city,
      utmSource: inquiry.utmSource,
    });
    return;
  }

  if (!isR2Configured()) {
    logServerInfo('R2 lead archive is not configured', {
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

export async function submitInquiry(_prevState: unknown, formData: FormData): Promise<InquiryActionState> {
  const requestHeaders = await headers();
  const clientIp = getClientIp(requestHeaders);

  if (
    !isAllowedSubmissionOrigin(requestHeaders) ||
    hasHoneypotValue(formData) ||
    isRateLimited(clientIp)
  ) {
    return {
      success: false,
      message: emailStrings.messages.validationError,
    };
  }

  const validatedFields = inquirySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    countryCode: formData.get('countryCode'),
    countryName: formData.get('countryName') || undefined,
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
      errors: validatedFields.error.flatten().fieldErrors as InquiryFormErrors,
      message: emailStrings.messages.validationError,
    };
  }

  if (!hasValidSubmissionTiming(formData.get('formStartedAt'))) {
    return {
      success: false,
      message: emailStrings.messages.validationError,
    };
  }

  const humanVerification = await verifyHumanChallenge(
    formData.get('cf-turnstile-response'),
    clientIp,
  );

  if (!humanVerification.success) {
    return {
      success: false,
      errors: {
        human: [emailStrings.messages.humanVerificationError],
      },
      message: emailStrings.messages.humanVerificationError,
    };
  }

  const leadData = {
    ...validatedFields.data,
    phone: getCombinedPhone(
      validatedFields.data.countryCode,
      validatedFields.data.phone,
      validatedFields.data.countryName,
    ),
    geolocation: getIpDerivedGeolocation(requestHeaders),
    clientDetails: getClientDetails(requestHeaders),
    timestamp: new Date().toISOString(),
  };

  try {
    await sendLeadEmail(leadData);
  } catch (error) {
    logServerError('Failed to process lead email', {
      error: error instanceof Error ? error.message : 'Unknown error',
      scope: leadData.scope,
      city: leadData.city,
      utmSource: leadData.utmSource,
    });

    // We allow lead submission to proceed even if email fails in non-production or test-like environments
    // to allow validation of the rest of the flow (archiving, success UI).
    if (isProductionRuntime()) {
      return {
        success: false,
        message: emailStrings.messages.error,
      };
    }
  }

  try {
    await archiveInquiry(leadData);
  } catch (error) {
    logServerError('Failed to archive lead', {
      error: error instanceof Error ? error.message : 'Unknown error',
      scope: leadData.scope,
      city: leadData.city,
      utmSource: leadData.utmSource,
    });
  }

  logServerInfo('Technical inquiry accepted', {
    scope: leadData.scope,
    city: leadData.city,
    utmSource: leadData.utmSource,
  });

  return {
    success: true,
    message: emailStrings.messages.success,
  };
}
