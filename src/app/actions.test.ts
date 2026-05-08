import { describe, it, expect } from 'vitest';
import { submitInquiry } from './actions';

describe('Server Actions', () => {
  it('should validate and process valid inquiry', async () => {
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('scope', 'Acoustic Windows');
    formData.append('requirements', 'I need STC 50 windows for my studio.');

    const result = await submitInquiry({}, formData);
    
    expect(result.success).toBe(true);
    expect(result.message).toContain('Technical inquiry received');
  });

  it('should return errors for invalid inquiry', async () => {
    const formData = new FormData();
    formData.append('name', 'J'); // too short
    formData.append('email', 'invalid-email');
    formData.append('scope', '');
    formData.append('requirements', 'Short');

    const result = await submitInquiry({}, formData);
    
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.name).toBeDefined();
    expect(result.errors?.email).toBeDefined();
    expect(result.errors?.scope).toBeDefined();
    expect(result.errors?.requirements).toBeDefined();
  });
});
