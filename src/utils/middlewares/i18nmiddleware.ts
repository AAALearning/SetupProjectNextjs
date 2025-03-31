import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { langs as locales } from "@/utils/dictionaries";

const paths = ["portfolio"];

function isI18nUrl(url: string) {
  const regex = new RegExp(`^\/([^\/]+\/)?(${paths.join("|")})`);
  return regex.test(url);
}

function getLocale(request: NextRequest) {
  const cookieLang = request.cookies.get("lang")?.value ?? "";
  if (locales.includes(cookieLang)) return cookieLang;
  const lang = request.headers.get("accept-language"); // Default of user browser, có thể dùng lib negotiator để lấy
  return lang?.split(",")[0]?.split("-")?.[0] ?? locales[0];
}

export default function withI18nMiddleware(
  next: (request: NextRequest, event: NextFetchEvent) => Promise<NextResponse>
): (request: NextRequest, event: NextFetchEvent) => Promise<NextResponse> {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const { pathname } = request.nextUrl;
    if (!isI18nUrl(pathname)) {
      return next(request, event);
    }
    const localeInPathName = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
    if (localeInPathName) {
      const response = await next(request, event);
      response.cookies.set("lang", localeInPathName, {
        sameSite: "strict",
        maxAge: 31536000,
      });
      return response;
    }
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  };
}
