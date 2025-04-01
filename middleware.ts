import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isDevMode = process.env.NODE_ENV === 'development';

  // Have a list of accessible routes/ Only want to access home page and waitlist
  const isHomeRoute = request.nextUrl.pathname === '/';
  const isWaitingListRoute = request.nextUrl.pathname === '/waiting-list';

  if (!isDevMode) {
    if (!isHomeRoute && !isWaitingListRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
