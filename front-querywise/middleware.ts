import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Mantén la ruta raíz como pública
const publicRoutes = ["/"];

export default async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  // Si la ruta no es pública, requerir autenticación
  if (!publicRoutes.includes(pathname)) {
    const token = await getToken({ req: request });
    
    // Si el usuario no está autenticado, redirigir a la raíz ("/")
    if (!token) {
      const url = new URL("/", request.url);
      return NextResponse.redirect(url);
    }
  }

  return res;
}
