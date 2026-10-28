import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const handleI18nRouting = createMiddleware({
  locales: ["uk", "en", "ru"],
  defaultLocale: "uk",
  localePrefix: "always",
  localeDetection: false,
});

export default function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
