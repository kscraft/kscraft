import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/agent-discovery';

export async function GET() {
  return NextResponse.json({
    resource: SITE_URL,
    authorization_servers: [SITE_URL],
    scopes_supported: ['catalog:read'],
    bearer_methods_supported: ['header'],
    resource_documentation: `${SITE_URL}/docs/api`,
  });
}
