import { NextResponse } from 'next/server';
import { catalog } from '@/lib/catalog';

const SITE_URL = 'https://soundproofindia.com';

export async function GET() {
  return NextResponse.json({
    protocolVersion: '0.3.0',
    name: 'Kiran Slido Craft Catalog Agent',
    version: '1.0.0',
    description: 'Public catalog discovery agent for Kiran Slido Craft acoustic systems, architectural automation products, services, and contact routes.',
    url: `${SITE_URL}/.well-known/agent-card.json`,
    provider: {
      organization: catalog.company.name,
      url: SITE_URL,
    },
    supportedInterfaces: [
      {
        name: 'public-web',
        url: SITE_URL,
        serviceUrl: SITE_URL,
        transport: 'https',
        protocol: 'A2A',
      },
      {
        name: 'llms-catalog',
        url: `${SITE_URL}/llms.txt`,
        serviceUrl: `${SITE_URL}/llms.txt`,
        transport: 'https',
        protocol: 'text/plain',
      },
    ],
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
      catalogSearch: true,
      productDiscovery: true,
      quoteRouting: true,
    },
    defaultInputModes: ['text/plain', 'application/json'],
    defaultOutputModes: ['text/plain', 'application/json', 'text/html'],
    skills: [
      {
        id: 'catalog-search',
        name: 'Catalog Search',
        description: 'Find public product categories and product detail pages for acoustic, soundproofing, motorized, roof sliding, and automation systems.',
        tags: ['catalog', 'products', 'search'],
        examples: ['Find acoustic sliding windows', 'List motorized roof sliding systems'],
      },
      {
        id: 'technical-specifications',
        name: 'Technical Specifications',
        description: 'Surface product descriptions, applications, features, and technical specifications from the public Kiran Slido Craft catalog.',
        tags: ['specifications', 'engineering', 'products'],
        examples: ['Get specifications for sound proof casement windows'],
      },
      {
        id: 'quote-routing',
        name: 'Quote Routing',
        description: 'Guide agents to the public contact and quote request paths for project inquiries.',
        tags: ['contact', 'quote', 'sales'],
        examples: ['How can I request a project quote?'],
      },
    ],
  });
}
