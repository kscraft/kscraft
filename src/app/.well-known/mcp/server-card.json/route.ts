import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/agent-discovery';

export async function GET() {
  return NextResponse.json({
    serverInfo: {
      name: 'ksco-public-site',
      version: '1.0.0',
    },
    transport: {
      type: 'streamable-http',
      endpoint: `${SITE_URL}/mcp`,
    },
    capabilities: {
      tools: [
        {
          name: 'search_ksco_catalog',
          description: 'Search public Kiran Slido Craft product catalog data.',
        },
        {
          name: 'list_ksco_categories',
          description: 'List public product categories.',
        },
        {
          name: 'get_ksco_product',
          description: 'Retrieve public product details by slug.',
        },
      ],
      resources: [
        {
          uri: `${SITE_URL}/llms.txt`,
          description: 'Machine-readable public product catalog.',
        },
      ],
      prompts: [],
    },
  });
}
