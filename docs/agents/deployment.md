# Deployment

- Vercel config is in `vercel.json`.
- Production build command: `npm run build`.
- Production deploys should use the authenticated Vercel project/account for
  `soundproofindia.com` or the intended `ksco` project.
- `doorwindowcraft.com` is configured as a Vercel alias for the same project.
- Vercel Analytics and Speed Insights are gated to Vercel runtime in
  `src/app/layout.tsx`; Google Analytics is configured there as well.
- Lead emails are sent through Resend. Required Vercel env vars are
  `RESEND_API_KEY` and `ADMIN_EMAIL_FROM` or `LEADS_FROM_EMAIL`; the recipient
  is `info@kiranslidocraft.com`.
- Optional lead archiving can write one JSON object per inquiry to private
  Cloudflare R2 when `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`,
  `R2_SECRET_ACCESS_KEY`, and `R2_BUCKET` are configured.
- `ADMIN_EMAIL_FROM` / `LEADS_FROM_EMAIL` must use a sender domain verified in
  Resend. If Resend rejects that sender with an unverified-domain `403`, the
  server action retries once with `RESEND_FALLBACK_FROM_EMAIL` or Resend's
  testing sender so lead delivery is not blocked. Verify the real sender domain
  before relying on production volume.
- SEO deployments should be verified after cache invalidation because live
  production has previously lagged behind repo canonical, robots, and sitemap
  changes.
- Post-deploy checks should include:
  - `https://soundproofindia.com/robots.txt`
  - `https://soundproofindia.com/sitemap.xml`
  - `https://soundproofindia.com/showcase/isro-gaganyaan`
  - `https://soundproofindia.com/showcase/hilton-bengaluru`
  - `https://soundproofindia.com/locations`
  - `https://soundproofindia.com/locations/soundproof-windows-mumbai`
  - `https://soundproofindia.com/solutions`
  - `https://soundproofindia.com/solutions/automatic-sliding-windows/mumbai`
- Submit or resubmit the canonical sitemap in Google Search Console after
  major pSEO route changes. Search Console API access is documented in
  `docs/marketing/google-api-seo-status.md`.
