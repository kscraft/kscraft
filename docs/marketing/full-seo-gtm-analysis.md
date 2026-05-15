# Full SEO And GTM Analysis

*Generated: 2026-05-13*

This analysis uses the repo-local SEO Growth Agent workflow, marketing context,
and installed marketing skills: `product-marketing-context`, `seo-audit`,
`site-architecture`, `schema-markup`, `ai-seo`, `page-cro`, `copywriting`,
`copy-editing`, `analytics-tracking`, and `programmatic-seo`.

## Executive Summary

The site has strong foundations for a premium technical-manufacturing brand:
static Next.js pages, 23 products across 5 categories, 10 engineering blog
posts, real product imagery, sitemap/robots routes, JSON-LD, OpenAPI/LLM
discovery endpoints, and a major trust proof point: Kiran Slido Craft
manufactured Gaganyaan's capsule entry mechanism.

The site is not go-to-market complete yet. The biggest launch blocker is
canonical/domain inconsistency in production: live `soundproofindia.com`
currently resolves through `www.soundproofindia.com`, but its robots, sitemap,
homepage canonical, and OG URL still point to `doorwindowcraft.com`.
`doorwindowcraft.com` currently serves a 200 page instead of redirecting to the
new canonical. `www.doorwindowcraft.com` redirects to `www.kiranslidocraft.com`.
This splits crawl and ranking signals across domains.

The biggest growth opportunity is to reposition the site from a polished
catalog into a demand-generation engine: own high-intent soundproofing keywords,
lead with the Gaganyaan proof point, capture quote leads server-side, and build
intent-led landing pages for acoustic products and industries.

## Evidence Checked

Repo inventory:

- 5 categories.
- 23 products.
- 10 blog posts.
- 23 products with source URLs.
- 23 products with images.
- 1 product currently has FAQs.
- 3 project highlights.
- 7 verified client logos.
- 12 named client references.

Live production checks:

- `https://soundproofindia.com/` returns `307` to `https://www.soundproofindia.com/`.
- `https://www.soundproofindia.com/` returns `200`.
- `https://doorwindowcraft.com/` returns `200`.
- `https://www.doorwindowcraft.com/` returns `302` to `https://www.kiranslidocraft.com/`.
- Live `https://www.soundproofindia.com/robots.txt` points sitemap and host to
  `https://doorwindowcraft.com`.
- Live `https://www.soundproofindia.com/sitemap.xml` lists `doorwindowcraft.com`
  URLs.
- Live `https://www.soundproofindia.com/` has canonical and `og:url` set to
  `https://doorwindowcraft.com`.

Working-tree checks:

- `src/lib/agent-discovery.ts`, `src/app/layout.tsx`, `src/app/sitemap.ts`, and
  page metadata now point to `https://soundproofindia.com`.
- `next.config.ts` now contains host redirects from `doorwindowcraft.com`,
  `www.doorwindowcraft.com`, and `www.soundproofindia.com` to
  `https://soundproofindia.com`.
- `npm run lint` and `npm run build` passed before this report.

Google Search Central context:

- Canonical signals stack; redirects and rel canonical are strong signals, while
  sitemap inclusion is weaker. Avoid conflicting canonical URLs across methods.
- Do not use `robots.txt` as a canonicalization tool.
- Product structured data can help product snippets, but the markup must meet
  required/recommended properties and should be validated after deployment.

## Critical Fixes

### 1. Deploy And Verify Canonical Domain Policy

Priority: P0

Target policy:

- Canonical domain: `https://soundproofindia.com`.
- `doorwindowcraft.com`: Vercel alias that redirects or links to canonical.
- `www.soundproofindia.com`: redirect to canonical apex, unless the final
  business decision changes canonical to `www`.
- `www.doorwindowcraft.com`: must not redirect to `kiranslidocraft.com` if it is
  intended to be an alias for this project.

Implementation:

- Deploy the current working tree.
- In Vercel/domain settings, make `soundproofindia.com` the primary production
  domain if apex is truly canonical.
