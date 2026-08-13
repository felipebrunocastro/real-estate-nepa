#!/usr/bin/env node
/**
 * Regenerate data/market-data.ts from data/market-input.csv.
 *
 *   npm run market      (or: node scripts/import-market.mjs)
 *
 * Fill in real figures + a real `source` in the CSV and re-run; areas whose
 * source is not "Sample data" automatically show real attribution instead of
 * the "Sample Data" badge. See the README's "Updating market data".
 */
import { generateMarketData, OUTPUT_TS } from "./market-io.mjs";

const { total, real, sample } = generateMarketData();
console.log(`Wrote ${OUTPUT_TS}`);
console.log(`${total} areas (${real} real, ${sample} sample).`);
