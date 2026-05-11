import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/agent-discovery';

export async function GET() {
  return NextResponse.json({
    issuer: SITE_URL,
    authorization_endpoint: `${SITE_URL}/contact`,
    token_endpoint: `${SITE_URL}/api/oauth/token`,
    jwks_uri: `${SITE_URL}/.well-known/http-message-signatures-directory`,
    response_types_supported: ['code'],
    grant_types_supported: ['authorization_code', 'client_credentials'],
    scopes_supported: ['catalog:read'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['ES256'],
  });
}
