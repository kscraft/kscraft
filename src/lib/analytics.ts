/**
 * Google Analytics 4 (GA4) Integration Utilities
 * 
 * 1. Data API: Fetching report data from GA4 for dashboards.
 * 2. Measurement Protocol: Sending events from the server to GA4.
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';

// --- 1. DATA API (Fetching Reports) ---

/**
 * Initialize the Analytics Data Client.
 * Requires GOOGLE_APPLICATION_CREDENTIALS environment variable to be set.
 */
export const analyticsDataClient = new BetaAnalyticsDataClient();

/**
 * Example: Fetch page views for the last 30 days.
 * @param propertyId Your GA4 Property ID
 */
export async function getPageViews(propertyId: string) {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: '30daysAgo',
        endDate: 'today',
      },
    ],
    dimensions: [
      {
        name: 'pagePath',
      },
    ],
    metrics: [
      {
        name: 'screenPageViews',
      },
    ],
  });

  return response.rows;
}

// --- 2. MEASUREMENT PROTOCOL (Server-Side Tracking) ---

/**
 * Sends an event to GA4 via the Measurement Protocol.
 * Useful for tracking events that happen on the backend (e.g., successful form submission).
 * 
 * Requires:
 * - GA4_MEASUREMENT_ID: Your G-XXXXXXXXXX ID
 * - GA4_API_SECRET: Generated in GA4 Admin > Data Streams > [Stream] > Measurement Protocol API secrets
 */
export async function trackServerEvent(
  clientId: string, 
  eventName: string, 
  params: Record<string, unknown> = {}
) {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!measurementId || !apiSecret) {
    console.warn('GA4 Measurement Protocol credentials missing.');
    return;
  }

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        client_id: clientId,
        events: [{
          name: eventName,
          params: params,
        }],
      }),
    });

    if (!response.ok) {
      throw new Error(`GA4 MP error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to send GA4 server event:', error);
  }
}
