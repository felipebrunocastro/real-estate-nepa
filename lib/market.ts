import { marketData } from "@/data/market-data";
import type { MarketArea, MarketMetricKey } from "@/types";
import { formatUsd } from "./utils";

/**
 * Market-data access layer. Every market snapshot reads through here, so the
 * data source (currently the generated data/market-data.ts, fed by
 * data/market-input.csv) can be replaced with a real feed without touching the
 * UI. See scripts/import-market.mjs and the README's "Updating market data".
 */

/** Canonical display order for the four headline metrics. */
export const MARKET_METRIC_KEYS: MarketMetricKey[] = [
  "medianPrice",
  "homesForSale",
  "daysOnMarket",
  "saleToList",
];

const REGION_KEY = "nepa";

/**
 * Resolve market data for an area (a city slug, or "nepa" for the region).
 * Falls back to the regional dataset when a specific area has none, flagging
 * `isFallback` so the UI can label it a regional estimate.
 */
export function getMarketArea(area: string): {
  data: MarketArea;
  isFallback: boolean;
} {
  const specific = marketData[area];
  if (specific) return { data: specific, isFallback: false };
  return { data: marketData[REGION_KEY], isFallback: true };
}

/** Format a raw metric value for display according to its metric type. */
export function formatMarketValue(key: MarketMetricKey, value: number): string {
  switch (key) {
    case "medianPrice":
      return formatUsd(value);
    case "homesForSale":
      return value.toLocaleString("en-US");
    case "daysOnMarket":
      return String(value);
    case "saleToList":
      return `${value.toFixed(1)}%`;
  }
}
