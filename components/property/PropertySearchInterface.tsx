"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { cities } from "@/data/cities";
import { sampleProperties } from "@/data/sample-properties";
import type { SampleProperty } from "@/types";
import { PropertyCard } from "./PropertyCard";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { Icon } from "@/components/ui/Icon";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { formatUsd, cn } from "@/lib/utils";

export interface SearchFilters {
  location: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
  baths: string;
  type: string;
  status: string;
  minSqft: string;
  lotSize: string;
}

type SortKey = "relevance" | "price-asc" | "price-desc" | "beds-desc";

/**
 * Professional property-search interface. The filter model and the
 * `SampleProperty` shape mirror what a future IDX/MLS provider will supply, so
 * the data source can be swapped without touching this UI. Until then it
 * filters clearly-labeled SAMPLE listings and shows an integration notice — it
 * never presents invented live inventory.
 */
export function PropertySearchInterface({
  initial,
}: {
  initial: Partial<SearchFilters>;
}) {
  const t = useTranslations("propertySearchUi");
  const ts = useTranslations("search");
  const tp = useTranslations("properties");

  const [filters, setFilters] = useState<SearchFilters>({
    location: initial.location ?? "",
    minPrice: initial.minPrice ?? "",
    maxPrice: initial.maxPrice ?? "",
    beds: initial.beds ?? "",
    baths: initial.baths ?? "",
    type: initial.type ?? "",
    status: initial.status ?? "",
    minSqft: initial.minSqft ?? "",
    lotSize: initial.lotSize ?? "",
  });
  const [sort, setSort] = useState<SortKey>("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  function set<K extends keyof SearchFilters>(key: K, value: string) {
    setFilters((f) => ({ ...f, [key]: value }));
  }
  function reset() {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      beds: "",
      baths: "",
      type: "",
      status: "",
      minSqft: "",
      lotSize: "",
    });
  }

  const results = useMemo(() => {
    let list = sampleProperties.filter((p) => {
      if (filters.location && p.citySlug !== filters.location) return false;
      if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
      if (filters.beds && p.beds < Number(filters.beds)) return false;
      if (filters.baths && p.baths < Number(filters.baths)) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (filters.minSqft && p.sqft < Number(filters.minSqft)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "beds-desc":
          return b.beds - a.beds;
        default:
          return 0;
      }
    });
    return list;
  }, [filters, sort]);

  const fieldClass =
    "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-navy-900 focus:border-accent-500 focus:outline-none";
  const labelClass =
    "mb-1 block text-xs font-semibold uppercase tracking-wide text-muted";

  const priceOptions = ["100000", "150000", "200000", "300000", "400000", "500000"];

  const filterPanel = (
    <form
      className="space-y-4"
      aria-label={ts("formLabel")}
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label className={labelClass} htmlFor="f-location">
          {ts("location")}
        </label>
        <select
          id="f-location"
          className={fieldClass}
          value={filters.location}
          onChange={(e) => set("location", e.target.value)}
        >
          <option value="">{ts("anyLocation")}</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}, PA
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass} htmlFor="f-min">
            {ts("minPrice")}
          </label>
          <select
            id="f-min"
            className={fieldClass}
            value={filters.minPrice}
            onChange={(e) => set("minPrice", e.target.value)}
          >
            <option value="">{ts("noMin")}</option>
            {priceOptions.map((p) => (
              <option key={p} value={p}>
                ${Number(p).toLocaleString("en-US")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="f-max">
            {ts("maxPrice")}
          </label>
          <select
            id="f-max"
            className={fieldClass}
            value={filters.maxPrice}
            onChange={(e) => set("maxPrice", e.target.value)}
          >
            <option value="">{ts("noMax")}</option>
            {priceOptions.map((p) => (
              <option key={p} value={p}>
                ${Number(p).toLocaleString("en-US")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass} htmlFor="f-beds">
            {ts("beds")}
          </label>
          <select
            id="f-beds"
            className={fieldClass}
            value={filters.beds}
            onChange={(e) => set("beds", e.target.value)}
          >
            <option value="">{ts("any")}</option>
            {["1", "2", "3", "4", "5"].map((b) => (
              <option key={b} value={b}>
                {b}+
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="f-baths">
            {t("baths")}
          </label>
          <select
            id="f-baths"
            className={fieldClass}
            value={filters.baths}
            onChange={(e) => set("baths", e.target.value)}
          >
            <option value="">{ts("any")}</option>
            {["1", "2", "3"].map((b) => (
              <option key={b} value={b}>
                {b}+
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="f-type">
          {ts("propertyType")}
        </label>
        <select
          id="f-type"
          className={fieldClass}
          value={filters.type}
          onChange={(e) => set("type", e.target.value)}
        >
          <option value="">{ts("anyType")}</option>
          <option value="single-family">{ts("types.singleFamily")}</option>
          <option value="multi-family">{ts("types.multiFamily")}</option>
          <option value="condo">{ts("types.condo")}</option>
          <option value="townhouse">{ts("types.townhouse")}</option>
          <option value="land">{ts("types.land")}</option>
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="f-status">
          {t("status")}
        </label>
        <select
          id="f-status"
          className={fieldClass}
          value={filters.status}
          onChange={(e) => set("status", e.target.value)}
        >
          <option value="">{t("anyStatus")}</option>
          <option value="for-sale">{tp("status.for-sale")}</option>
          <option value="pending">{tp("status.pending")}</option>
          <option value="coming-soon">{tp("status.coming-soon")}</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass} htmlFor="f-sqft">
            {t("minSqft")}
          </label>
          <select
            id="f-sqft"
            className={fieldClass}
            value={filters.minSqft}
            onChange={(e) => set("minSqft", e.target.value)}
          >
            <option value="">{ts("any")}</option>
            {["1000", "1500", "2000", "2500"].map((s) => (
              <option key={s} value={s}>
                {Number(s).toLocaleString("en-US")}+
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="f-lot">
            {t("lotSize")}
          </label>
          <select
            id="f-lot"
            className={fieldClass}
            value={filters.lotSize}
            onChange={(e) => set("lotSize", e.target.value)}
          >
            <option value="">{ts("any")}</option>
            <option value="0.25">0.25+ {t("acres")}</option>
            <option value="0.5">0.5+ {t("acres")}</option>
            <option value="1">1+ {t("acres")}</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={reset}
          className="text-sm font-semibold text-accent-600 hover:text-accent-700"
        >
          {t("reset")}
        </button>
        <button
          type="button"
          title={t("savedSearchSoon")}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted"
        >
          <Icon name="check" className="h-4 w-4" />
          {t("saveSearch")}
        </button>
      </div>
    </form>
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
      {/* Filters — sidebar on desktop, collapsible on mobile */}
      <aside>
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          className="mb-4 flex w-full items-center justify-between rounded-md border border-border bg-surface px-4 py-3 font-semibold text-navy-900 lg:hidden"
          aria-expanded={filtersOpen}
        >
          <span className="inline-flex items-center gap-2">
            <Icon name="search" className="h-5 w-5" />
            {t("filters")}
          </span>
          <Icon
            name="chevron-down"
            className={cn("h-5 w-5 transition-transform", filtersOpen && "rotate-180")}
          />
        </button>
        <div
          className={cn(
            "rounded-xl border border-border bg-surface p-5 lg:block",
            filtersOpen ? "block" : "hidden",
          )}
        >
          <p className="mb-4 hidden font-display text-lg font-semibold text-navy-900 lg:block">
            {t("filters")}
          </p>
          {filterPanel}
        </div>
      </aside>

      {/* Results */}
      <div>
        {/* Integration notice */}
        <div className="mb-5 flex flex-col gap-2 rounded-xl border border-amber-300 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm font-medium text-amber-900">
            <SampleBadge>{tp("sampleLabel")}</SampleBadge>
            {t("integrationNotice")}
          </p>
        </div>

        {/* Toolbar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {t("resultCount", { count: results.length })}
          </p>
          <div className="flex items-center gap-3">
            <label className="sr-only" htmlFor="sort">
              {t("sortLabel")}
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-navy-900 focus:outline-none"
            >
              <option value="relevance">{t("sort.relevance")}</option>
              <option value="price-asc">{t("sort.priceAsc")}</option>
              <option value="price-desc">{t("sort.priceDesc")}</option>
              <option value="beds-desc">{t("sort.bedsDesc")}</option>
            </select>
            <div className="flex overflow-hidden rounded-md border border-border">
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                aria-label={t("gridView")}
                className={cn(
                  "p-2",
                  view === "grid" ? "bg-navy-900 text-white" : "bg-surface text-muted",
                )}
              >
                <Icon name="area" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                aria-label={t("listView")}
                className={cn(
                  "p-2",
                  view === "list" ? "bg-navy-900 text-white" : "bg-surface text-muted",
                )}
              >
                <Icon name="menu" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mb-6 overflow-hidden rounded-xl border border-border">
          <PlaceholderImage
            label={t("mapLabel")}
            sublabel={t("mapSoon")}
            accent="#1d3350"
            aspect="aspect-[16/6]"
          />
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-navy-300 bg-sand-100 p-10 text-center">
            <p className="font-semibold text-navy-900">{t("noResults")}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-3 text-sm font-semibold text-accent-600 hover:text-accent-700"
            >
              {t("reset")}
            </button>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {results.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <ul className="space-y-3">
            {results.map((p) => (
              <PropertyRow key={p.id} property={p} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** Compact list-view row used when the list toggle is active. */
function PropertyRow({ property }: { property: SampleProperty }) {
  const tp = useTranslations("properties");
  return (
    <li className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center">
      <div className="w-full sm:w-40 sm:shrink-0">
        <PlaceholderImage
          label={property.cityName}
          accent={property.accent}
          aspect="aspect-[3/2]"
          className="rounded-lg"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <SampleBadge>{tp("sampleLabel")}</SampleBadge>
          <span className="text-xs font-semibold text-navy-700">
            {tp(`status.${property.status}`)}
          </span>
        </div>
        <p className="mt-1 font-display text-lg font-bold text-navy-900">
          {formatUsd(property.price)}
        </p>
        <p className="text-sm text-navy-800">
          {property.address}, {property.cityName}, PA
        </p>
        <p className="mt-1 text-sm text-muted">
          {property.beds} {tp("bedsShort")} · {property.baths} {tp("bathsShort")} ·{" "}
          {property.sqft.toLocaleString("en-US")} {tp("sqftShort")}
        </p>
      </div>
    </li>
  );
}
