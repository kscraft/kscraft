import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/agent-discovery';

export async function GET() {
  return NextResponse.json({
    protocol: {
      name: 'acp',
      version: '0.1.0',
    },
    api_base_url: SITE_URL,
    transports: ['https'],
    capabilities: {
      services: [
        {
          id: 'catalog-discovery',
          name: 'Public product catalog discovery',
          payment_required: false,
        },
      ],
    },
  });
}
