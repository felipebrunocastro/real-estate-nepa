import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation helpers.
 *
 * Always import `Link`, `redirect`, `usePathname`, `useRouter` and
 * `getPathname` from here (NOT from `next/link` / `next/navigation`) so that
 * the active locale prefix is preserved automatically when navigating and when
 * switching languages.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
