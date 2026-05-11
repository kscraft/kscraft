import { NextResponse } from 'next/server';
import { openApiDocument } from '@/lib/agent-discovery';

export async function GET() {
  return NextResponse.json(openApiDocument, {
    headers: {
      'Content-Type': 'application/openapi+json; charset=utf-8',
    },
  });
}
