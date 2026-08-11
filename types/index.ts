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
