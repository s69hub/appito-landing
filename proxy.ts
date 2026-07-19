import { NextRequest, NextResponse } from "next/server";

// Middleware runs on the Edge Runtime — it can't import better-sqlite3.
// It only checks cookie *presence* (fast guard).
// Full DB token validation happens in app/admin/layout.tsx (Node.js server component).

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

  // Forward the pathname as a header so server components can read it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/admin/:path*"],
};
