import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "es"];
const defaultLocale = "es";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle locale routing
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Exclude public files, API routes, and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") || // files like favicon.ico, sitemap.xml
    pathname.startsWith("/api")
  ) {
    // Still update auth session for API routes
    return await updateSession(request);
  }

  // Redirect to default locale if missing
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
    );
  }

  // Handle auth session updates
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
