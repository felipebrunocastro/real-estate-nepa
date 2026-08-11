"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Newsletter sign-up. Posts to /api/newsletter, which validates and routes to
 * the configured destination (see lib/newsletter.ts). No provider credentials
 * are ever handled in the client.
 */
export function Newsletter() {
  const t = useTranslations("home.newsletter");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState(locale);
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, language, company, source: "homepage" }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-accent-800 text-white">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-accent-100">
            {t("description")}
          </p>

          {status === "success" ? (
            <p
              role="status"
              className="mx-auto mt-8 inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold"
            >
              <Icon name="check" className="h-5 w-5 text-emerald-300" />
              {t("success")}
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">
                  {t("emailLabel")}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="w-full rounded-md border border-transparent bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="text-left">
                <label htmlFor="newsletter-lang" className="sr-only">
                  {t("languageLabel")}
                </label>
                <select
                  id="newsletter-lang"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-md border border-transparent bg-white px-4 py-3 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-white sm:w-auto"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="pt">Português</option>
                </select>
              </div>
              {/* Honeypot — hidden from users; must stay empty. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
              >
                {status === "sending" ? t("sending") : t("cta")}
              </button>
            </form>
          )}

          {status === "error" && (
            <p role="alert" className="mx-auto mt-4 max-w-xl rounded-md bg-rose-500/20 px-4 py-2 text-sm text-white">
              {t("error")}
            </p>
          )}

          <p className="mt-4 text-xs text-accent-200">{t("privacyNote")}</p>
        </div>
      </Container>
    </section>
  );
}
