import type { Locale } from "@/i18n/routing";

/** A localised string keyed by locale code. */
export type Localized = Record<Locale, string>;

/** Per-city SAMPLE market statistics (demo data — never live figures). */
export interface CityStats {
  medianPrice: string;
  homesForSale: string;
  daysOnMarket: string;
  saleToList: string;
}

/** Northeastern Pennsylvania city / community. */
export interface City {
  /** SEO slug, e.g. "scranton-pa" (used at /cities/scranton-pa). */
  slug: string;
  name: string;
  county: "Luzerne County" | "Lackawanna County";
  /** Short, neutral, Fair-Housing-safe description per language. */
  description: Localized;
  /** Marks the city as featured on the homepage. */
  featured: boolean;
  /** Placeholder image accent used until real photography is added. */
  accent: string;
  /**
   * Neutral, factual local landmarks / features (proper nouns). Kept
   * language-neutral. MUST avoid subjective or Fair-Housing-sensitive claims.
   */
  highlights: string[];
  /** Slugs of nearby communities for internal linking. */
  nearby: string[];
  /** SAMPLE market snapshot shown with a clear "Sample Data" label. */
  stats: CityStats;
}

/** Sample property listing. NEVER represents a real MLS listing. */
export interface SampleProperty {
  id: string;
  price: number;
  address: string;
  citySlug: string;
  cityName: string;
  beds: number;
  baths: number;
  sqft: number;
  type: "single-family" | "multi-family" | "condo" | "townhouse" | "land";
  status: "for-sale" | "pending" | "coming-soon";
  accent: string;
}

/** Homepage "quick user path" journey card. */
export interface Journey {
  key: string;
  href: string;
  icon: "buy" | "sell" | "invest" | "move" | "first-time";
}

/** A single market-snapshot statistic (demo data). */
export interface MarketStat {
  key: string;
  value: string;
  changeLabel?: string;
  trend?: "up" | "down" | "flat";
}

/** Editorial / market-insight article card (demo content). */
export interface InsightCard {
  key: string;
  category:
    | "market-report"
    | "housing-news"
    | "mortgage"
    | "buyer-guide"
    | "seller-guide"
    | "investor";
  href: string;
}

/* ---------------------------------------------------------------------------
   Publication system (Phase 4)
   Article content lives in the content layer (data/articles.ts today; a future
   MDX / database / headless CMS behind lib/content.ts). Bodies are portable,
   CMS-agnostic structured blocks rather than raw HTML/markdown.
--------------------------------------------------------------------------- */

/** Publication sections, each mapped to a route segment. */
export type ArticleSection = "market-reports" | "nepa-news";

/** Editorial category taxonomy shared across the publication. */
export type ArticleCategory =
  | "market-report"
  | "housing-news"
  | "mortgage"
  | "buying"
  | "selling"
  | "investing"
  | "relocation"
  | "cities"
  | "policy"
  | "development";

/** A single labeled chart datapoint (axis labels kept language-neutral). */
export interface ChartPoint {
  label: string;
  value: number;
}

/** A single statistic within a stats block. */
export interface ArticleStat {
  label: Localized;
  value: string;
  change?: string;
  trend?: "up" | "down" | "flat";
}

/** Portable, CMS-agnostic content blocks that make up an article body. */
export type ContentBlock =
  | { type: "heading"; text: Localized }
  | { type: "paragraph"; text: Localized }
  | { type: "list"; items: Localized[] }
  | { type: "stats"; items: ArticleStat[] }
  | { type: "barChart"; title: Localized; unit: string; data: ChartPoint[] }
  | { type: "lineChart"; title: Localized; unit: string; data: ChartPoint[] }
  | { type: "note"; text: Localized };

/** A cited source (demo sources for sample content). */
export interface ArticleSource {
  label: string;
  url?: string;
}

/** Full article record. Demo articles set `isSample: true`. */
export interface Article {
  slug: string;
  section: ArticleSection;
  category: ArticleCategory;
  title: Localized;
  excerpt: Localized;
  body: ContentBlock[];
  author: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt?: string;
  /** Optional city slug + county for local filtering. */
  city?: string;
  county?: "Luzerne County" | "Lackawanna County";
  tags: string[];
  sources: ArticleSource[];
  accent: string;
  /** Demonstration content flag — always true until real editorial exists. */
  isSample: boolean;
}

/** Flattened, locale-resolved shape passed to client list/filter components. */
export interface ArticleCardData {
  slug: string;
  section: ArticleSection;
  category: ArticleCategory;
  title: string;
  excerpt: string;
  publishedAt: string;
  city?: string;
  cityName?: string;
  accent: string;
}

/* ---------------------------------------------------------------------------
   Realtors directory (Phase 7)
   Demo profiles set `isSample: true`. Contact details on sample profiles use
   reserved fictional ranges (555-01xx phones, example.com). No real people,
   licenses, reviews, or credentials are ever fabricated.
--------------------------------------------------------------------------- */

export type RealtorSpecialty =
  | "buyer-agent"
  | "listing-agent"
  | "investment"
  | "commercial"
  | "relocation"
  | "first-time"
  | "luxury"
  | "rental";

/** Monetization tier. `premium` is reserved for a later phase. Never paid here. */
export type RealtorTier = "standard" | "featured" | "premium";

export interface RealtorContact {
  phone?: string;
  email?: string;
  website?: string;
  social?: { label: string; url: string }[];
}

export interface Realtor {
  slug: string;
  name: string;
  brokerage: string;
  /** A note, NOT a fabricated license number (e.g. "PA-licensed (sample)"). */
  licenseNote: Localized;
  /** Locale codes the professional works in, e.g. ["en", "es"]. */
  languages: string[];
  /** City slugs served (link to city pages + power the city filter). */
  serviceAreas: string[];
  specialties: RealtorSpecialty[];
  contact: RealtorContact;
  bio: Localized;
  verified: boolean;
  tier: RealtorTier;
  accent: string;
  /** Demonstration flag — always true until real professionals join. */
  isSample: boolean;
}

/** Locale-resolved, serializable shape for the client directory/filter. */
export interface RealtorCardData {
  slug: string;
  name: string;
  brokerage: string;
  languages: string[];
  serviceAreas: string[];
  serviceAreaNames: string[];
  specialties: RealtorSpecialty[];
  verified: boolean;
  tier: RealtorTier;
  accent: string;
}
