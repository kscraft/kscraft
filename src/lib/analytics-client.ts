/**
 * GA4 Client-side Tracking Utilities
 * These are safe to import in 'use client' components.
 */

/**
 * Tracks a custom event on the client side using window.gtag.
 * Safely checks if gtag is available before calling.
 */
export function trackClientEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag('event', eventName, params);
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
export function trackContactClick(type: 'phone' | 'email' | 'whatsapp' | 'social', value: string) {
  trackClientEvent('contact_click', {
    contact_type: type,
    contact_value: value
  });
}

/**
 * Track search queries and performance.
 */
export function trackSearch(query: string, resultsCount: number) {
  trackClientEvent('search', {
    search_term: query,
    results_count: resultsCount
  });
}
