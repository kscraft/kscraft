import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/agent-discovery';

export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /private/
Disallow: /api/
# Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: GPTBot
Allow: /
# Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: Google-Extended
Allow: /
# Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: ClaudeBot
Allow: /
# Content-Signal: ai-train=no, search=yes, ai-input=yes

Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_URL}
`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
