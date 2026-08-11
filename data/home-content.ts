import type { Journey, MarketStat, InsightCard } from "@/types";

/** Homepage journey cards. Copy is translated via `home.journeys.<key>`. */
export const journeys: Journey[] = [
  { key: "buy", href: "/buy", icon: "buy" },
  { key: "sell", href: "/sell", icon: "sell" },
  { key: "invest", href: "/invest", icon: "invest" },
  { key: "move", href: "/relocation", icon: "move" },
  { key: "firstTime", href: "/first-time-buyers", icon: "first-time" },
];

/**
 * DEMO market snapshot. Values are illustrative placeholders — NOT live market
 * statistics. The UI labels this clearly as "Sample Data". A future data/API
 * integration will supply real values through the same shape.
 */
export const marketStats: MarketStat[] = [
  { key: "medianPrice", value: "$219,000", changeLabel: "+3.1%", trend: "up" },
  { key: "homesForSale", value: "1,240", changeLabel: "-2.4%", trend: "down" },
  { key: "daysOnMarket", value: "38", changeLabel: "+5", trend: "up" },
  { key: "saleToList", value: "98.6%", changeLabel: "+0.4%", trend: "up" },
];

/** Market-insight article cards. Titles/excerpts via `home.insights.items`. */
export const insightCards: InsightCard[] = [
  { key: "marketReport", category: "market-report", href: "/market-reports" },
  { key: "housingNews", category: "housing-news", href: "/nepa-news" },
  { key: "mortgage", category: "mortgage", href: "/nepa-news" },
  { key: "buyerGuide", category: "buyer-guide", href: "/buy" },
  { key: "sellerGuide", category: "seller-guide", href: "/sell" },
  { key: "investor", category: "investor", href: "/invest" },
];
