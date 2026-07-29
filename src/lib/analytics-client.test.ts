import { beforeEach, describe, expect, it, vi } from 'vitest';
import { trackClientEvent, trackSearch } from './analytics-client';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

describe('analytics-client privacy guard', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.gtag = vi.fn();
  });

  it('does not send events before analytics consent', () => {
    trackClientEvent('contact_click', { contact_type: 'email' });

    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('drops sensitive keys and direct identifiers from event parameters', () => {
    window.localStorage.setItem('ksc_cookie_consent', 'accepted');

    trackClientEvent('generate_lead', {
      form_id: 'contact_form',
      email: 'buyer@example.com',
      phone: '+91 93240 84590',
      requirements: 'Need acoustic glazing',
      product: 'sound-proof-windows',
    });

    expect(window.gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      form_id: 'contact_form',
      product: 'sound-proof-windows',
    });
  });

  it('tracks search intent without sending raw search terms', () => {
    window.localStorage.setItem('ksc_cookie_consent', 'accepted');

    trackSearch('buyer@example.com sliding window', 2);

    expect(window.gtag).toHaveBeenCalledWith('event', 'catalog_search', {
      query_length_bucket: 'long',
      results_count: 2,
      has_results: true,
    });
  });

  it('does not throw when analytics storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage unavailable', 'SecurityError');
    });

    expect(() => trackClientEvent('formal_quote_form_redirect')).not.toThrow();
  });

  it('does not throw when the analytics provider fails', () => {
    window.localStorage.setItem('ksc_cookie_consent', 'accepted');
    window.gtag = vi.fn(() => {
      throw new Error('Provider unavailable');
    });

    expect(() => trackClientEvent('formal_quote_form_redirect')).not.toThrow();
  });
});
