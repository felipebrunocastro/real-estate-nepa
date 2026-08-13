/**
 * Shared market-data IO for the CLI scripts:
 *   - parse/serialize CSV (quote-safe)
 *   - read/patch/write data/market-input.csv
 *   - regenerate data/market-data.ts (the file the app imports)
 *
 * Used by import-market.mjs, fetch-market.mjs and import-county.mjs.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const INPUT_CSV = join(root, "data", "market-input.csv");
export const OUTPUT_TS = join(root, "data", "market-data.ts");

export const METRIC_KEYS = [
  "medianPrice",
  "homesForSale",
  "daysOnMarket",
  "saleToList",
];

export const COLUMNS = [
  "area",
  "medianPrice",
  "medianPrice_change",
  "homesForSale",
  "homesForSale_change",
  "daysOnMarket",
  "daysOnMarket_change",
  "saleToList",
  "saleToList_change",
  "source",
  "sourceUrl",
  "asOf",
];

/** Minimal quote-aware CSV parser -> array of string arrays. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((v) => v.trim() !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) {
    row.push(field);
    if (row.some((v) => v.trim() !== "")) rows.push(row);
  }
  return rows;
}

const csvField = (v) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** Read market-input.csv into an array of row objects keyed by column. */
export function readMarketInput() {
  const [header, ...lines] = parseCsv(readFileSync(INPUT_CSV, "utf8"));
  const idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]));
  return lines.map((line) => {
    const obj = {};
    for (const c of COLUMNS) obj[c] = (line[idx[c]] ?? "").trim();
    return obj;
  });
}

/** Serialize row objects back to market-input.csv. */
export function writeMarketInput(rows) {
  const out = [COLUMNS.join(",")];
  for (const r of rows) out.push(COLUMNS.map((c) => csvField(r[c])).join(","));
  writeFileSync(INPUT_CSV, out.join("\n") + "\n");
}

/**
 * Apply `{ [area]: { field: value, ... } }` patches to the in-memory rows,
 * creating an area row when it doesn't exist. Returns the updated rows.
 */
export function patchRows(rows, patches) {
  const byArea = new Map(rows.map((r) => [r.area, r]));
  for (const [area, patch] of Object.entries(patches)) {
    let row = byArea.get(area);
    if (!row) {
      row = Object.fromEntries(COLUMNS.map((c) => [c, ""]));
      row.area = area;
      rows.push(row);
      byArea.set(area, row);
    }
    Object.assign(row, patch);
  }
  return rows;
}

const trendFromChange = (change) => {
  const t = (change || "").trim();
  if (!t) return undefined;
  if (t.startsWith("+")) return "up";
  if (t.startsWith("-")) return "down";
  return "flat";
};

/** Read market-input.csv and (re)write data/market-data.ts. Returns counts. */
export function generateMarketData() {
  const rows = readMarketInput();
  const areas = {};
  for (const r of rows) {
    if (!r.area) continue;
    const metrics = {};
    for (const key of METRIC_KEYS) {
      const rawValue = r[key];
      if (rawValue === "") continue;
      const value = Number(rawValue);
      if (!Number.isFinite(value)) {
        throw new Error(`Non-numeric ${key} for area "${r.area}": "${rawValue}"`);
      }
      const change = r[`${key}_change`];
      metrics[key] = {
        value,
        ...(change ? { change, trend: trendFromChange(change) } : {}),
      };
    }
    const source = r.source || "Sample data";
    areas[r.area] = {
      metrics,
      source,
      ...(r.sourceUrl ? { sourceUrl: r.sourceUrl } : {}),
      asOf: r.asOf || "2026-08-01",
      isSample: /^sample/i.test(source),
    };
  }
  if (!areas.nepa) {
    throw new Error('market-input.csv must include a "nepa" (regional) row.');
  }
  const banner =
    "// AUTO-GENERATED from data/market-input.csv — do not edit by hand.\n" +
    "// Edit the CSV (or run a fetch/import script) then run `npm run market`.\n";
  const body =
    banner +
    'import type { MarketArea } from "@/types";\n\n' +
    "export const marketData: Record<string, MarketArea> = " +
    JSON.stringify(areas, null, 2) +
    ";\n";
  writeFileSync(OUTPUT_TS, body);
  const total = Object.keys(areas).length;
  const real = Object.values(areas).filter((a) => !a.isSample).length;
  return { total, real, sample: total - real };
}
