import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { journeys } from "@/data/home-content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";

const ICONS: Record<string, IconName> = {
  buy: "buy",
  sell: "sell",
  invest: "invest",
  move: "move",
  "first-time": "first-time",
};

export function JourneyCards() {
  const t = useTranslations("home.journeys");

  return (
    <Section>
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {journeys.map((journey) => (
          <Link
            key={journey.key}
            href={journey.href}
            className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-md"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-accent-600 transition-colors group-hover:bg-accent-500 group-hover:text-white">
              <Icon name={ICONS[journey.icon]} className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
              {t(`items.${journey.key}.title`)}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {t(`items.${journey.key}.description`)}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-600">
              {t(`items.${journey.key}.cta`)}
              <Icon
                name="arrow-right"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
