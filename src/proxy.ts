import { NextRequest, NextResponse } from 'next/server';
import { AGENT_LINK_HEADER, estimateMarkdownTokens, getMarkdownForPath } from '@/lib/agent-discovery';

const MAX_CONTACT_BODY_BYTES = 64 * 1024;
const ALLOWED_CONTACT_CONTENT_TYPES = [
  'application/x-www-form-urlencoded',
  'multipart/form-data',
];

function rejectContactRequest(status: number) {
  return new NextResponse('Request rejected.', {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accept = request.headers.get('accept') || '';

  if (request.method === 'POST' && pathname === '/contact') {
    const contentType = request.headers.get('content-type')?.toLowerCase() || '';
    const contentLength = Number(request.headers.get('content-length'));

    if (!ALLOWED_CONTACT_CONTENT_TYPES.some((allowed) => contentType.startsWith(allowed))) {
      return rejectContactRequest(415);
    }

    if (Number.isFinite(contentLength) && contentLength > MAX_CONTACT_BODY_BYTES) {
      return rejectContactRequest(413);
    }
  }

  if (accept.includes('text/markdown')) {
    const markdown = getMarkdownForPath(pathname);

    if (markdown) {
      return new NextResponse(markdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'x-markdown-tokens': String(estimateMarkdownTokens(markdown)),
          Link: AGENT_LINK_HEADER,
          Vary: 'Accept',
        },
      });
    }
  }

  const response = NextResponse.next();
  response.headers.set('Link', AGENT_LINK_HEADER);
  response.headers.set('Vary', 'Accept');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
