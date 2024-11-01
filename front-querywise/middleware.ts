// src/middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Permitir acceso sin autenticación solo a la raíz
    if (pathname === '/') {
      return NextResponse.next();
    }

    // Redirige a la página de inicio de sesión si el usuario no está autenticado
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = '/api/auth/signin';
    signInUrl.searchParams.set('callbackUrl', pathname); // Callback para volver a la ruta después de autenticarse

    return NextResponse.redirect(signInUrl);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Permite acceso si hay un token
    },
  }
);

export const config = {
  matcher: ['/chat', '/dashboard', '/docs'], // Protege solo estas rutas
};
