# Google API SEO Status

Checked on 2026-05-14.

## What Worked

- Local Google Cloud SDK is authenticated as the project owner account.
- GA4 service-account credentials are configured in `.env`.
- The site has a live GA4 measurement ID in the app layout.

## Current API Blockers

- Search Console API call failed with `ACCESS_TOKEN_SCOPE_INSUFFICIENT`.
  The current `gcloud` token does not include Search Console scopes.
- PageSpeed Insights API returned `RESOURCE_EXHAUSTED` because the active
  consumer has zero daily quota for the API.
- GA4 Data API cannot run reports yet because `GA4_PROPERTY_ID` is configured
  but empty. The Data API needs the numeric property ID, not the `G-...`
  measurement ID.
- Analytics Admin API is disabled for the GA4 service-account project, so the
  property ID could not be discovered automatically.

## Needed To Continue With Google APIs

1. Add `soundproofindia.com` and `https://www.soundproofindia.com/` to Google
   Search Console, or verify the existing property.
2. Re-authorize a Google token with Search Console read scope:
   `https://www.googleapis.com/auth/webmasters.readonly`.
3. Set the numeric `GA4_PROPERTY_ID` in `.env`.
4. Enable PageSpeed Insights quota or provide a project/API key with quota.
5. Optionally enable Google Analytics Admin API for the service-account project
   if property discovery should be automated.

## Completed Without Waiting On API Access

- Added `/locations` plus 31 ranked location market pages.
- Added `/solutions`, 6 service hubs, and 186 service-location pages for
  automation and acoustic demand such as automatic sliding windows, motorized
  soundproof windows, automatic acoustic partitions, and sliding roofs.
- Kept `/soundproof-windows-mumbai` as a compatibility redirect to
  `/locations/soundproof-windows-mumbai`.
- Added sitemap coverage for location and service-location pages.
- Added location, solution, and Gaganyaan proof-point summaries to `llms.txt`
  for AI search extraction.
