#!/usr/bin/env node
/**
 * Best-effort auto-fill of market figures from Zillow Research public CSVs.
 *
 *   npm run market:fetch            # dry run: fetch + show what it found
 *   npm run market:fetch -- --apply # write into data/market-input.csv + regen
 *
 * This is a convenience. The manual sheet (data/market-input.csv) is always the
 * reliable fallback. Zillow occasionally changes file names/URLs — if a feed
 * 404s, update the URL in the CONFIG below (or just fill the sheet by hand).
 * It NEVER touches the sheet unless --apply is passed AND every step succeeded.
 *
 * Coverage: the Scranton–Wilkes-Barre metro (-> `nepa`) and the larger cities
 * Zillow publishes at city level. Small boroughs stay on the manual/county
 * path.
 */
import { parseCsv, readMarketInput, writeMarketInput, patchRows, generateMarketData } from "./market-io.mjs";

const BASE = "https://files.zillowstatic.com/research/public_csvs";
const csv = (metric, level) =>
  `${BASE}/${metric}/${level}_${metric}_uc_sfrcondo_month.csv`;

// One entry per headline metric. `to` maps Zillow's raw value to our units.
const FEEDS = [
  { key: "medianPrice", dir: "median_sale_price", to: (v) => Math.round(v), pct: true },
  { key: "homesForSale", dir: "invt_fs", to: (v) => Math.round(v), pct: true },
  { key: "daysOnMarket", dir: "med_doz_pending", to: (v) => Math.round(v), days: true },
  { key: "saleToList", dir: "mean_sale_to_list", to: (v) => Math.round(v * 1000) / 10, pct: true },
];

// Our area -> the Zillow region to read it from.
const REGION_MAP = {
  nepa: { level: "Metro", name: "Scranton, PA" },
  "scranton-pa": { level: "City", name: "Scranton" },
  "wilkes-barre-pa": { level: "City", name: "Wilkes-Barre" },
  "hazleton-pa": { level: "City", name: "Hazleton" },
  "kingston-pa": { level: "City", name: "Kingston" },
  "pittston-pa": { level: "City", name: "Pittston" },
  "nanticoke-pa": { level: "City", name: "Nanticoke" },
};

const apply = process.argv.includes("--apply");

async function fetchCsv(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return parseCsv(await res.text());
}

/** Latest + previous numeric values (and the latest month label) for a row. */
function latestTwo(header, row) {
  const vals = [];
  for (let i = row.length - 1; i >= 0 && vals.length < 2; i--) {
    const n = Number(row[i]);
    if (row[i] !== "" && Number.isFinite(n)) vals.push({ n, date: header[i] });
  }
  return { latest: vals[0], prev: vals[1] };
}

function changeLabel(feed, latest, prev) {
  if (!prev) return "";
  if (feed.days) {
    const d = Math.round(latest - prev);
    return d === 0 ? "" : `${d > 0 ? "+" : ""}${d} days`;
  }
  const pct = ((latest - prev) / prev) * 100;
  if (!Number.isFinite(pct) || Math.abs(pct) < 0.05) return "";
  return `${pct > 0 ? "+" : ""}${pct.toFixed(1)}%`;
}

async function main() {
  const patches = {};
  let asOf = "";
  let ok = 0;
  let failed = 0;

  for (const feed of FEEDS) {
    for (const level of ["Metro", "City"]) {
      const areas = Object.entries(REGION_MAP).filter(([, m]) => m.level === level);
      if (areas.length === 0) continue;
      let rows;
      try {
        rows = await fetchCsv(csv(feed.dir, level));
      } catch (err) {
        console.warn(`  ! ${feed.key} (${level}): ${err.message}`);
        failed++;
        continue;
      }
      const header = rows[0];
      const nameCol = header.indexOf("RegionName");
      const stateCol = header.indexOf("StateName");
      for (const [area, m] of areas) {
        const match = rows.find(
          (r) =>
            r[nameCol] === m.name &&
            (level === "Metro" || stateCol < 0 || r[stateCol] === "PA"),
        );
        if (!match) {
          console.warn(`  ? ${feed.key}: no "${m.name}" (${level}) row`);
          continue;
        }
        const { latest, prev } = latestTwo(header, match);
        if (!latest) continue;
        const value = feed.to(latest.n);
        patches[area] ??= {};
        patches[area][feed.key] = String(value);
        const chg = changeLabel(feed, latest.n, prev?.n);
        if (chg) patches[area][`${feed.key}_change`] = chg;
        if (latest.date && (!asOf || latest.date > asOf)) asOf = latest.date;
        ok++;
      }
    }
  }

  const areas = Object.keys(patches);
  console.log(`\nFound ${ok} value(s) across ${areas.length} area(s); ${failed} feed error(s).`);
  for (const a of areas) console.log(`  ${a}: ${JSON.stringify(patches[a])}`);

  // Only publish an area when we got its headline metric (medianPrice). Areas
  // with just a stray metric stay on their existing (sample) data rather than
  // mislabeling sample values as real. For eligible areas, build a FULL patch
  // that blanks any metric we didn't fetch, so no sample value lingers under
  // the real-source label.
  const asOfDate = asOf
    ? (/^\d{4}-\d{2}-\d{2}$/.test(asOf) ? asOf : `${asOf}-01`)
    : "";
  const applyPatches = {};
  const skipped = [];
  for (const a of areas) {
    if (!patches[a].medianPrice) { skipped.push(a); continue; }
    const full = {
      source: "Zillow Research",
      sourceUrl: "https://www.zillow.com/research/data/",
      ...(asOfDate ? { asOf: asOfDate } : {}),
    };
    for (const key of ["medianPrice", "homesForSale", "daysOnMarket", "saleToList"]) {
      full[key] = patches[a][key] ?? "";
      full[`${key}_change`] = patches[a][`${key}_change`] ?? "";
    }
    applyPatches[a] = full;
  }
  if (skipped.length) {
    console.log(`\nKept on existing data (no median fetched): ${skipped.join(", ")}`);
  }

  if (Object.keys(applyPatches).length === 0) {
    console.log("\nNothing to apply. Fill data/market-input.csv by hand for uncovered areas.");
    process.exit(failed ? 1 : 0);
  }

  if (!apply) {
    console.log(`\nDry run — re-run with \`--apply\` to publish: ${Object.keys(applyPatches).join(", ")}.`);
    return;
  }
  const rows = patchRows(readMarketInput(), applyPatches);
  writeMarketInput(rows);
  const { real, sample } = generateMarketData();
  console.log(`\nApplied. Regenerated market-data.ts (${real} real, ${sample} sample).`);
}

main().catch((err) => {
  console.error("Fetch aborted (sheet left unchanged):", err.message);
  process.exit(1);
});
