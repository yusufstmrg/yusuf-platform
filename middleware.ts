import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Temporary production safety gate for the private workspace.
 * The private OS remains inaccessible until the Supabase Auth integration is
 * configured and the server-side auth check is enabled.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/os")) {
    return NextResponse.next();
  }

  const authReady = process.env.YUSUF_AUTH_READY === "true";
  if (!authReady) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/os/:path*"],
};
