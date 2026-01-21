import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "es"];
const defaultLocale = "es";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Exclude public files (images, etc)
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") || // files like favicon.ico, sitemap.xml
    pathname.startsWith("/api")
  ) {
    return;
  }

  if (pathnameIsMissingLocale) {
    // Detect user preference? For now simple default.
    // Ideally we parse Accept-Language.
    const locale = defaultLocale;

    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};
