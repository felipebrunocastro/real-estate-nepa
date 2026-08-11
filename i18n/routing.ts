import { defineRouting } from "next-intl/routing";

/**
 * Central i18n routing definition for Real Estate in NEPA.
 *
 * - English is the default language and is served WITHOUT a URL prefix (`/`).
 * - Spanish is served under `/es/...`.
 * - Portuguese is served under `/pt/...`.
 *
 * `localePrefix: "as-needed"` produces exactly this behaviour: the default
 * locale has no prefix while the others are prefixed. Adding a new language
 * later only requires appending it to `locales` and providing a matching
 * `messages/<locale>.json` file.
 */
export const routing = defineRouting({
  locales: ["en", "es", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
