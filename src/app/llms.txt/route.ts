import { NextResponse } from 'next/server';
import { catalog, products, categories } from '@/lib/catalog';

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

## Technical Product Specification Index
${products.map(prod => `
### ${prod.title}
Category: ${prod.category}
Description: ${prod.description}
Technical Specs:
${Object.entries(prod.specifications).map(([k, v]) => `  - ${k}: ${v}`).join('\n')}
Key Features:
${prod.features.map(f => `  - ${f}`).join('\n')}
`).join('\n')}

---
Generated dynamically for AI Agents (Perplexity, ChatGPT, Claude).
Source: https://kiranslidocraft.com
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
