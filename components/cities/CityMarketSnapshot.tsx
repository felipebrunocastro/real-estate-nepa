import { useTranslations } from "next-intl";
import type { CityStats } from "@/types";
import { SampleBadge } from "@/components/ui/SampleBadge";

/**
 * Per-city market snapshot. Renders SAMPLE demonstration figures with a clear
 * "Sample Data" label. Stat labels are shared with the homepage market module;
 * a future data integration will replace `stats` with verified values.
 */
export function CityMarketSnapshot({ stats }: { stats: CityStats }) {
  const tm = useTranslations("home.market");

  const cards: { key: keyof CityStats; label: string }[] = [
    { key: "medianPrice", label: tm("stats.medianPrice") },
    { key: "homesForSale", label: tm("stats.homesForSale") },
    { key: "daysOnMarket", label: tm("stats.daysOnMarket") },
    { key: "saleToList", label: tm("stats.saleToList") },
  ];

  return (
    <div>
      <div className="mb-4">
        <SampleBadge>{tm("sampleLabel")}</SampleBadge>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.key}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <p className="text-sm font-medium text-muted">{card.label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-navy-900">
              {stats[card.key]}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">{tm("disclaimer")}</p>
    </div>
  );
}
