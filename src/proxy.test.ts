import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { proxy } from './proxy';

describe('proxy contact request protection', () => {
  it('rejects oversized contact submissions', () => {
    const response = proxy(new NextRequest('https://soundproofindia.com/contact', {
      method: 'POST',
      headers: {
        'content-length': String((64 * 1024) + 1),
        'content-type': 'multipart/form-data; boundary=test',
      },
    }));

    expect(response.status).toBe(413);
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('rejects unsupported contact submission content types', () => {
    const response = proxy(new NextRequest('https://soundproofindia.com/contact', {
      method: 'POST',
      headers: {
        'content-length': '100',
        'content-type': 'application/json',
      },
    }));

    expect(response.status).toBe(415);
  });

  it('allows normal form-encoded contact submissions through', () => {
    const response = proxy(new NextRequest('https://soundproofindia.com/contact', {
      method: 'POST',
      headers: {
        'content-length': '100',
        'content-type': 'application/x-www-form-urlencoded',
      },
    }));

    expect(response.status).toBe(200);
    expect(response.headers.get('x-middleware-next')).toBe('1');
  });
});
