import { NextResponse } from "next/server";

export function middleware(req) {
  const session = req.cookies.get('session');

  const publicPaths = ['/login', '/register'];

  if (!session && !publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

 if (session && publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register', '/products/:path*', '/addProducts' ],
}