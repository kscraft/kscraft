# Project Map

This repository is the Kiran Slido Craft public website for `soundproofindia.com`.
It is a Next.js App Router site with static catalog pages, product-led marketing
pages, public discovery metadata, and programmatic SEO route layers for
location and service-location demand. The project rebuilt the old Kiran Slido
Craft web presence for the new domain, restored missing catalog/product pages
from the source sites, uses verified source product imagery, and presents a
modern responsive UI.

Primary stack:

- Next.js 16 App Router, React 19, TypeScript strict mode.
- Tailwind CSS v4 via `src/app/globals.css`.
- Framer Motion for page and component motion.
- Lucide React for icons.
- Vitest plus Testing Library for unit/component tests.
- Playwright for e2e/UI smoke checks.

Repository layout:

- `src/app/`: App Router pages, route handlers, metadata, and public endpoint
  routes.
- `src/components/`: Reusable client UI components.
- `src/data/catalog.json`: Main business/content source of truth for company
  details, navigation, categories, products, home content, media, projects, and
  services.
- `src/data/blogs.json`: Blog content and related-product links.
- `src/data/location-seo.ts`: Ranked location market data for India, Middle
  East, Asia, and island hospitality SEO pages.
- `src/data/service-location-seo.ts`: Service-intent data for automation and
  acoustic pages such as automatic sliding windows, motorized soundproof
  windows, acoustic partitions, sliding doors, and sliding roofs by market.
- `src/lib/catalog.ts`: Catalog types, exported data slices, and lookup helpers.
- `src/lib/agent-discovery.ts`: Shared data for `llms.txt`, OpenAPI,
  `.well-known` discovery, markdown negotiation, and agent metadata.
- `src/lib/sanitize.ts`: Sanitizer for trusted local HTML/markdown render paths.
- `src/proxy.ts`: Accept-header markdown responses and discovery link headers.
- `public/images/`: Local product, media, blog, and client imagery.
- `tests/e2e/`: Playwright browser checks.

Generated route layers:

- `/locations`: location market hub.
- `/locations/[slug]`: 31 soundproof-window location pages from
  `src/data/location-seo.ts`.
- `/solutions`: automation and acoustic solution hub.
- `/solutions/[service]`: service family city index pages.
- `/solutions/[service]/[market]`: 186 service plus market pages from
  `src/data/service-location-seo.ts` crossed with location markets.
- `/soundproof-windows-mumbai`: compatibility alias that redirects to
  `/locations/soundproof-windows-mumbai`.

Current production build baseline: `npm run build` should generate 297 static
pages/routes.
