/**
 * Primary navigation model. Labels are referenced by translation KEY (see
 * `messages/*.json` -> `nav`) rather than hardcoded strings, so the menu is
 * fully trilingual. Grouped for the desktop mega-menu and mobile accordion.
 */

export interface NavLink {
  /** Translation key under `nav.links`. */
  key: string;
  href: string;
}

export interface NavGroup {
  /** Translation key under `nav.groups`. */
  key: string;
  links: NavLink[];
}

export const navGroups: NavGroup[] = [
  {
    key: "property",
    links: [
      { key: "propertySearch", href: "/property-search" },
      { key: "buy", href: "/buy" },
      { key: "sell", href: "/sell" },
      { key: "firstTimeBuyers", href: "/first-time-buyers" },
    ],
  },
  {
    key: "research",
    links: [
      { key: "invest", href: "/invest" },
      { key: "marketReports", href: "/market-reports" },
      { key: "nepaNews", href: "/nepa-news" },
      { key: "mortgageCalculator", href: "/mortgage-calculator" },
    ],
  },
  {
    key: "explore",
    links: [
      { key: "relocation", href: "/relocation" },
      { key: "cities", href: "/cities" },
    ],
  },
  {
    key: "connect",
    links: [
      { key: "realtors", href: "/realtors" },
      { key: "contact", href: "/contact" },
    ],
  },
];

/** Footer link columns reuse the same translation keys where possible. */
export const footerColumns: NavGroup[] = [
  {
    key: "property",
    links: [
      { key: "propertySearch", href: "/property-search" },
      { key: "buy", href: "/buy" },
      { key: "sell", href: "/sell" },
      { key: "firstTimeBuyers", href: "/first-time-buyers" },
    ],
  },
  {
    key: "research",
    links: [
      { key: "invest", href: "/invest" },
      { key: "marketReports", href: "/market-reports" },
      { key: "nepaNews", href: "/nepa-news" },
      { key: "mortgageCalculator", href: "/mortgage-calculator" },
    ],
  },
  {
    key: "explore",
    links: [
      { key: "relocation", href: "/relocation" },
      { key: "cities", href: "/cities" },
      { key: "realtors", href: "/realtors" },
      { key: "contact", href: "/contact" },
    ],
  },
  {
    key: "company",
    links: [
      { key: "about", href: "/about" },
      { key: "privacy", href: "/privacy" },
      { key: "terms", href: "/terms" },
      { key: "fairHousing", href: "/fair-housing" },
      { key: "accessibility", href: "/accessibility" },
    ],
  },
];
