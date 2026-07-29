import { describe, expect, it } from 'vitest';
import { inquirySchema, validateInquiryField } from './inquiry-validation';

describe('inquiry validation', () => {
  it('accepts valid values for every interactive field', () => {
    expect(validateInquiryField('name', 'Test User')).toBeUndefined();
    expect(validateInquiryField('email', 'test@example.com')).toBeUndefined();
    expect(validateInquiryField('phone', '98765 43210')).toBeUndefined();
    expect(validateInquiryField('countryCode', '+91')).toBeUndefined();
    expect(validateInquiryField('city', 'Mumbai')).toBeUndefined();
    expect(validateInquiryField('scope', 'Acoustic Windows')).toBeUndefined();
    expect(validateInquiryField('requirements', 'Need acoustic windows for a residential bedroom.')).toBeUndefined();
  });

  it('returns actionable field-specific errors', () => {
    expect(validateInquiryField('name', '1')).toBe('Name must be at least 2 characters');
    expect(validateInquiryField('email', 'not-an-email')).toBe('Please enter a valid email address');
    expect(validateInquiryField('phone', '111111')).toBe('Please enter a valid phone number');
    expect(validateInquiryField('city', 'zzzzz')).toBe('Please enter a real project city');
    expect(validateInquiryField('requirements', 'Too short')).toBe(
      'Please describe your project requirements in a sentence',
    );
  });

  it('keeps country name and dialing code validation in the shared server schema', () => {
    const result = inquirySchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      countryCode: '+91',
      countryName: 'United States',
      city: 'Mumbai',
      scope: 'Acoustic Windows',
      requirements: 'Need acoustic windows for a residential bedroom.',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.countryCode).toContain(
        'Please select a valid country code',
      );
    }
  });
});
