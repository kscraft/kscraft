# Product Marketing Context

*Last updated: 2026-05-14*

This is the repo-local marketing context for Kiran Slido Craft. The upstream
marketing skill normally stores this at `.agents/product-marketing-context.md`,
but `.agents/` creation is blocked in this workspace, so use this file instead.

## Product Overview

**One-liner:** Kiran Slido Craft manufactures high-performance soundproofing,
acoustic, and architectural automation systems for demanding residential,
commercial, industrial, hospitality, and mission-critical projects.

**What it does:** The company designs, manufactures, and supports acoustic
windows, doors, partitions, motorized sliding systems, gates, roof systems, and
custom engineering mechanisms. The proof point to lead with is that Kiran Slido
Craft manufactured Gaganyaan's capsule entry mechanism for ISRO.

**Product category:** Soundproof windows and doors, acoustic partitions,
architectural automation, motorized systems, custom precision manufacturing.

**Product type:** B2B/B2C technical manufacturing and project engineering.

**Business model:** Quote-driven manufacturing, project consultation, custom
specification, installation/support coordination, and service/maintenance.

## Target Audience

**Target companies:** Architects, builders, studios, hotels, hospitals,
airports, industrial plants, high-end residences, defence/aerospace programs,
labs, and commercial fit-out teams.

**Decision-makers:** Architects, project owners, procurement teams, facility
heads, acoustic consultants, engineering heads, hotel developers, builders, and
industrial operations teams.

**Primary use case:** Need a reliable, technically credible supplier for
soundproofing or motorized movement systems where standard products are not
enough.

**Jobs to be done:**

- Reduce noise without compromising architecture or usability.
- Specify a proven manufacturer for high-stakes acoustic or automation systems.
- Source custom-built systems for unusual dimensions, loads, or performance
  requirements.

## Personas

| Persona | Cares about | Challenge | Value we promise |
| --- | --- | --- | --- |
| Architect | Aesthetics, specs, reliability | Need acoustic/automation systems that fit the design | Custom systems with real project proof |
| Builder/developer | Delivery, vendor credibility, warranty | Avoid rework and poor site fit | Proven manufacturing plus technical support |
| Facility/operations head | Noise control, safety, maintenance | Existing spaces fail acoustic or movement requirements | Durable, serviceable systems |
| Procurement/owner | Trust, proof, risk | Vendor claims are hard to verify | ISRO, enterprise, hotel, and industrial proof points |

## Positioning

**Core problem:** Customers need quiet, secure, movable, or automated
architectural systems, but most suppliers cannot prove performance on complex
real-world projects.

**Differentiation:**

- Real manufacturing proof, not generic reseller claims.
- Mission-critical credibility from Gaganyaan's capsule entry mechanism.
- Broad acoustic plus automation catalog from one engineering-led manufacturer.
- Verified installation imagery and project references.
- Legacy source-site coverage and redirects preserve search equity.

**Brand voice:** Technical, precise, premium, direct, evidence-led.

**Primary conversion action:** Request a technical quote or contact engineering.

## SEO/GTM Architecture

The site now supports three demand layers:

- Core catalog demand: product and category pages from `src/data/catalog.json`.
- Location demand: `/locations/{slug}` pages from ranked markets in
  `src/data/location-seo.ts`.
- Service plus location demand: `/solutions/{service}/{market}` pages from
  `src/data/service-location-seo.ts`, covering queries such as "automatic
  sliding window in Dubai" and "automatic acoustic partition near me."

P0 revenue markets are Mumbai, Dubai, Delhi NCR, Bengaluru, Abu Dhabi, Riyadh,
Hyderabad, Doha, Singapore, and Kolkata. Prioritize these for indexing, sales
follow-up, and case-study/proof enrichment.

## Proof Points

- Manufactured Gaganyaan's capsule entry mechanism for ISRO (SHAR Sriharikota).
- ISO 9001:2015 certified.
- NSIC and MSME registered.
- **Enterprise Proof:**
    - **Johnson & Johnson:** Automatic sliding doors at Gowandi Plant, Mumbai.
    - **Pfizer India:** Motorized rolling shutters at Turbhe, Vashi plant.
    - **Nalco:** PLC-operated automatic barriers at Angul, Orissa.
    - **HDFC Bank:** Aluminium windows and partitions at Pune facility.
    - **Taj Air Caterers:** Automatic sliding gates at Sahar Airport, Mumbai.
    - **Mahindra:** Custom acoustic isolation for the Scorpio SUV Testing Lab.
    - **Tata Steel:** Heavy industrial acoustic containment at Jamshedpur Plant.
- Client references include ISRO, HDFC, ICICI Bank, Asian Paints, Tata Steel, Godrej, Pfizer, Indian Oil, BPCL, Sahara Star, Mahindra, Tata Power, and others.
- Catalog includes 23 products across 5 categories.


## Messaging Guardrails

- Use "manufactured Gaganyaan's capsule entry mechanism" as the lead aerospace
  proof point.
- Keep `soundproofindia.com` as canonical.
- Keep `doorwindowcraft.com` as a Vercel alias/link to the canonical domain.
- Keep generated pSEO pages differentiated by market rationale, buyer segments,
  service zones, product fit, and proof.
- Do not invent client logos, certifications, test numbers, or unsupported
  claims.
- Avoid off-brand AI/Talos content on Kiran Slido Craft pages.
