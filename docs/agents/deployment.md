# Deployment

- Vercel config is in `vercel.json`.
- Production build command: `npm run build`.
- Production deploys should use the authenticated Vercel project/account for
  `soundproofindia.com` or the intended `ksco` project.
- `doorwindowcraft.com` is configured as a Vercel alias for the same project.
- Vercel Analytics and Speed Insights are gated to Vercel runtime in
  `src/app/layout.tsx`; Google Analytics is configured there as well.
- SEO deployments should be verified after cache invalidation because live
  production has previously lagged behind repo canonical, robots, and sitemap
  changes.
- Post-deploy checks should include:
  - `https://soundproofindia.com/robots.txt`
  - `https://soundproofindia.com/sitemap.xml`
  - `https://soundproofindia.com/locations`
  - `https://soundproofindia.com/locations/soundproof-windows-mumbai`
  - `https://soundproofindia.com/solutions`
  - `https://soundproofindia.com/solutions/automatic-sliding-windows/mumbai`
- Submit or resubmit the canonical sitemap in Google Search Console after
  major pSEO route changes. Search Console API access is documented in
  `docs/marketing/google-api-seo-status.md`.
