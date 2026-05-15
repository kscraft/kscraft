# Go-To-Market Readiness Plan

This plan applies the installed marketing skills: product marketing context,
SEO audit, site architecture, page CRO, and copywriting.

## Current Readiness Snapshot

The site has been transformed from a static catalog into a higher-authority demand-generation system. Core upgrades include a mission-critical ISRO/Gaganyaan proof point, dynamic engineering showcases (ISRO, Hilton), and a programmatic regional SEO architecture covering 31 ranked markets plus 217 service-location combinations.

## Phase 1: Launch-Critical Fixes

1. Canonical/domain cleanup.
   - Keep `soundproofindia.com` as canonical across metadata, sitemap, OpenAPI,
     robots, discovery, and JSON-LD.
   - Verify canonical URLs in production after deployment.

2. Lead capture.
   - Replace mailto-only contact behavior with a real server-side inquiry flow.
   - Capture product/category context, page source, UTM params, city, phone, and
     requirement text.
   - Send to email/CRM and persist a backup record.

3. Above-the-fold conversion.
   - Lead homepage copy with the strongest proof point:
     "Manufacturers of Gaganyaan's capsule entry mechanism. Builders of
     soundproof windows, doors, and automation systems."
   - Make "Request Technical Quote" the primary CTA and "View ISRO Case Study"
     the proof CTA.

4. Trust proof packaging.
   - Add an "Aerospace-grade manufacturing proof" section linking to the
     Gaganyaan showcase.
   - Add client/certification proof near key CTAs on home, category, and contact
     pages.

## Phase 2: SEO And Site Architecture

1. Keyword landing pages.
   - Create intent-led pages for:
     - `/soundproof-windows`
     - `/soundproof-doors`
     - `/acoustic-partitions`
     - `/soundproof-sliding-windows`
     - `/motorized-sliding-roof`
     - `/soundproof-room-solutions`
     - `/industrial-soundproofing`
     - `/hotel-acoustic-solutions`
   - Each page should map to one search intent, one primary CTA, internal links
     to products, and relevant proof.

2. Category copy expansion.
   - Add 400-800 words of useful buying/specification guidance to major
     category pages.
   - Cover use cases, selection criteria, STC/performance considerations,
     maintenance, and project fit.

3. Internal linking.
   - Link blog posts to matching categories/products and quote CTAs.
   - Link products back to category guides and the Gaganyaan proof page where
     credibility helps.
   - Add breadcrumbs visually, not only JSON-LD, on product/category/blog pages.

4. Schema improvements.
   - Add richer Organization, Product, Breadcrumb, FAQ, Article, and LocalBusiness
     coverage where page-specific data exists.
   - Consider Service schema for soundproofing and automation service pages.

## Phase 3: CRO And Sales Enablement

1. Quote flow.
   - Add product-aware quote CTAs on every product and category page.
   - Pre-fill inquiry scope from the current product/category.
   - Reduce fields on first contact; collect only enough to start the sales
     conversation.

2. Proof assets.
   - Create downloadable one-page PDFs for:
     - Soundproof windows
     - Acoustic doors
     - Movable partitions
     - Motorized roof/sliding systems
     - Gaganyaan manufacturing proof

3. Objection handling.
   - Add FAQs for delivery area, customization, STC expectations, installation,
     warranty/service, and export/project support.
   - Add "How specification works" steps: share drawings, define performance,
     quote, manufacture, install/support.

4. Measurement.
   - Track quote CTA clicks, form starts, form submissions, WhatsApp/call/email
     clicks, product compare events, search queries, and source domains.
   - Connect GA4 events to conversion reporting.

## Phase 4: Demand Generation

1. [DONE] SEO content clusters for soundproof windows, doors, and automation.
2. [DONE] Regional and industry pages: P0/P1 hubs launched (Mumbai, Delhi, Kolkata, Bengaluru, Dubai, Riyadh, etc.).
3. [DONE] Industry solutions: Education, Manufacturing, Hospitality, Healthcare, Office, and Luxury Residential verticals active.
4. Distribution.
   - Submit canonical domain to Google Search Console and Bing Webmaster Tools.
   - Submit sitemap.
   - Create/refresh Google Business Profile if applicable.
   - Use LinkedIn posts around the Gaganyaan proof, catalog product lines, and
     installation visuals.

## Priority Backlog

1. [DONE] Production redirect verification.
2. [DONE] Real contact form backend and lead persistence.
3. [DONE] Homepage hero rewrite around Gaganyaan + engineering intent.
4. [DONE] Product-aware quote CTAs.
5. [DONE] Intent-led landing pages for Windows, Doors, Partitions, and Roofs.
6. [DONE] Visual breadcrumbs and internal linking Pass.
7. [DONE] Product/category FAQ expansion and schema.
8. [DONE] GA4 event instrumentation for lead actions.
9. Search Console/Bing setup and sitemap submission after API/property access is unblocked.
10. [DONE] Technical Proof downloads and dynamic showcase architecture.
11. Build out more Project Highlights for P1 regions (Dubai, Riyadh, London).
12. Deepen Education and Industrial vertical copy with specific tender-spec language.
