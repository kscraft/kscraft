import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { submitInquiry } from './actions';

const r2Mocks = vi.hoisted(() => ({
  send: vi.fn(),
  putObjectCommand: vi.fn(),
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

describe('Server Actions', () => {
  const originalEnv = {
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET: process.env.R2_BUCKET,
    R2_LEADS_PREFIX: process.env.R2_LEADS_PREFIX,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    ADMIN_EMAIL_FROM: process.env.ADMIN_EMAIL_FROM,
    LEADS_FROM_EMAIL: process.env.LEADS_FROM_EMAIL,
    RESEND_FALLBACK_FROM_EMAIL: process.env.RESEND_FALLBACK_FROM_EMAIL,
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    r2Mocks.send.mockReset();
    r2Mocks.putObjectCommand.mockClear();
    r2Mocks.send.mockResolvedValue({});
    delete process.env.R2_ACCOUNT_ID;
    delete process.env.R2_ACCESS_KEY_ID;
    delete process.env.R2_SECRET_ACCESS_KEY;
    delete process.env.R2_BUCKET;
    delete process.env.R2_LEADS_PREFIX;
    delete process.env.RESEND_API_KEY;
    delete process.env.ADMIN_EMAIL_FROM;
    delete process.env.LEADS_FROM_EMAIL;
    delete process.env.RESEND_FALLBACK_FROM_EMAIL;
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
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('phone', '+91 9876543210');
    formData.append('scope', 'Acoustic Windows');
    formData.append('requirements', 'I need STC 50 windows for my studio.');

    const result = await submitInquiry({}, formData);
    
    expect(result.success).toBe(true);
    expect(result.message).toContain('Technical inquiry received');
  });

  it('should store valid inquiry in configured R2 bucket', async () => {
    process.env.R2_ACCOUNT_ID = 'test-account';
    process.env.R2_ACCESS_KEY_ID = 'test-access-key';
    process.env.R2_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.R2_BUCKET = 'ksco-leads';
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('phone', '+91 9876543210');
    formData.append('scope', 'Acoustic Windows');
    formData.append('requirements', 'I need STC 50 windows for my studio.');

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(true);
    expect(r2Mocks.send).toHaveBeenCalledOnce();
    expect(r2Mocks.putObjectCommand).toHaveBeenCalledWith(expect.objectContaining({
      Bucket: 'ksco-leads',
      ContentType: 'application/json',
      Key: expect.stringMatching(/^leads\/\d{4}\/\d{2}\/\d{2}\//),
    }));
  });

  it('should still accept inquiry when optional R2 archive fails after email send', async () => {
    process.env.RESEND_API_KEY = 'test-resend-key';
    process.env.ADMIN_EMAIL_FROM = 'Kiran Slido Craft <leads@example.com>';
    process.env.R2_ACCOUNT_ID = 'test-account';
    process.env.R2_ACCESS_KEY_ID = 'test-access-key';
    process.env.R2_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.R2_BUCKET = 'ksco-leads';
    r2Mocks.send.mockRejectedValueOnce(new Error('R2 unavailable'));
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ id: 'email_test' }), { status: 200 }),
    );
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('phone', '+91 9876543210');
    formData.append('scope', 'Acoustic Windows');
    formData.append('requirements', 'I need STC 50 windows for my studio.');

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(true);
    expect(r2Mocks.send).toHaveBeenCalledOnce();
  });

  it('should email valid inquiry to Kiran Slido Craft inbox when configured', async () => {
    process.env.RESEND_API_KEY = 'test-resend-key';
    process.env.ADMIN_EMAIL_FROM = 'Kiran Slido Craft <leads@example.com>';
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ id: 'email_test' }), { status: 200 }),
    );
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('phone', '+91 9876543210');
    formData.append('scope', 'Acoustic Windows');
    formData.append('requirements', 'I need STC 50 windows for my studio.');

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
        body: expect.stringContaining('info@kiranslidocraft.com'),
      }),
    );
  });

  it('should retry Resend with fallback sender when configured sender domain is not verified', async () => {
    process.env.RESEND_API_KEY = 'test-resend-key';
    process.env.ADMIN_EMAIL_FROM = 'Kiran Slido Craft <info@kiranslidocraft.com>';
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(
        JSON.stringify({
          statusCode: 403,
          message: 'The kiranslidocraft.com domain is not verified.',
          name: 'validation_error',
        }),
        { status: 403 },
      ))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'email_test' }), { status: 200 }));
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('phone', '+91 9876543210');
    formData.append('scope', 'Acoustic Windows');
    formData.append('requirements', 'I need STC 50 windows for my studio.');

    const result = await submitInquiry({}, formData);

    expect(result.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1]?.[1]).toEqual(expect.objectContaining({
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
