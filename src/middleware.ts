import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow static assets, images, next system routes, and files with extensions
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Allow direct access to the login page
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // 3. Inspect the session authentication cookie
  const authCookie = request.cookies.get("symbion_auth");
  const isAuthenticated = authCookie?.value === "true";

  // 4. If unauthenticated, redirect directly to /login
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images)
     */
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
};
