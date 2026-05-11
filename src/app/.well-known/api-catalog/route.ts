import { NextResponse } from 'next/server';
import { apiCatalog } from '@/lib/agent-discovery';

export async function GET() {
  return NextResponse.json(apiCatalog, {
    headers: {
      'Content-Type': 'application/linkset+json; charset=utf-8',
    },
  });
}
