import { NextRequest, NextResponse } from 'next/server';

const legacyHost = 'cookierun.syki66.com';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0].toLowerCase();

  if (host !== legacyHost) {
    return NextResponse.next();
  }

  const noticeUrl = request.nextUrl.clone();
  const returnTo =
    request.nextUrl.pathname === '/'
      ? '/simulator/ready'
      : `${request.nextUrl.pathname}${request.nextUrl.search}`;

  noticeUrl.pathname = '/domain-moved';
  noticeUrl.search = '';
  noticeUrl.searchParams.set('returnTo', returnTo);

  return NextResponse.rewrite(noticeUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