- Verify DNS and Cloudflare/Vercel settings are not forcing apex to `www`.
- Verify:
  - `curl -I https://soundproofindia.com/` returns `200`.
  - `curl -I https://www.soundproofindia.com/` returns `301` or `308` to apex.
  - `curl -I https://doorwindowcraft.com/` returns `301` or `308` to canonical.
  - `curl -I https://www.doorwindowcraft.com/` returns `301` or `308` to
    canonical.
  - `/robots.txt`, `/sitemap.xml`, `<link rel="canonical">`, and `og:url` all
    use `soundproofindia.com`.

### 2. Replace Mailto-Only Lead Capture

Priority: P0

Current state:

- `/contact` validates client-side and opens a `mailto:` URL.
- Product quote modal offers WhatsApp, phone, and mailto.
- There is a server action in `src/app/actions.ts`, but the visible contact page
  does not use it for real submission.
- No durable lead record, no CRM/email service, no UTM/source capture, and no
  server-side conversion event.

Impact:

- Leads are easy to lose.
- Attribution is weak.
- Sales follow-up cannot be measured.

Recommended implementation:

- Add a server-side inquiry action or API route.
- Capture name, email, phone, city, product/category/page, requirement, UTM
  params, referrer, and source domain.
- Send email notification and persist a backup record.
- Fire GA4 `generate_lead` server/client event.
- Keep WhatsApp/call as secondary quick-contact paths.

### 3. Rework Homepage Hero For Search Intent And Trust

Priority: P0

Current hero:

- Title: `Kiran Slido Craft`.
- Primary CTA: `Explore retractable roofs`.
- Secondary CTA: `Browse acoustic systems`.

Issue:

- It leads with brand and one product line instead of the highest-value search
  intent and proof.

Recommended copy direction:

- H1: `Soundproof Windows, Doors & Automation Systems`
- Proof line: `Manufacturers of Gaganyaan's capsule entry mechanism for ISRO.`
- Subheadline: `Kiran Slido Craft builds acoustic windows, doors, partitions,
  motorized roofs, and custom movement systems for homes, hotels, studios,
  factories, and mission-critical projects.`
- Primary CTA: `Request Technical Quote`
- Secondary CTA: `View Gaganyaan Case Study`

## SEO Roadmap

### Technical SEO

Strengths:

- Static route generation for categories/products/blog.
- XML sitemap route exists.
- Robots route exists.
- Legacy redirects are present for many old `.php` and `.htm` paths.
- Product/category/blog pages have metadata.
- Canonicals are being moved to `soundproofindia.com` in the working tree.

Gaps:

- Production canonical signals are currently wrong.
- `/contact`, `/search`, and `/docs/api` do not have complete route-specific
  canonical metadata.
- Internal search query URLs may become low-value indexable URLs if crawled.
- `Host:` in robots is not a reliable Google canonical signal; rely on
  redirects, canonicals, sitemap, and internal links.
- Link headers for discovery appear duplicated in live production response.

Actions:

1. Add route-specific metadata for `/contact`, `/search`, and `/docs/api`.
2. Consider `robots: { index: false, follow: true }` for search result query
   states, while keeping `/search` itself useful for users.
3. Remove duplicate Link header emission if it appears after deployment.
4. Add redirect tests for host/domain behavior.

### On-Page SEO

Strengths:

- Product pages have specific titles, descriptions, specs, applications, and
  images.
- Category pages have generated metadata and product grids.
- Blog has relevant technical topics.

Gaps:

- Category pages are too thin for competitive SEO; they need buying/spec
  guidance, FAQs, and internal links.
- Product metadata repeats "Global Export" and may under-target India/local
  buying intent.
- Current product/category URL slugs use `sound-proof-*`, while common searches
  are `soundproof windows`, `soundproof doors`, etc.
- Blog posts are not strongly connected to product/category CTAs.

Actions:

