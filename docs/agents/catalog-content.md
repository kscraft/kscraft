# Catalog Content

Current catalog coverage is 23 products across 5 categories. Historical source
analysis covered 31 reachable pages from the original `.com` site and 40
sitemap/internal pages from the original `.co.in` site. Programmatic SEO
coverage now adds 31 ranked location markets and 6 service-intent families
crossed into 186 service-location pages.

Rules:

- Treat `src/data/catalog.json` as the source of truth for products,
  categories, navigation, company data, home content, media, services, and
  project highlights.
- Treat `src/data/location-seo.ts` as the source of truth for ranked location
  markets, priorities, market rationale, service areas, related markets, and
  local noise/buyer context.
- Treat `src/data/service-location-seo.ts` as the source of truth for service
  plus location pSEO families and their matched products.
- Keep catalog behavior data-driven through `src/lib/catalog.ts`; avoid
  duplicating product/category lists directly in page components.
- Products can belong to multiple categories. Preserve `primaryCategory`,
  `categories`, `legacyRoutes`, `sourceUrls`, `images`, specifications,
  features, applications, and FAQs when editing product entries.
- Keep product and category slugs stable. If a legacy source route changes, add
  or update redirects in `next.config.ts`.
- Product pages should preserve real source links when available.
- Use verified product and client assets only. Do not invent client logos,
  source claims, certifications, or product imagery.
- Do not reintroduce off-brand AI/Talos content.
- When adding or renaming products/categories, update related tests and check
  pages that derive static params, metadata, sitemap, search, and discovery
  output from catalog data.
- When adding, removing, or renaming pSEO locations or services, update
  `docs/marketing/location-seo-priority-plan.md`, sitemap expectations,
  `llms.txt`, and any human navigation or sitemap links that surface those
  pages.
- Avoid creating low-quality doorway pages. Each location/service page must
  include differentiated market rationale, buyers, service zones, product fit,
  and proof.

Preserve products restored from both source sites, especially these previously
missing `.co.in` items:

- Sound Proof Casement Windows
- Sound Proof Sliding Folding Partition
- Sound Proof Sliding Doors
- Sound Proof Sliding Folding Doors
- Sound Proof Swing Doors
- Motorized Frameless Vertical Sliding System
- Motorized Sound Proof Window
- Motorized Sliding Roof

Current pSEO service families:

- Automatic sliding windows.
- Motorized soundproof windows.
- Automatic acoustic partitions.
- Automatic sliding doors.
- Motorized sliding roof systems.
- Soundproof sliding doors.
