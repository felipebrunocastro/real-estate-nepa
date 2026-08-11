import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { insightCards } from "@/data/home-content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function MarketInsights() {
  const t = useTranslations("home.insights");

  return (
    <Section>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <Button href="/market-reports" variant="outline" className="shrink-0">
          {t("viewAll")}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {insightCards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-md"
          >
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-700">
              <Icon name="document" className="h-4 w-4" />
              {t(`categories.${card.category}`)}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-navy-900 group-hover:text-accent-700">
              {t(`items.${card.key}.title`)}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {t(`items.${card.key}.excerpt`)}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-600">
              {t("readMore")}
              <Icon
                name="arrow-right"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted">{t("editorialNotice")}</p>
    </Section>
  );
}
