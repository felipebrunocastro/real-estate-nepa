"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { ArticleCardData, ArticleCategory } from "@/types";
import { ArticleCard } from "./ArticleCard";

/**
 * Client-side filterable article grid. Supports filtering by category and by
 * city — the filter options are derived from the articles actually present, so
 * the controls stay in sync with the content.
 */
export function ArticleFilterList({ articles }: { articles: ArticleCardData[] }) {
  const t = useTranslations("publication");
  const [category, setCategory] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))),
    [articles],
  );
  const cities = useMemo(
    () =>
      Array.from(
        new Map(
          articles
            .filter((a) => a.city && a.cityName)
            .map((a) => [a.city as string, a.cityName as string]),
        ),
      ),
    [articles],
  );

  const filtered = useMemo(
    () =>
      articles.filter((a) => {
        if (category && a.category !== category) return false;
        if (city && a.city !== city) return false;
        return true;
      }),
    [articles, category, city],
  );

  const selectClass =
    "rounded-md border border-border bg-surface px-3 py-2 text-sm text-navy-900 focus:border-accent-500 focus:outline-none";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted" htmlFor="filter-category">
            {t("filterCategory")}
          </label>
          <select
            id="filter-category"
            className={selectClass}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">{t("allCategories")}</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {t(`categories.${c as ArticleCategory}`)}
              </option>
            ))}
          </select>
        </div>

        {cities.length > 0 && (
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted" htmlFor="filter-city">
              {t("filterCity")}
            </label>
            <select
              id="filter-city"
              className={selectClass}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">{t("allCities")}</option>
              {cities.map(([slug, name]) => (
                <option key={slug} value={slug}>
                  {name}, PA
                </option>
              ))}
            </select>
          </div>
        )}

        <p className="ml-auto text-sm text-muted">
          {t("resultCount", { count: filtered.length })}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-navy-300 bg-sand-100 p-10 text-center">
          <p className="font-semibold text-navy-900">{t("noResults")}</p>
          <button
            type="button"
            onClick={() => {
              setCategory("");
              setCity("");
            }}
            className="mt-3 text-sm font-semibold text-accent-600 hover:text-accent-700"
          >
            {t("clearFilters")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