1. Add 400-800 words of helpful category guidance on major categories.
2. Add FAQs for all product/category pages, not just one product.
3. Add clean landing pages for high-intent keywords:
   - `/soundproof-windows`
   - `/soundproof-doors`
   - `/acoustic-partitions`
   - `/soundproof-sliding-windows`
   - `/soundproof-room-solutions`
   - `/industrial-soundproofing`
   - `/hotel-acoustic-solutions`
4. Link blog posts to relevant products/categories and quote CTAs.

### Structured Data

Strengths:

- Organization, WebSite, LocalBusiness, Product, Breadcrumb, FAQ, and
  CollectionPage JSON-LD are present in code.

Gaps:

- Blog posts do not emit Article schema.
- Services page does not emit Service schema.
- Product schema uses `Offer` without price/currency; for quote-based products,
  this may create warnings or mismatched expectations.
- Organization/LocalBusiness schema could be improved with stable `@id`,
  alternate domains, and clearer sameAs/contact/entity relationships.

Actions:

1. Add Article schema to `/blog/[slug]`.
2. Add Service schema to `/services` and future industry/service pages.
3. Decide whether product pages should use Product schema without merchant-style
   pricing, or add quote-oriented offer details carefully.
4. Add stable `@id` values:
   - `https://soundproofindia.com/#organization`
   - `https://soundproofindia.com/#website`
   - `https://soundproofindia.com/#mumbai`
5. Validate with Google Rich Results Test and Search Console after deployment.

### AI Search / LLM Discovery

Strengths:

- `llms.txt` exists.
- OpenAPI route exists.
- `.well-known` discovery endpoints exist.
- Proxy can return markdown for pages based on Accept header.
- WebMCP provider exposes product search/category/product tools.

Gaps:

- Production discovery still advertises old canonical domain until deployed.
- `llms.txt` should lead with the canonical domain, Gaganyaan proof point, and
  key product categories.
- Agent discovery should include both brand/entity aliases:
  `Kiran Slido Craft`, `KSC`, `Soundproof India`, `doorwindowcraft.com`.

Actions:

1. Update `llms.txt` output to include canonical/alias/domain notes.
2. Add concise "why trust this manufacturer" proof block.
3. Add source-friendly summaries on product/category markdown outputs.

## CRO Roadmap

### Primary Conversion Path

Current issue:

- The site offers multiple contact methods, but there is no robust quote funnel.
- Header CTA opens a modal; contact page opens mail client; product quote modal
  does not capture structured lead data.

Recommended flow:

1. Primary CTA everywhere: `Request Technical Quote`.
2. Modal/form asks only:
   - Name
   - Phone/WhatsApp
   - Project city
   - Product/scope auto-filled
   - Requirement text
3. Secondary actions:
   - WhatsApp
   - Call
   - Email
4. Thank-you state:
   - "Engineering team will review and respond."
   - Recommended next links to relevant category/product pages.

### Trust Placement

Add trust blocks near CTAs:

- "Manufactured Gaganyaan's capsule entry mechanism for ISRO."
- ISO 9001, NSIC, MSME.
- Client grid.
- Real project imagery.
- "Since 1985" if current catalog value is correct.

### Objection Handling

Add FAQ sections for:

- Can you build to custom dimensions?
- What STC/noise reduction can I expect?
- Do you install or coordinate installation?
- Do you support hotels/studios/hospitals/factories?
- Do you handle maintenance?
- What information is needed for a quote?

## Content And Architecture Plan

Recommended hierarchy:

```
/                           Home
/soundproof-windows          High-intent landing page
/soundproof-doors            High-intent landing page
/acoustic-partitions         High-intent landing page
/motorized-systems           Automation landing page
/category/[slug]             Catalog family pages
/product/[slug]              Product detail/spec pages
/industries/hotels           Industry page
/industries/studios          Industry page
/industries/hospitals        Industry page
/industries/industrial       Industry page
/showcase/isro-gaganyaan     Proof/case study
/blog                        Education/content hub
/contact                     Lead capture
```

Content clusters:

