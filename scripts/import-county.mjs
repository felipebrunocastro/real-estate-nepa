#!/usr/bin/env node
/**
 * Import recorded home-sale prices from a county deed/sales export and compute a
 * real median sale price per municipality — the path to real numbers for small
 * boroughs that Zillow/Redfin don't cover.
 *
 *   npm run market:county            # dry run
 *   npm run market:county -- --apply # write medianPrice + source into the sheet
 *
 * Options: --input <path> (default data/county-sales.csv),
 *          --source "Luzerne County records", --as-of 2026-08, --apply
 *
 * Input CSV needs at least: municipality, salePrice  (a saleDate column is
 * fine and ignored). County records provide SALE PRICES only — not active
 * inventory or days-on-market — so this fills medianPrice and leaves the other
 * metrics to Zillow/Redfin or the manual sheet.
 */
import { existsSync } from "node:fs";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parseCsv, readMarketInput, writeMarketInput, patchRows, generateMarketData } from "./market-io.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const arg = (name, def) => {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : def;
};
const apply = process.argv.includes("--apply");
const inputPath = arg("--input", join(root, "data", "county-sales.csv"));
const source = arg("--source", "County records");
const asOf = arg("--as-of", new Date().toISOString().slice(0, 7)); // YYYY-MM

// Map a municipality name (as it appears in county data) to our city slug.
// First keyword that appears in the lowercased name wins; refine as needed.
const MUNI_KEYWORDS = [
  ["wilkes-barre-pa", ["wilkes-barre", "wilkes barre"]],
  ["scranton-pa", ["scranton"]],
  ["pittston-pa", ["pittston"]],
  ["kingston-pa", ["kingston"]],
  ["dallas-pa", ["dallas"]],
  ["hazleton-pa", ["hazleton"]],
  ["nanticoke-pa", ["nanticoke"]],
  ["mountain-top-pa", ["mountain top", "wright twp", "wright township"]],
  ["clarks-summit-pa", ["clarks summit"]],
  ["plains-pa", ["plains"]],
  ["forty-fort-pa", ["forty fort"]],
  ["wyoming-pa", ["wyoming"]],
];

function slugFor(muni) {
  const s = muni.toLowerCase();
  for (const [slug, keys] of MUNI_KEYWORDS) {
    if (keys.some((k) => s.includes(k))) return slug;
  }
  return null;
}

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

if (!existsSync(inputPath)) {
  console.error(`No input file at ${inputPath}.`);
  console.error("Export recorded sales from the county assessor/records site to a CSV");
  console.error("with columns: municipality, salePrice  — then re-run.");
  process.exit(1);
}

const rows = parseCsv(readFileSync(inputPath, "utf8"));
const header = rows[0].map((h) => h.trim().toLowerCase());
const muniCol = header.indexOf("municipality");
const priceCol = header.indexOf("saleprice");
if (muniCol < 0 || priceCol < 0) {
  console.error('Input CSV must have "municipality" and "salePrice" columns.');
  process.exit(1);
}

const byArea = {};
let unmatched = 0;
for (const r of rows.slice(1)) {
  const slug = slugFor((r[muniCol] || "").trim());
  const price = Number(String(r[priceCol]).replace(/[$,]/g, ""));
  if (!slug || !Number.isFinite(price) || price <= 0) {
    if (!slug) unmatched++;
    continue;
  }
  (byArea[slug] ??= []).push(price);
}

const patches = {};
console.log(`Computed medians from ${inputPath} (as of ${asOf}):`);
for (const [slug, prices] of Object.entries(byArea)) {
  const med = Math.round(median(prices));
  console.log(`  ${slug}: median $${med.toLocaleString("en-US")} from ${prices.length} sale(s)`);
  patches[slug] = { medianPrice: String(med), source, asOf: `${asOf}-01` };
}
if (unmatched) console.log(`  (${unmatched} row(s) didn't match a known municipality — refine MUNI_KEYWORDS.)`);

if (Object.keys(patches).length === 0) {
  console.log("No usable rows. Check the municipality names and columns.");
  process.exit(0);
}

if (!apply) {
  console.log("\nDry run — re-run with `--apply` to write these into the sheet.");
  process.exit(0);
}

const updated = patchRows(readMarketInput(), patches);
writeMarketInput(updated);
const { real, sample } = generateMarketData();
console.log(`\nApplied. Regenerated market-data.ts (${real} real, ${sample} sample).`);
