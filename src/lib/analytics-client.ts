/**
 * GA4 Client-side Tracking Utilities
 * These are safe to import in 'use client' components.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_PATTERN = /(?:\+?\d[\d\s().-]{7,}\d)/;
const MAX_PARAM_LENGTH = 100;
const SENSITIVE_PARAM_KEYS = new Set([
  'address',
  'comment',
  'email',
  'full_name',
  'message',
  'name',
  'page_location',
  'page_referrer',
  'phone',
  'referrer',
  'requirements',
  'search_term',
  'url',
  'user_id',
]);

function hasAnalyticsConsent() {
  if (typeof window === 'undefined') {
    return false;
  }

  const status = window.localStorage.getItem('ksc_cookie_consent');
  return status === 'accepted' || status === 'true';
}

function isLikelyDirectIdentifier(value: string) {
  return EMAIL_PATTERN.test(value) || PHONE_PATTERN.test(value);
}

function sanitizeStringParam(value: string) {
  const trimmed = value.trim();

  if (!trimmed || isLikelyDirectIdentifier(trimmed)) {
    return undefined;
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const url = new URL(trimmed);
      return `${url.origin}${url.pathname}`.slice(0, MAX_PARAM_LENGTH);
    } catch {
      return undefined;
    }
  }

  return trimmed.slice(0, MAX_PARAM_LENGTH);
}

function sanitizeAnalyticsParams(params: Record<string, unknown>) {
  const sanitized: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(params)) {
    if (SENSITIVE_PARAM_KEYS.has(key)) {
      continue;
    }

    if (typeof value === 'string') {
      const safeValue = sanitizeStringParam(value);
      if (safeValue) {
        sanitized[key] = safeValue;
      }
      continue;
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

function getQueryLengthBucket(query: string) {
  const length = query.trim().length;

  if (length === 0) return 'empty';
  if (length <= 10) return 'short';
  if (length <= 30) return 'medium';
  return 'long';
}

/**
 * Tracks a custom event on the client side using window.gtag.
 * Safely checks if gtag is available before calling.
 */
export function trackClientEvent(eventName: string, params: Record<string, unknown> = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function' && hasAnalyticsConsent()) {
      window.gtag('event', eventName, sanitizeAnalyticsParams(params));
    }
  } catch {
    // Analytics must never block navigation or other visitor actions.
  }
}

/**
 * Specifically track quote CTA clicks.
 */
export function trackQuoteClick(scope: string, location: string) {
  trackClientEvent('quote_cta_click', {
    event_category: 'engagement',
    event_label: scope,
    location_id: location
  });
}

/**
 * Track when a user starts filling a form.
 */
export function trackFormStart(formName: string) {
  trackClientEvent('form_start', {
    form_id: formName
  });
}

/**
 * Track contact link clicks.
 */
export function trackContactClick(type: 'phone' | 'email' | 'whatsapp' | 'social') {
  trackClientEvent('contact_click', {
    contact_type: type,
  });
}

/**
 * Track search queries and performance.
 */
export function trackSearch(query: string, resultsCount: number) {
  trackClientEvent('catalog_search', {
    query_length_bucket: getQueryLengthBucket(query),
    results_count: resultsCount,
    has_results: resultsCount > 0,
  });
}
