import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip Next.js internals, static assets and API routes. Everything else is
  // routed through the i18n middleware so the correct locale is resolved.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
