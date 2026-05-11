import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/agent-discovery';

export async function GET() {
  return NextResponse.json({
    keys: [
      {
        kty: 'EC',
        crv: 'P-256',
        kid: 'ksco-web-bot-auth-2026-05',
        use: 'sig',
        alg: 'ES256',
        x: '2rr8oM6ANQEKn8WxfMd85BczJlNEEyQ_ZPi_7A1ay3A',
        y: 'jx8u1OH8iI_E8K30IdRttCu75yjYU2AaOOJyIzkB02I',
      },
    ],
    issuer: SITE_URL,
  });
}
