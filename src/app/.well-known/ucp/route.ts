import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/agent-discovery';

export async function GET() {
  return NextResponse.json({
    protocol_version: '1.0',
    services: [
      {
        id: 'public-catalog',
        name: 'Kiran Slido Craft public catalog',
        payment_required: false,
      },
    ],
    capabilities: ['discovery', 'catalog-read'],
    endpoints: {
      api_catalog: `${SITE_URL}/.well-known/api-catalog`,
      openapi: `${SITE_URL}/openapi.json`,
      documentation: `${SITE_URL}/docs/api`,
    },
  });
}
