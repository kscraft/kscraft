import { NextResponse } from 'next/server';
import { catalog, products, categories, getProductCategoryIds, getProductPrimaryCategory } from '@/lib/catalog';
import { locationSeoPages, priorityLocationPages } from '@/data/location-seo';
import { serviceLocationSeoPages } from '@/data/service-location-seo';

export async function GET() {
  const { company } = catalog;

  const content = `# ${company.name} - Technical Catalog

${company.description}

## Core Philosophy
Mission: ${company.mission}
Vision: ${company.vision}

## Global Export Capabilities
Licensed Exporter serving: ${company.areaServed?.join(', ') || 'Global'}
Headquarters: ${company.locations[0].address}, ${company.locations[0].city}
Contact: ${company.email} | ${company.phoneDisplay}

## Product Categories
${categories.map(cat => `- ${cat.title}: ${cat.description}`).join('\n')}

## Local SEO Landing Pages
Location hub: https://soundproofindia.com/locations
${priorityLocationPages.map(location => `- ${location.title}: https://soundproofindia.com/locations/${location.slug}
  Rank ${location.rank}, score ${location.score}/100. ${location.growthReason}`).join('\n')}

## Full Location Coverage
${locationSeoPages.map(location => `- ${location.city}, ${location.country}: https://soundproofindia.com/locations/${location.slug}`).join('\n')}

## Automation and Acoustic Solution Pages
Solution hub: https://soundproofindia.com/solutions
${serviceLocationSeoPages.map(service => `- ${service.title}: https://soundproofindia.com/solutions/${service.slug}
  Search intent: ${service.intentPhrase}; near-me intent: ${service.nearMePhrase}.`).join('\n')}

## Proof Points
- ISO 9001:2015 certified manufacturing.
- Mumbai engineering headquarters with global export capability.
- Kiran Slido Craft manufactured Gaganyaan's capsule entry mechanism.

## Technical Product Specification Index
${products.map(prod => `
### ${prod.title}
Primary Category: ${getProductPrimaryCategory(prod)?.title || prod.primaryCategory}
Categories: ${getProductCategoryIds(prod).join(', ')}
Description: ${prod.description}
Technical Specs:
${Object.entries(prod.specifications).map(([k, v]) => `  - ${k}: ${v}`).join('\n')}
Key Features:
${prod.features.map(f => `  - ${f}`).join('\n')}
`).join('\n')}

---
Generated dynamically for AI Agents (Perplexity, ChatGPT, Claude).
Source: https://soundproofindia.com
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
