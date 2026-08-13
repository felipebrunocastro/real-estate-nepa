import { useLocale, useTranslations } from "next-intl";
import type { City } from "@/types";
import type { Locale } from "@/i18n/routing";
import { getMarketArea, formatMarketValue } from "@/lib/market";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * "[City] at a Glance" — quick, scannable facts. Median home price comes from
 * the market-data layer (real where available). Facts we can't verify (median
 * rent) render a clear "coming soon" placeholder rather than an invented value.
 */
export function CityOverview({ city }: { city: City }) {
  const t = useTranslations("cityGuide.overview");
  const locale = useLocale() as Locale;
  const { data } = getMarketArea(city.slug);
  const price = data.metrics.medianPrice;

  const soon = t("comingSoon");
  const cards: { icon: IconName; label: string; value: string; note?: string }[] = [
    { icon: "map-pin", label: t("county"), value: city.county },
    {
      icon: "buy",
      label: t("population"),
      value: city.population ? city.population.toLocaleString(locale) : soon,
      note: city.population && city.populationYear ? t("populationNote", { year: city.populationYear }) : undefined,
    },
    {
      icon: "trend-up",
      label: t("medianPrice"),
      value: price ? formatMarketValue("medianPrice", price.value) : soon,
      note: price ? (data.isSample ? t("sample") : data.source) : undefined,
    },
    { icon: "document", label: t("medianRent"), value: soon },
    {
      icon: "calculator",
      label: t("housingTypes"),
      value: city.housingTypes?.length
        ? city.housingTypes.map((h) => t(`housing.${h}`)).join(" · ")
        : soon,
    },
    {
      icon: "move",
      label: t("commute"),
      value: city.distances?.length
        ? city.distances.slice(0, 2).map((d) => `${d.to} ${t("miles", { miles: d.miles })}`).join(" · ")
        : soon,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-muted">
            <Icon name={c.icon} className="h-5 w-5 text-accent-600" />
            <span className="text-xs font-semibold uppercase tracking-wide">{c.label}</span>
          </div>
          <p className="mt-2 font-display text-lg font-semibold text-navy-900">{c.value}</p>
          {c.note && <p className="mt-0.5 text-xs text-muted">{c.note}</p>}
        </div>
      ))}
    </div>
  );
}
