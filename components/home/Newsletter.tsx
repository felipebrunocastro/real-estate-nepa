"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

type Status = "idle" | "success";

/**
 * Newsletter sign-up. Frontend-only for now: it validates input and shows a
 * confirmation. `submitSubscription` is the single, clearly-defined seam where
 * a future provider (Resend, Mailchimp, etc.) will be wired in — no provider
 * credentials live in the client.
 */
async function submitSubscription(payload: {
  email: string;
  language: string;
}): Promise<void> {
  // TODO(Phase 8): POST to /api/newsletter -> email provider (Resend, etc.).
  void payload;
  return Promise.resolve();
}

export function Newsletter() {
  const t = useTranslations("home.newsletter");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState(locale);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitSubscription({ email, language });
    setStatus("success");
    setEmail("");
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
              <button
                type="submit"
                className="rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
              >
                {t("cta")}
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-accent-200">{t("privacyNote")}</p>
        </div>
      </Container>
    </section>
  );
}
