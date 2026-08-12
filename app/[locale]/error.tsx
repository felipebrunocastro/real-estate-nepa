"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Locale-segment error boundary. Renders inside the layout (header/footer +
 * i18n provider), so it stays branded and translated, and offers a retry.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("error");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="font-display text-3xl font-semibold text-navy-900">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-md text-muted">{t("description")}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-md bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          {t("retry")}
        </button>
        <Button href="/" variant="outline">
          {t("home")}
        </Button>
      </div>
    </Container>
  );
}
