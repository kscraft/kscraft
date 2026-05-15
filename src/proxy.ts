import { NextRequest, NextResponse } from 'next/server';
import { AGENT_LINK_HEADER, estimateMarkdownTokens, getMarkdownForPath } from '@/lib/agent-discovery';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accept = request.headers.get('accept') || '';

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
