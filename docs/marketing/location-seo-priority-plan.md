# Location SEO Priority Plan

Updated: 2026-05-14

## Objective

Build location pages for markets where soundproof windows, acoustic doors,
movable partitions, and motorized architectural systems have the strongest
near-term revenue potential.

The implementation lives in `src/data/location-seo.ts` and renders through:

- `/locations`
- `/locations/{slug}`
- `/solutions`
- `/solutions/{service}`
- `/solutions/{service}/{market}`

The old `/soundproof-windows-mumbai` route redirects to
`/locations/soundproof-windows-mumbai`.

## Scoring Model

Each market is scored out of 100 using:

- Buyer budget and project ticket size.
- Hospitality, healthcare, office, premium residential, and mixed-use activity.
- Noise-control pain from traffic, rail, airport, construction, tourism, or
  dense urban use.
- Kiran Slido Craft service/export fit.
- Credibility leverage from ISO 9001:2015 and the Gaganyaan capsule entry
  mechanism proof point.

## Ranked Launch Priorities

### P0: Build Authority First

| Rank | Market | Score | Why |
|---:|---|---:|---|
| 1 | Mumbai | 96 | Home market, premium towers, hotels, hospitals, studios, and direct operations. |
| 2 | Dubai | 95 | High-budget hospitality, branded residences, villas, and retrofit demand. |
| 3 | Delhi NCR | 93 | Severe noise, embassies, offices, hospitals, hotels, and luxury homes. |
| 4 | Bengaluru | 92 | Office/tech growth, premium apartments, hospitals, hotels, and traffic noise. |
| 5 | Abu Dhabi | 91 | Premium villas, cultural districts, luxury residences, and hospitality. |
| 6 | Riyadh | 90 | Vision 2030 construction, hospitality, offices, villas, and mixed-use growth. |
| 7 | Hyderabad | 89 | Tech corridors, premium housing, healthcare, hotels, and offices. |
| 8 | Doha | 88 | High-value villas, offices, schools, healthcare, and hospitality. |
| 9 | Singapore | 87 | Dense urban premium retrofit market and regional credibility value. |
| 15 | Kolkata | 85 | Regional operations, severe noise, institutional buyers, and serviceability advantages. |

### P1: Strong Revenue Expansion

Pune, Chennai, Kuala Lumpur, Goa, Jeddah, Dhaka, Maldives, Mauritius, Ahmedabad, Kochi, Jaipur, Surat, Chandigarh.

These markets have strong enough project value or strategic fit to launch early
after P0 indexing is confirmed.

### P2: Good Supporting Markets

Sharjah, Muscat, Kuwait City, Manama.

These should be monitored for query impressions and partner/channel demand.

### P3: Long-Tail and Coverage Markets

Kathmandu, Penang, Colombo, Seychelles.

These are useful for topical coverage and occasional high-ticket leads, but they
should not consume sales effort before P0/P1 markets.

## Architecture

```text
/
├── /locations
│   ├── /locations/soundproof-windows-mumbai
│   ├── /locations/soundproof-windows-dubai
│   ├── /locations/soundproof-windows-delhi-ncr
│   └── ...all ranked markets
├── /solutions
│   ├── /solutions/automatic-sliding-windows/mumbai
│   ├── /solutions/motorized-soundproof-windows/dubai
│   ├── /solutions/automatic-acoustic-partitions/delhi-ncr
│   └── ...service plus market combinations
├── /category/sound-proof-windows
├── /category/sound-proof-doors
├── /category/sound-proof-partitions
└── /contact
```

## Content Guardrails

- Every location page must include unique market rationale, service zones,
  buyer segments, noise drivers, related markets, and product focus.
- Do not create pages for markets with no plausible buyer/project fit.
- Keep canonical URLs under `/locations/{slug}`.
- Use sitemap inclusion for all rendered location pages.
- Prioritize P0 pages for Search Console inspection after deployment.

## Service-Intent Coverage

Automation and acoustic service pages are generated from
`src/data/service-location-seo.ts`. Current service families:

- Automatic sliding windows.
- Motorized soundproof windows.
- Automatic acoustic partitions.
- Automatic sliding doors.
- Motorized sliding roof systems.
- Soundproof sliding doors.
- Automatic folding doors.

This covers searches such as:

- `automatic sliding window in Mumbai`
- `automatic sliding window in Dubai`
- `automatic acoustic partition near me`
- `motorized soundproof window in Delhi NCR`
- `motorized sliding roof in Goa`
- `soundproof sliding door in Singapore`

The `near me` wording is handled in page metadata, FAQ copy, and visible
search-intent sections, while the canonical pages remain city-specific.

## External Market Evidence Used

- CBRE reported 2025 India office leasing leadership from Bengaluru, Mumbai,
  and Delhi NCR, with GCC demand remaining a major driver.
- Cushman & Wakefield reported strong 2025 office net absorption across
  Bengaluru, Delhi, Mumbai, Hyderabad, Pune, Chennai, Kolkata, and Ahmedabad.
- CBRE UAE reported strong 2025 UAE real estate and hospitality performance,
  including Dubai hotel occupancy strength.
- Lodging Econometrics reported the Middle East hotel construction pipeline at
  a record high in Q2 2025, led by Saudi Arabia and UAE.
- JLL Malaysia reported improving Kuala Lumpur commercial real estate and a
  large data-centre pipeline in 2025.
- JLL Singapore hotel market material showed active hospitality/investment
  interest despite a mature market.

## Deployment Checklist

1. Deploy the repo.
2. Confirm `/locations` and all `/locations/{slug}` pages return `200`.
3. Confirm `/soundproof-windows-mumbai` redirects to the Mumbai location page.
4. Confirm `/sitemap.xml` includes `/locations` and location page URLs on
   `soundproofindia.com`.
5. Confirm `/sitemap.xml` includes `/solutions`, service hubs, and
   service-location URLs.
6. Submit sitemap in Search Console.
7. Request indexing for the P0 location pages first.
8. Request indexing for P0 service-location combinations next.
9. Track impressions and queries by URL group: P0, P1, P2, P3, and by service
   family.
