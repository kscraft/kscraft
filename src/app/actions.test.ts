import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { submitInquiry } from './actions';

const r2Mocks = vi.hoisted(() => ({
  send: vi.fn(),
  putObjectCommand: vi.fn(),
}));

const headerMocks = vi.hoisted(() => ({
  headers: vi.fn(),
}));

vi.mock('@aws-sdk/client-s3', () => ({
  S3Client: vi.fn().mockImplementation(function MockS3Client() {
    return { send: r2Mocks.send };
  }),
  PutObjectCommand: vi.fn().mockImplementation(function MockPutObjectCommand(input) {
    r2Mocks.putObjectCommand(input);
    return { input };
  }),
}));

vi.mock('next/headers', () => ({
  headers: headerMocks.headers,
}));

function mockRequestHeaders(values: Record<string, string> = {}) {
  const normalized = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key.toLowerCase(), value]),
  );

  headerMocks.headers.mockResolvedValue({
    get: (name: string) => normalized[name.toLowerCase()] ?? null,
  });
}

function getValidFormData(overrides: Record<string, string> = {}) {
  const formData = new FormData();
  const values = {
    name: 'John Doe',
    email: 'john@example.com',
    countryCode: '+91',
    countryName: 'India',
    phone: '9876543210',
    city: 'Mumbai',
    scope: 'Acoustic Windows',
    requirements: 'I need STC 50 windows for my studio.',
    ...overrides,
  };

  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append('cf-turnstile-response', 'unit-test-token');

  return formData;
}

