import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Next.js 16 proxy (formerly "middleware"). Skip Next internals, API routes,
  // and root metadata routes (icon, opengraph-image, sitemap, robots,
  // manifest) plus any file with an extension. Everything else is routed
  // through i18n so the locale resolves. `icon`/`opengraph-image` have no
  // extension, so they must be listed explicitly — otherwise it would 404 them.
  matcher:
    "/((?!api|_next|_vercel|icon|opengraph-image|sitemap|robots|manifest|.*\\..*).*)",
};
