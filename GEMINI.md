# Gemini Handoff Context

## Project Goal

Rebuild the Kiran Slido Craft website for the new domain `doorwindowcraft.com`, restores the missing catalog/product pages, uses source product imagery, and presents a modern responsive UI.

## Current Implementation

- Framework: Next.js App Router with Tailwind CSS v4.
- Product source of truth: `src/data/catalog.json`.
- Catalog helpers: `src/lib/catalog.ts`.
- Current catalog coverage: 23 products across 5 categories.
- Source-site crawl coverage: 31 reachable pages from the original `.com` site, 40 sitemap/internal pages from the original `.co.in` site.
- Static routes generated:
  - `/`
  - `/about`
  - `/services`
  - `/clients`
  - `/media`
  - `/contact`
  - `/category/[slug]`
  - `/product/[slug]`
- Legacy source URLs redirect through `next.config.ts`, including `.php` product pages, `.htm` product pages, `services.php`, `clients.php`, `certifications.php`, `media-gallery.php`, `product_videos.htm`, `testimonials.htm`, `motorized-system.htm`, and source sitemap routes.

## Catalog Rules

- Keep products static and data-driven through `src/data/catalog.json`.
- Do not reintroduce off-brand AI/Talos content.
- Preserve products from both source sites, especially `.co.in` items that were previously missing:
  - Sound Proof Casement Windows
  - Sound Proof Sliding Folding Partition
  - Sound Proof Sliding Doors
  - Sound Proof Sliding Folding Doors
  - Sound Proof Swing Doors
  - Motorized Frameless Vertical Sliding System
  - Motorized Sound Proof Window
  - Motorized Sliding Roof
- Product pages should include source links where available.
- Use real source product images where URLs exist. Do not invent branded client logos; use consistent typographic client tiles unless verified assets are available.

## UI Notes

- Logo is `public/logo-ksc.svg`.
- Footer includes the logo, company copy, certifications, categories, contact details, and product count.
- Mobile navigation is active below `lg`, fixing the prior tablet navigation gap.
- Preserve the current Apple-inspired large-radius visual language unless a specific surface needs tighter density.
- Long product names must use wrapping classes to avoid mobile overflow.
- Client and certification tiles use uniform 56px logo marks.
- `/clients` includes source project references, partial clientele, real client logo assets where verified, and certification registrations.
- `/media` includes media gallery items, `.co.in` product videos, and the testimonials surface.
- `/services` preserves the annual maintenance and service support content from the `.com` services page.

## Verification

Run:

```bash
npm run build
```

Expected result: successful build with 36 generated static pages.

Useful smoke checks:

```bash
curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/
curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/category/sound-proof-doors
curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/product/sound-proof-sliding-folding-doors
curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/product/motorized-frameless-vertical-sliding-system
curl -sS -o /dev/null -w '%{http_code} %{redirect_url}\n' http://127.0.0.1:3000/services.php
curl -sS -o /dev/null -w '%{http_code} %{redirect_url}\n' http://127.0.0.1:3000/sound-proof-sliding-doors.htm
```

Last full source-route sweep checked 50 source-derived local paths with 0 coverage failures.

## Deployment Status

- Local build is passing.
- Local production server can run with:

```bash
npm run start -- --hostname 127.0.0.1 --port 3000
```

- Vercel CLI exists locally, but the stored CLI token is invalid.
- The Vercel connector only listed `talos-site`, not a `ksco` project.
- The old claimable deploy helper no longer returns a preview URL and now recommends using the Vercel CLI.
- To deploy to `ksco.vercel.app`, authenticate Vercel CLI with a valid account/token and run:

```bash
vercel --yes --prod
```
