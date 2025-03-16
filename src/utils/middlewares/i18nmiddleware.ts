import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";

const locales = ["en", "vi"];
const paths = ["/portfolio"];

function getLocale(request: NextRequest) {
  const cookieLang = request.cookies.get("lang")?.value ?? "";
  if (locales.includes(cookieLang)) return cookieLang;
  const lang = request.headers.get("accept-language");
  if (lang == null) {
    return locales[0];
  }
  return lang.split(",")[0]?.split("-")?.[0] ?? locales[0];
}

export function withI18nMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const { pathname } = request.nextUrl;
    if (!paths.some((p) => pathname.startsWith(`${p}/`) || pathname == p)) {
      return middleware(request, event, response);
    }
    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
    if (pathnameHasLocale) return middleware(request, event, response);
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  };
}
