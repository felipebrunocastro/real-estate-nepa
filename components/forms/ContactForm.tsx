"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cities } from "@/data/cities";
import { Icon } from "@/components/ui/Icon";

/**
 * Lead capture shape — the single, stable interface a future CRM integration
 * (Supabase / HubSpot / GoHighLevel / email routing) will consume. Deliberately
 * avoids sensitive fields.
 */
export interface LeadPayload {
  category: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  area: string;
  message: string;
  contactPreference: "email" | "phone";
}

/** Frontend-only submit seam. No credentials live in the client. */
async function submitLead(payload: LeadPayload): Promise<void> {
  // TODO(Phase 8): POST to /api/leads -> CRM / email routing.
  void payload;
  return Promise.resolve();
}

const CATEGORIES = ["buy", "sell", "invest", "relocate", "realtor", "general"] as const;

export function ContactForm() {
  const t = useTranslations("pages.contact.form");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<LeadPayload>({
    category: "buy",
    name: "",
    email: "",
    phone: "",
    language: locale,
    area: "",
    message: "",
    contactPreference: "email",
  });

  function set<K extends keyof LeadPayload>(key: K, value: LeadPayload[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitLead(values);
    setSubmitted(true);
  }

  const fieldClass =
    "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-navy-900 focus:border-accent-500 focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-semibold text-navy-800";

  if (submitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-8"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-600 text-white">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <h2 className="font-display text-xl font-semibold text-navy-900">
          {t("successTitle")}
        </h2>
        <p className="text-navy-700">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-border bg-surface p-6 sm:p-8"
    >
      <fieldset className="mb-6">
        <legend className={labelClass}>{t("categoryLabel")}</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <label
              key={c}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                values.category === c
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-border bg-surface text-navy-800 hover:bg-navy-50"
              }`}
            >
              <input
                type="radio"
                name="category"
                value={c}
                checked={values.category === c}
                onChange={() => set("category", c)}
                className="sr-only"
              />
              {t(`categories.${c}`)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="c-name">
            {t("name")}
          </label>
          <input
            id="c-name"
            type="text"
            required
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="c-email">
            {t("email")}
          </label>
          <input
            id="c-email"
            type="email"
            required
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="c-phone">
            {t("phone")} <span className="font-normal text-muted">{t("optional")}</span>
          </label>
          <input
            id="c-phone"
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="c-area">
            {t("area")}
          </label>
          <select
            id="c-area"
            value={values.area}
            onChange={(e) => set("area", e.target.value)}
            className={fieldClass}
          >
            <option value="">{t("areaAny")}</option>
            {cities.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.name}, PA
              </option>
            ))}
            <option value="other">{t("areaOther")}</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="c-language">
            {t("language")}
          </label>
          <select
            id="c-language"
            value={values.language}
            onChange={(e) => set("language", e.target.value)}
            className={fieldClass}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="pt">Português</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="c-pref">
            {t("preference")}
          </label>
          <select
            id="c-pref"
            value={values.contactPreference}
            onChange={(e) =>
              set("contactPreference", e.target.value as "email" | "phone")
            }
            className={fieldClass}
          >
            <option value="email">{t("prefEmail")}</option>
            <option value="phone">{t("prefPhone")}</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="c-message">
          {t("message")}
        </label>
        <textarea
          id="c-message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
      >
        {t("submit")}
        <Icon name="arrow-right" className="h-5 w-5" />
      </button>
      <p className="mt-4 text-xs text-muted">{t("privacy")}</p>
    </form>
  );
}