describe('Server Actions', () => {
  const originalEnv = {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET: process.env.R2_BUCKET,
    R2_LEADS_PREFIX: process.env.R2_LEADS_PREFIX,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    ADMIN_EMAIL_FROM: process.env.ADMIN_EMAIL_FROM,
    LEADS_FROM_EMAIL: process.env.LEADS_FROM_EMAIL,
    RESEND_FALLBACK_FROM_EMAIL: process.env.RESEND_FALLBACK_FROM_EMAIL,
    SKIP_LEAD_DELIVERY: process.env.SKIP_LEAD_DELIVERY,
    TURNSTILE_SECRET: process.env.TURNSTILE_SECRET,
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    r2Mocks.send.mockReset();
    r2Mocks.putObjectCommand.mockClear();
    r2Mocks.send.mockResolvedValue({});
    headerMocks.headers.mockReset();
    mockRequestHeaders();
    delete process.env.R2_ACCOUNT_ID;
    delete process.env.R2_ACCESS_KEY_ID;
    delete process.env.R2_SECRET_ACCESS_KEY;
    delete process.env.R2_BUCKET;
    delete process.env.R2_LEADS_PREFIX;
    delete process.env.RESEND_API_KEY;
    delete process.env.ADMIN_EMAIL_FROM;
    delete process.env.LEADS_FROM_EMAIL;
    delete process.env.RESEND_FALLBACK_FROM_EMAIL;
    delete process.env.SKIP_LEAD_DELIVERY;
    process.env.TURNSTILE_SECRET = 'unit-test-secret-placeholder';
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      if (input === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }

      throw new Error(`Unexpected fetch in test: ${String(input)}`);
    });
  });

  afterEach(() => {
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value) {
        process.env[key] = value;
      } else {
        delete process.env[key];
      }
    });
  });

  it('should validate and process valid inquiry', async () => {
    const formData = getValidFormData();

    const result = await submitInquiry({}, formData);
    
    expect(result.success).toBe(true);
    expect(result.message).toContain('Technical inquiry received');
  });

  it.each([
    'Nilesh Chakraborty',
    'Amit D. Shah',
    "Mary O'Connor",
    'Jean-Luc Martin',
  ])('should accept human name format: %s', async (name) => {
    const formData = getValidFormData({ name });

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(true);
  });

  it('should reject generated-looking name spam', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const formData = new FormData();
    formData.append('name', 'BNhmhChcMSgxJQVzeJP');
    formData.append('email', 'john@example.com');
    formData.append('countryCode', '+91');
    formData.append('phone', '9876543210');
    formData.append('city', 'Mumbai');
    formData.append('scope', 'Acoustic Windows');
    formData.append('requirements', 'I need STC 50 windows for my studio.');

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.name).toContain('Please enter your real full name');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(r2Mocks.send).not.toHaveBeenCalled();
  });

  it('should reject names with digits or symbols', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const formData = new FormData();
    formData.append('name', 'John Doe 123');
    formData.append('email', 'john@example.com');
    formData.append('countryCode', '+91');
    formData.append('phone', '9876543210');
    formData.append('city', 'Mumbai');
    formData.append('scope', 'Acoustic Windows');
    formData.append('requirements', 'I need STC 50 windows for my studio.');

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.name).toContain('Please enter your real full name');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(r2Mocks.send).not.toHaveBeenCalled();
  });

  it('should reject screenshot-style generated inquiry values', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const formData = new FormData();
    formData.append('name', 'BNhmhChcMSgxJQVzeJP');
    formData.append('email', 'g.ayaz.uq.u.z.i.p271@gmail.com');
    formData.append('countryCode', '+91');
    formData.append('phone', '4579841806');
    formData.append('city', 'Vnwsre');
    formData.append('scope', 'Acoustic Windows');
    formData.append('requirements', 'IAKjlcSSJZavlyzCAI');

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.name).toBeDefined();
    expect(result.errors?.email).toBeDefined();
    expect(result.errors?.city).toBeDefined();
    expect(result.errors?.requirements).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(r2Mocks.send).not.toHaveBeenCalled();
  });

  it('should reject invalid phone, scope, and requirements fields', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('countryCode', '+91');
    formData.append('phone', 'call-me-now');
    formData.append('city', 'Mumbai');
    formData.append('scope', 'Fake Product');
    formData.append('requirements', 'RandomTokenOnlyWithoutSpaces');

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.phone).toBeDefined();
    expect(result.errors?.scope).toBeDefined();
    expect(result.errors?.requirements).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(r2Mocks.send).not.toHaveBeenCalled();
  });

  it('should reject technical requirements over the LinkedIn post character limit', async () => {
    const formData = getValidFormData({
      requirements: 'Acoustic window project details for validation. '.repeat(80),
    });

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.requirements?.[0]).toContain('3000 characters');
  });

  it('should reject invalid country code values', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('countryCode', '+999');
    formData.append('phone', '9876543210');
    formData.append('city', 'Mumbai');
    formData.append('scope', 'Acoustic Windows');
    formData.append('requirements', 'I need STC 50 windows for my studio.');

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.countryCode).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(r2Mocks.send).not.toHaveBeenCalled();
  });

  it('should reject honeypot-filled submissions before delivery', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const formData = getValidFormData({ website: 'https://spam.example' });

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(r2Mocks.send).not.toHaveBeenCalled();
  });

  it('should reject submissions that complete too quickly when timing is supplied', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const formData = getValidFormData({ formStartedAt: Date.now().toString() });

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(r2Mocks.send).not.toHaveBeenCalled();
  });

  it('should reject submissions from disallowed origins', async () => {
    mockRequestHeaders({ origin: 'https://spam.example' });
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const formData = getValidFormData();

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(r2Mocks.send).not.toHaveBeenCalled();
  });

  it('should rate limit repeated submissions from the same IP', async () => {
    process.env.SKIP_LEAD_DELIVERY = '1';
    mockRequestHeaders({ 'x-forwarded-for': '203.0.113.77' });

    for (let index = 0; index < 5; index += 1) {
      const result = await submitInquiry({}, getValidFormData());
      expect(result.success).toBe(true);
    }

    const blocked = await submitInquiry({}, getValidFormData());

    expect(blocked.success).toBe(false);
  });

  it('should rate limit by Cloudflare client IP when forwarded proxy IPs change', async () => {
    process.env.SKIP_LEAD_DELIVERY = '1';

    for (let index = 0; index < 5; index += 1) {
      mockRequestHeaders({
        'cf-connecting-ip': '203.0.113.88',
        'x-forwarded-for': `198.51.100.${index + 1}`,
      });
      const result = await submitInquiry({}, getValidFormData());
      expect(result.success).toBe(true);
    }

    mockRequestHeaders({
      'cf-connecting-ip': '203.0.113.88',
      'x-forwarded-for': '198.51.100.99',
    });
    const blocked = await submitInquiry({}, getValidFormData());

    expect(blocked.success).toBe(false);
  });

  it('should store valid inquiry in configured R2 bucket', async () => {
    process.env.R2_ACCOUNT_ID = 'test-account';
    process.env.R2_ACCESS_KEY_ID = 'test-access-key';
    process.env.R2_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.R2_BUCKET = 'ksco-leads';
    mockRequestHeaders({
      'x-vercel-ip-country': 'IN',
      'x-vercel-ip-country-region': 'MH',
      'x-vercel-ip-city': 'Mumbai',
      'x-vercel-ip-latitude': '19.0760',
      'x-vercel-ip-longitude': '72.8777',
      'x-vercel-ip-timezone': 'Asia%2FKolkata',
    });
    const formData = getValidFormData();

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(true);
    expect(r2Mocks.send).toHaveBeenCalledOnce();
    expect(r2Mocks.putObjectCommand).toHaveBeenCalledWith(expect.objectContaining({
      Bucket: 'ksco-leads',
      ContentType: 'application/json',
      Key: expect.stringMatching(/^leads\/\d{4}\/\d{2}\/\d{2}\//),
    }));
    const archivedLead = JSON.parse(r2Mocks.putObjectCommand.mock.calls[0]?.[0].Body);
    expect(archivedLead.phone).toBe('India (+91) - 9876543210');
    expect(archivedLead.geolocation).toEqual({
      country: 'IN',
      region: 'MH',
      city: 'Mumbai',
      latitude: '19.0760',
      longitude: '72.8777',
      timezone: 'Asia/Kolkata',
      source: 'vercel',
    });
  });

  it('should prefer Cloudflare IP geolocation when the request passed through Cloudflare', async () => {
    process.env.R2_ACCOUNT_ID = 'test-account';
    process.env.R2_ACCESS_KEY_ID = 'test-access-key';
    process.env.R2_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.R2_BUCKET = 'ksco-leads';
    mockRequestHeaders({
      'cf-connecting-ip': '203.0.113.89',
      'cf-ipcountry': 'IN',
      'x-vercel-ip-country': 'US',
      'x-vercel-ip-city': 'San%20Jose',
    });

    const result = await submitInquiry({}, getValidFormData());

    expect(result.success).toBe(true);
    const archivedLead = JSON.parse(r2Mocks.putObjectCommand.mock.calls[0]?.[0].Body);
    expect(archivedLead.geolocation).toEqual({
      country: 'IN',
      source: 'cloudflare',
    });
  });

  it('should still accept inquiry when optional R2 archive fails after email send', async () => {
    process.env.RESEND_API_KEY = 'test-resend-key';
    process.env.ADMIN_EMAIL_FROM = 'Kiran Slido Craft <leads@example.com>';
    process.env.R2_ACCOUNT_ID = 'test-account';
    process.env.R2_ACCESS_KEY_ID = 'test-access-key';
    process.env.R2_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.R2_BUCKET = 'ksco-leads';
    r2Mocks.send.mockRejectedValueOnce(new Error('R2 unavailable'));
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      if (input === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }

      return new Response(JSON.stringify({ id: 'email_test' }), { status: 200 });
    });
    const formData = getValidFormData();

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(true);
    expect(r2Mocks.send).toHaveBeenCalledOnce();
  });

  it('should email valid inquiry to Kiran Slido Craft inbox when configured', async () => {
    process.env.RESEND_API_KEY = 'test-resend-key';
    process.env.ADMIN_EMAIL_FROM = 'Kiran Slido Craft <leads@example.com>';
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      if (input === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }

      return new Response(JSON.stringify({ id: 'email_test' }), { status: 200 });
    });
    const formData = getValidFormData();

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.resend.com/emails',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: 'Bearer test-resend-key',
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('India (+91) - 9876543210'),
      }),
    );
  });

  it('should skip external lead delivery when test delivery is disabled', async () => {
    process.env.SKIP_LEAD_DELIVERY = '1';
    process.env.RESEND_API_KEY = 'test-resend-key';
    process.env.ADMIN_EMAIL_FROM = 'Kiran Slido Craft <leads@example.com>';
    process.env.R2_ACCOUNT_ID = 'test-account';
    process.env.R2_ACCESS_KEY_ID = 'test-access-key';
    process.env.R2_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.R2_BUCKET = 'ksco-leads';
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const formData = getValidFormData();

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      expect.objectContaining({ method: 'POST' }),
    );
    expect(r2Mocks.send).not.toHaveBeenCalled();
  });

  it('should reject inquiry when human verification is required but missing', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('countryCode', '+91');
    formData.append('phone', '9876543210');
    formData.append('city', 'Mumbai');
    formData.append('scope', 'Acoustic Windows');
    formData.append('requirements', 'I need STC 50 windows for my studio.');

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain('human verification');
    expect(result.errors?.human).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(r2Mocks.send).not.toHaveBeenCalled();
  });

  it('should fail closed when the server secret is missing', async () => {
    delete process.env.TURNSTILE_SECRET;
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('countryCode', '+91');
    formData.append('phone', '9876543210');
    formData.append('city', 'Mumbai');
    formData.append('scope', 'Acoustic Windows');
    formData.append('requirements', 'I need STC 50 windows for my studio.');
    formData.append('cf-turnstile-response', 'test-token');

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain('human verification');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(r2Mocks.send).not.toHaveBeenCalled();
  });

  it('should fail closed when siteverify does not return success true', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: false }), { status: 200 }),
    );

    const result = await submitInquiry({}, getValidFormData());

    expect(result.success).toBe(false);
    expect(result.errors?.human).toBeDefined();
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(r2Mocks.send).not.toHaveBeenCalled();
  });

  it('should not write console logs in production failure paths', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    process.env.VERCEL = '1';
    delete process.env.TURNSTILE_SECRET;
    mockRequestHeaders({ origin: 'https://soundproofindia.com' });
    const infoMock = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const warnMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const errorMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const formData = getValidFormData({
      formStartedAt: String(Date.now() - 1000),
    });
    formData.append('cf-turnstile-response', 'test-token');

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(false);
    expect(infoMock).not.toHaveBeenCalled();
    expect(warnMock).not.toHaveBeenCalled();
    expect(errorMock).not.toHaveBeenCalled();
  });

  it('should verify Turnstile token before sending configured lead email', async () => {
    process.env.RESEND_API_KEY = 'test-resend-key';
    process.env.ADMIN_EMAIL_FROM = 'Kiran Slido Craft <leads@example.com>';
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify({ success: true }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'email_test' }), { status: 200 }));
    mockRequestHeaders({ 'x-forwarded-for': '203.0.113.42' });
    const formData = getValidFormData();

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0]?.[0]).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    const verifyRequest = fetchMock.mock.calls[0]?.[1];
    expect(verifyRequest).toEqual(expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }));
    expect(verifyRequest?.body).toBeInstanceOf(URLSearchParams);
    expect((verifyRequest?.body as URLSearchParams).get('response')).toBe('unit-test-token');
    expect((verifyRequest?.body as URLSearchParams).get('remoteip')).toBe('203.0.113.42');
    expect(fetchMock.mock.calls[1]?.[0]).toBe('https://api.resend.com/emails');
  });

  it('should retry Resend with fallback sender when configured sender domain is not verified', async () => {
    process.env.RESEND_API_KEY = 'test-resend-key';
    process.env.ADMIN_EMAIL_FROM = 'Kiran Slido Craft <info@kiranslidocraft.com>';
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify({ success: true }), { status: 200 }))
      .mockResolvedValueOnce(new Response(
        JSON.stringify({
          statusCode: 403,
          message: 'The kiranslidocraft.com domain is not verified.',
          name: 'validation_error',
        }),
        { status: 403 },
      ))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'email_test' }), { status: 200 }));
    const formData = getValidFormData();

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock.mock.calls[2]?.[1]).toEqual(expect.objectContaining({
      body: expect.stringContaining('onboarding@resend.dev'),
    }));
  });

  it('should return errors for invalid inquiry', async () => {
    const formData = new FormData();
    formData.append('name', 'J'); // too short
    formData.append('email', 'invalid-email');
    formData.append('phone', '123');
    formData.append('scope', '');
    formData.append('requirements', 'Short');

    const result = await submitInquiry({}, formData);
    
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.name).toBeDefined();
    expect(result.errors?.email).toBeDefined();
    expect(result.errors?.phone).toBeDefined();
    expect(result.errors?.scope).toBeDefined();
    expect(result.errors?.requirements).toBeDefined();
  });
});
