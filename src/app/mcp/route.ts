import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/agent-discovery';

export async function GET() {
  return NextResponse.json({
    serverInfo: {
      name: 'ksco-public-site',
      version: '1.0.0',
    },
    card: `${SITE_URL}/.well-known/mcp/server-card.json`,
    message: 'MCP Streamable HTTP transport is advertised for discovery; browser WebMCP tools are available on page load.',
  });
}

export async function POST() {
  return NextResponse.json(
    {
      error: 'mcp_transport_not_enabled',
      error_description: 'Use the browser WebMCP tools or public discovery endpoints for current catalog access.',
    },
    { status: 501 },
  );
}