1. Soundproof windows:
   - buying guide
   - STC/OITC explainer
   - sliding vs casement vs tilt-turn
   - home/studio/hotel use cases
2. Soundproof doors:
   - swing vs sliding vs folding
   - studio/hotel/industrial applications
3. Acoustic partitions:
   - movable vs fixed
   - boardroom/hotel/office use cases
4. Automation:
   - motorized roof systems
   - telescopic gates
   - vertical sliding systems
5. Proof/authority:
   - Gaganyaan capsule entry mechanism
   - project highlights
   - certifications and manufacturing process

## Measurement Plan

Events to track:

- `quote_modal_open`
- `quote_form_start`
- `generate_lead`
- `whatsapp_click`
- `phone_click`
- `email_click`
- `product_source_click`
- `product_compare_add`
- `site_search`
- `case_study_click`
- `category_to_product_click`

Attribution fields:

- Current page path.
- Product/category slug.
- Referrer.
- UTM params.
- Host/domain (`soundproofindia.com` vs alias).
- Device type if available.

External setup:

- Google Search Console property for `soundproofindia.com`.
- Domain property if DNS access is available.
- Submit `https://soundproofindia.com/sitemap.xml`.
- Add Bing Webmaster Tools.
- Monitor Product snippets / structured data reports after schema changes.
- Create GA4 conversion for `generate_lead`.

## Implementation Backlog

| Priority | Task | Impact | Effort | Main files |
| --- | --- | --- | --- | --- |
| P0 | Deploy current canonical-domain changes and verify host redirects | Very high | Low/Medium | Vercel/domain config, `next.config.ts` |
| P0 | Fix production sitemap/robots/canonical to `soundproofindia.com` | Very high | Low | `src/lib/agent-discovery.ts`, `src/app/sitemap.ts`, deployment |
| P0 | Build real inquiry backend and lead persistence | Very high | Medium | `src/app/contact/page.tsx`, `src/app/actions.ts`, new storage/email integration |
| P0 | Add conversion events for quote/contact actions | High | Medium | `src/lib/analytics.ts`, quote/contact components |
| P1 | Rewrite homepage hero around Gaganyaan + soundproofing intent | High | Low | `src/data/catalog.json`, `src/app/page.tsx` |
| P1 | Add route metadata for `/contact`, `/search`, `/docs/api` | Medium | Low | respective page files |
| P1 | Create `/soundproof-windows` and `/soundproof-doors` landing pages | High | Medium | `src/app/...`, catalog helpers |
| P1 | Add visual breadcrumbs to product/category/blog pages | Medium | Medium | page components |
| P1 | Expand category page copy and FAQs | High | Medium | `src/data/catalog.json`, `src/app/category/[slug]/page.tsx` |
| P1 | Add Article and Service schema | Medium | Low/Medium | blog/services page files |
| P2 | Build industry pages | Medium/High | Medium | new route group, catalog content |
| P2 | Add sales one-pagers / downloads | Medium | Medium | public assets, landing pages |
| P2 | Improve AI/LLM discovery summaries | Medium | Low | `src/lib/agent-discovery.ts`, `llms.txt` |

## Verification Commands Used

- `git status --short`
- `node` JSON/catalog inventory checks
- `rg` route/metadata/schema scans
- `curl -I https://soundproofindia.com/`
- `curl -I https://www.soundproofindia.com/`
- `curl -I https://doorwindowcraft.com/`
- `curl -I https://www.doorwindowcraft.com/`
- `curl -sSL https://www.soundproofindia.com/robots.txt`
- `curl -sSL https://www.soundproofindia.com/sitemap.xml`
- `curl -sSL https://www.soundproofindia.com/` metadata extraction

## Remaining Risks

- Search Console and GA4 data were not available in this session, so traffic,
  query, indexing, and conversion performance could not be verified.
- PageSpeed/Core Web Vitals were not run; run PageSpeed Insights or Lighthouse
  after deploying canonical-domain fixes.
- The workspace currently has uncommitted domain/docs/copy changes. Production
  still reflects older canonical settings until deployment.
