import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Next.js 16 proxy (formerly "middleware"). The bare "/" is listed FIRST and
  // explicitly: without it, Vercel's edge routing can skip the proxy on the
  // root, and since there is no app/page.tsx (only app/[locale]/page.tsx) the
  // homepage would 404. The second pattern covers everything else, skipping
  // Next internals, API routes, root metadata routes (icon, opengraph-image,
  // sitemap, robots, manifest) and any file with an extension.
  matcher: [
    "/",
    "/((?!api|_next|_vercel|icon|opengraph-image|sitemap|robots|manifest|.*\\..*).*)",
  ],
};
