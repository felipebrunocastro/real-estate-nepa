"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cities } from "@/data/cities";
import { Icon } from "@/components/ui/Icon";

/**
 * Client-side form values. The canonical lead model + validation live in
 * lib/leads.ts; this component only collects input and POSTs it to /api/leads.
 * No credentials are ever handled in the client.
 */
interface FormValues {
  category: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  area: string;
  message: string;
  contactPreference: "email" | "phone";
}

type Status = "idle" | "sending" | "success" | "error";

const CATEGORIES = ["buy", "sell", "invest", "relocate", "realtor", "general"] as const;

export function ContactForm() {
  const t = useTranslations("pages.contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  // Anti-spam honeypot — kept empty by real users; bots tend to fill it.
  const [company, setCompany] = useState("");
  const [values, setValues] = useState<FormValues>({
    category: "buy",
    name: "",
    email: "",
    phone: "",
    language: locale,
    area: "",
    message: "",
    contactPreference: "email",
  });

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, company, locale, source: "contact-page" }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const submitted = status === "success";

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

      {/* Honeypot — visually hidden and off the tab order; must stay empty. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="c-company">Company</label>
        <input
          id="c-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-md border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {t("error")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
        {status !== "sending" && <Icon name="arrow-right" className="h-5 w-5" />}
      </button>
      <p className="mt-4 text-xs text-muted">{t("privacy")}</p>
    </form>
  );
}
