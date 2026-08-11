"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { RealtorCardData, RealtorSpecialty } from "@/types";
import { RealtorCard } from "./RealtorCard";

/**
 * Client-side filterable realtor directory. Filters by city, language and
 * specialty — options are derived from the profiles present. Featured profiles
 * arrive already sorted first (monetization architecture; no payments).
 */
export function RealtorDirectory({ realtors }: { realtors: RealtorCardData[] }) {
  const t = useTranslations("realtors");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("");
  const [specialty, setSpecialty] = useState("");

  const cities = useMemo(
    () =>
      Array.from(
        new Map(
          realtors.flatMap((r) =>
            r.serviceAreas.map((slug, i) => [slug, r.serviceAreaNames[i]]),
          ),
        ),
      ).sort((a, b) => a[1].localeCompare(b[1])),
    [realtors],
  );
  const languages = useMemo(
    () => Array.from(new Set(realtors.flatMap((r) => r.languages))),
    [realtors],
  );
  const specialties = useMemo(
    () => Array.from(new Set(realtors.flatMap((r) => r.specialties))),
    [realtors],
  );

  const filtered = useMemo(
    () =>
      realtors.filter((r) => {
        if (city && !r.serviceAreas.includes(city)) return false;
        if (language && !r.languages.includes(language)) return false;
        if (specialty && !r.specialties.includes(specialty as RealtorSpecialty))
          return false;
        return true;
      }),
    [realtors, city, language, specialty],
  );

  const selectClass =
    "rounded-md border border-border bg-surface px-3 py-2 text-sm text-navy-900 focus:border-accent-500 focus:outline-none";
  const labelClass =
    "mb-1 block text-xs font-semibold uppercase tracking-wide text-muted";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div>
          <label className={labelClass} htmlFor="rf-city">
            {t("filterCity")}
          </label>
          <select id="rf-city" className={selectClass} value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">{t("allCities")}</option>
            {cities.map(([slug, name]) => (
              <option key={slug} value={slug}>
                {name}, PA
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="rf-language">
            {t("filterLanguage")}
          </label>
          <select id="rf-language" className={selectClass} value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="">{t("allLanguages")}</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {t(`languages.${l}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="rf-specialty">
            {t("filterSpecialty")}
          </label>
          <select id="rf-specialty" className={selectClass} value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            <option value="">{t("allSpecialties")}</option>
            {specialties.map((s) => (
              <option key={s} value={s}>
                {t(`specialties.${s}`)}
              </option>
            ))}
          </select>
        </div>
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
              setCity("");
              setLanguage("");
              setSpecialty("");
            }}
            className="mt-3 text-sm font-semibold text-accent-600 hover:text-accent-700"
          >
            {t("clearFilters")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RealtorCard key={r.slug} realtor={r} />
          ))}
        </div>
      )}
    </div>
  );
}
