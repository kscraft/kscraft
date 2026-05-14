# AGENTS.md

Follow this short root guide first. Read
[docs/agent-context.md](docs/agent-context.md) before non-trivial edits,
catalog, pSEO, routing/SEO, tests, deployment, or security-sensitive work.

## Commands

- Install: `npm install`
- Dev: `npm run dev`
- Lint: `npm run lint`
- Unit tests: `npm run test`
- Build: `npm run build`
- E2E: run `npm run build` first, then `npm run test:e2e`

## Project

- Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4.
- `src/data/catalog.json` owns company, catalog, blog-adjacent UI content.
- `src/data/location-seo.ts` owns ranked location SEO markets.
- `src/data/service-location-seo.ts` owns service plus city SEO pages.
- `src/lib/catalog.ts` owns catalog helpers and typed access.
- Discovery metadata lives in `src/lib/agent-discovery.ts`, `src/proxy.ts`, and
  `src/app/.well-known/**`; `llms.txt` summarizes catalog and pSEO coverage.

## Rules

- Keep `soundproofindia.com` canonical; treat `doorwindowcraft.com` as alias.
- Preserve verified imagery, legacy redirects, source links, generated routes,
  structured data, and sanitized HTML paths.
- Do not read or print `.env*`.
- Avoid broad refactors; keep changes scoped and test-relevant.
