"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { cities } from "@/data/cities";
import { Icon } from "@/components/ui/Icon";

/**
 * Homepage property search interface. Until an IDX/MLS provider is integrated,
 * submitting forwards the chosen filters as query params to the (clearly
 * labeled) /property-search placeholder experience. It never returns invented
 * listings.
 */
export function PropertySearchBar() {
  const t = useTranslations("search");
  const router = useRouter();
  const [values, setValues] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    beds: "",
    type: "",
  });

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(values).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const qs = params.toString();
    router.push(`/property-search${qs ? `?${qs}` : ""}`);
  }

  const fieldClass =
    "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-navy-900 focus:border-accent-500 focus:outline-none";
  const labelClass =
    "mb-1 block text-xs font-semibold uppercase tracking-wide text-muted";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-border bg-surface/95 p-4 shadow-lg backdrop-blur sm:p-5"
      aria-label={t("formLabel")}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <label className={labelClass} htmlFor="search-location">
            {t("location")}
          </label>
          <select
            id="search-location"
            className={fieldClass}
            value={values.location}
            onChange={(e) => update("location", e.target.value)}
          >
            <option value="">{t("anyLocation")}</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}, PA
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="search-min">
            {t("minPrice")}
          </label>
          <select
            id="search-min"
            className={fieldClass}
            value={values.minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
          >
            <option value="">{t("noMin")}</option>
            {["100000", "150000", "200000", "300000", "400000"].map((p) => (
              <option key={p} value={p}>
                ${Number(p).toLocaleString("en-US")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="search-max">
            {t("maxPrice")}
          </label>
          <select
            id="search-max"
            className={fieldClass}
            value={values.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
          >
            <option value="">{t("noMax")}</option>
            {["200000", "300000", "400000", "500000", "750000"].map((p) => (
              <option key={p} value={p}>
                ${Number(p).toLocaleString("en-US")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="search-beds">
            {t("beds")}
          </label>
          <select
            id="search-beds"
            className={fieldClass}
            value={values.beds}
            onChange={(e) => update("beds", e.target.value)}
          >
            <option value="">{t("any")}</option>
            {["1", "2", "3", "4", "5"].map((b) => (
              <option key={b} value={b}>
                {b}+
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="search-type">
            {t("propertyType")}
          </label>
          <select
            id="search-type"
            className={fieldClass}
            value={values.type}
            onChange={(e) => update("type", e.target.value)}
          >
            <option value="">{t("anyType")}</option>
            <option value="single-family">{t("types.singleFamily")}</option>
            <option value="multi-family">{t("types.multiFamily")}</option>
            <option value="condo">{t("types.condo")}</option>
            <option value="townhouse">{t("types.townhouse")}</option>
            <option value="land">{t("types.land")}</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 sm:w-auto"
      >
        <Icon name="search" className="h-5 w-5" />
        {t("searchHomes")}
      </button>
    </form>
  );
}
