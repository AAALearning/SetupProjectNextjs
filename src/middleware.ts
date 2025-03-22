import chain from "./utils/middlewares/chain";
import withI18nMiddleware from "./utils/middlewares/i18nmiddleware";
import testMiddleware from "./utils/middlewares/testmiddleware";

export default chain([withI18nMiddleware, testMiddleware]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$).*)"],
};
