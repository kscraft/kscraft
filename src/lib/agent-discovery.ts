import { categories, catalog, products } from '@/lib/catalog';

export const SITE_URL = 'https://soundproofindia.com';

export const AGENT_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</docs/api>; rel="service-doc"; type="text/html"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
].join(', ');

export const agentSkillMarkdown = `# Kiran Slido Craft Catalog Skill

Use this skill when an agent needs to discover Kiran Slido Craft products, categories, contact routes, and public API metadata.

## Capabilities

- Find acoustic, soundproofing, motorized, sliding roof, and architectural automation products.
- Retrieve public product specifications and category summaries.
- Locate contact, quote, service, documentation, health, and API discovery endpoints.

## Public Endpoints

- API catalog: ${SITE_URL}/.well-known/api-catalog
- OpenAPI: ${SITE_URL}/openapi.json
- API documentation: ${SITE_URL}/docs/api
- LLM catalog: ${SITE_URL}/llms.txt
- Health: ${SITE_URL}/api/health
`;

export function estimateMarkdownTokens(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words * 1.33));
}

export function getMarkdownForPath(pathname: string) {
  if (pathname === '/') {
    return `# ${catalog.company.name}

${catalog.company.description}

${catalog.company.mission}

## Product Categories

${categories.map((category) => `- [${category.title}](${SITE_URL}/category/${category.id}): ${category.summary}`).join('\n')}

## Featured Systems

${products.slice(0, 8).map((product) => `- [${product.title}](${SITE_URL}/product/${product.slug}): ${product.description}`).join('\n')}

## Contact

- Email: ${catalog.company.email}
- Phone: ${catalog.company.phoneDisplay}
- Quote requests: ${SITE_URL}/contact
- API catalog: ${SITE_URL}/.well-known/api-catalog
- OpenAPI: ${SITE_URL}/openapi.json
`;
  }

  if (pathname === '/about') {
    return `# About ${catalog.company.name}

${catalog.company.description}

## Mission

${catalog.company.mission}

## Certifications

${catalog.company.certifications.map((certification) => `- ${certification}`).join('\n')}
`;
  }

  if (pathname === '/services') {
    return `# Services

${catalog.company.name} provides technical consultation, fabrication, export support, and installation coordination for acoustic and architectural automation systems.

## Useful Links

- Product catalog: ${SITE_URL}
- Contact: ${SITE_URL}/contact
- API documentation: ${SITE_URL}/docs/api
`;
  }

  if (pathname === '/contact') {
    return `# Contact ${catalog.company.name}

- Email: ${catalog.company.email}
- Phone: ${catalog.company.phoneDisplay}
- Headquarters: ${catalog.company.locations[0].address}, ${catalog.company.locations[0].city}
- Regional Hub: ${catalog.company.locations[1].address}, ${catalog.company.locations[1].city}
`;
  }

  const productMatch = pathname.match(/^\/product\/([^/]+)$/);
  if (productMatch) {
    const product = products.find((item) => item.slug === productMatch[1]);
    if (!product) return null;

    return `# ${product.title}

${product.description}

## Specifications

${Object.entries(product.specifications).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

## Features

${product.features.map((feature) => `- ${feature}`).join('\n')}

## Applications

${product.applications.map((application) => `- ${application}`).join('\n')}
`;
  }

  const categoryMatch = pathname.match(/^\/category\/([^/]+)$/);
  if (categoryMatch) {
    const category = categories.find((item) => item.id === categoryMatch[1]);
    if (!category) return null;
    const categoryProducts = products.filter((product) => product.categories.includes(category.id) || product.primaryCategory === category.id);

    return `# ${category.title}

${category.description}

## Highlights

${category.highlights.map((highlight) => `- ${highlight}`).join('\n')}

## Products

${categoryProducts.map((product) => `- [${product.title}](${SITE_URL}/product/${product.slug}): ${product.description}`).join('\n')}
`;
  }

  return null;
}

export const apiCatalog = {
  linkset: [
    {
      anchor: `${SITE_URL}/api`,
      'service-desc': [
        {
          href: `${SITE_URL}/openapi.json`,
          type: 'application/openapi+json',
          title: 'Kiran Slido Craft public API description',
        },
      ],
      'service-doc': [
        {
          href: `${SITE_URL}/docs/api`,
          type: 'text/html',
          title: 'Kiran Slido Craft public API documentation',
        },
      ],
      status: [
        {
          href: `${SITE_URL}/api/health`,
          type: 'application/json',
          title: 'Kiran Slido Craft API health',
        },
      ],
    },
  ],
};

export const openApiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'Kiran Slido Craft Public API',
    version: '1.0.0',
    description: 'Public discovery endpoints for Kiran Slido Craft product catalog and agent metadata.',
  },
  servers: [{ url: SITE_URL }],
  paths: {
    '/api/health': {
      get: {
        summary: 'Check site API health',
        operationId: 'getHealth',
        responses: {
          '200': {
            description: 'Health status',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['status', 'service'],
                  properties: {
                    status: { type: 'string', const: 'ok' },
                    service: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/llms.txt': {
      get: {
        summary: 'Get machine-readable catalog summary',
        operationId: 'getLlmsCatalog',
        responses: {
          '200': {
            description: 'Markdown-like plain text catalog',
            content: {
              'text/plain': {
                schema: { type: 'string' },
              },
            },
          },
        },
      },
    },
    '/contact': {
      get: {
        summary: 'Open the quote and contact page',
        operationId: 'getContactPage',
        responses: {
          '200': {
            description: 'Contact page HTML',
          },
        },
      },
    },
  },
  'x-service-info': {
    categories: ['catalog', 'manufacturing', 'architectural-automation'],
    payment: {
      required: false,
      note: 'Public discovery and catalog endpoints do not require payment.',
    },
  },
};
