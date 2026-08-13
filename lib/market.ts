import { marketData } from "@/data/market-data";
import { marketHistory, marketHistoryAsOf, marketHistorySource } from "@/data/market-history";
import type { MarketArea, MarketMetricKey, MarketHistory, ChartMetricKey } from "@/types";
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

/** Chart metrics, in display order. */
export const CHART_METRIC_KEYS: ChartMetricKey[] = [
  "medianPrice",
  "homesSold",
  "daysOnMarket",
  "inventory",
];

/**
 * Resolve chart history for an area, merging city-specific series with the
 * regional (nepa) series per metric. `regionalMetrics` lists which metrics fell
 * back to the region, so the chart can label those honestly.
 */
export function getMarketHistory(area: string): {
  history: MarketHistory;
  regionalMetrics: ChartMetricKey[];
  source: string;
  asOf: string;
} {
  const city = marketHistory[area] ?? {};
  const region = marketHistory[REGION_KEY] ?? {};
  const history: MarketHistory = {};
  const regionalMetrics: ChartMetricKey[] = [];
  for (const key of CHART_METRIC_KEYS) {
    if (city[key]?.length) {
      history[key] = city[key];
    } else if (region[key]?.length) {
      history[key] = region[key];
      regionalMetrics.push(key);
    }
  }
  return { history, regionalMetrics, source: marketHistorySource, asOf: marketHistoryAsOf };
}

/** Format a chart value for a chart metric (money vs. count). */
export function formatChartValue(key: ChartMetricKey, value: number): string {
  return key === "medianPrice" ? formatUsd(value) : value.toLocaleString("en-US");
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
