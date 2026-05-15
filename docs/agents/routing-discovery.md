# Routing And Discovery

Routing and SEO rules:

- Static product and category routes are generated from catalog data by
  `generateStaticParams`.
- Location SEO routes are generated from `src/data/location-seo.ts`.
- Service-location SEO routes are generated from
  `src/data/service-location-seo.ts`.
- Keep metadata canonical URLs on `https://soundproofindia.com`.
- Treat `soundproofindia.com` as the current canonical domain. Keep
  `talosprotocol.com` separate from Kiran Slido Craft content unless the user
  explicitly defines a cross-brand use.
- Maintain JSON-LD for organization, website, local business, category,
  product, breadcrumb, and FAQ pages when changing related content.
- `next.config.ts` owns legacy redirects from the old site. Preserve redirects
  for old `.php`, `.htm`, sitemap, service, media, client, and product paths.
- Static route families include `/`, `/about`, `/services`, `/clients`,
  `/media`, `/contact`, `/category/[slug]`, `/product/[slug]`, `/locations`,
  `/locations/[slug]`, `/solutions`, `/solutions/[service]`,
  `/solutions/[service]/[market]`, and `/showcase/[slug]`.
- `/soundproof-windows-mumbai` is a compatibility alias that redirects to
  `/locations/soundproof-windows-mumbai`.
- `src/app/sitemap.ts` must include canonical URLs for catalog, location, and
  solution route families. Location pages should use priority by pSEO tier
  (`P0`, `P1`, `P2`, `P3`).
- `src/app/sitemap/page.tsx` should expose human-discoverable links to
  locations and solution hubs. Avoid listing every generated child if it makes
  the human sitemap too noisy.
- `src/app/llms.txt/route.ts` summarizes catalog, ranked location coverage,
  solution families, and proof points for AI/LLM search agents.

Discovery surfaces:

- `src/lib/agent-discovery.ts`
- `src/proxy.ts`
- `src/app/llms.txt/route.ts`
- `src/app/openapi.json/route.ts`
- `src/app/mcp/route.ts`
- `src/app/.well-known/**`

If routes, catalog fields, public API metadata, or discovery descriptions
change, update `src/lib/agent-discovery.ts` and relevant `.well-known` route
handlers in the same change.

Production verification notes:

- Live production can be behind the repo because Vercel/cache state may serve
  older `robots.txt`, sitemap, or canonical behavior.
- After SEO or domain changes, verify both repo output and live URLs:
  `https://soundproofindia.com/robots.txt`,
  `https://soundproofindia.com/sitemap.xml`, and
  `https://soundproofindia.com/`.
