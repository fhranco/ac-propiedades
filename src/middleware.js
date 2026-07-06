import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Proteger todas las rutas del panel de control
  if (pathname.startsWith('/dashboard-') || pathname.startsWith('/dashboard')) {
    const sessionCookie = request.cookies.get('userSession');

    // Si no está la cookie de sesión, redirigir al login público
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard-home/:path*',
    '/dashboard-add-property/:path*',
    '/dashboard-my-properties/:path*',
    '/dashboard-my-favourites/:path*',
    '/dashboard-my-profile/:path*',
    '/dashboard-agents/:path*',
    '/dashboard-message/:path*',
    '/dashboard-superadmin/:path*',
  ],
};
