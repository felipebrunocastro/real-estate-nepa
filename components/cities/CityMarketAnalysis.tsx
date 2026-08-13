import { useTranslations } from "next-intl";
import { getMarketArea } from "@/lib/market";
import { Icon } from "@/components/ui/Icon";

/**
 * "What the market means" — plain-language guidance for buyers, sellers and
 * investors. The Buyer's / Balanced / Seller's indicator is shown ONLY when a
 * real (non-sample) sale-to-list figure is available, using a simple, stated
 * heuristic — never invented for sample data.
 */
function marketBalance(saleToList?: number): "buyers" | "balanced" | "sellers" | null {
  if (saleToList == null) return null;
  if (saleToList >= 100) return "sellers";
  if (saleToList >= 98) return "balanced";
  return "buyers";
}

export function CityMarketAnalysis({ city }: { city: string }) {
  const t = useTranslations("cityGuide.market");
  const { data } = getMarketArea(city);
  const balance = data.isSample ? null : marketBalance(data.metrics.saleToList?.value);

  const groups = [
    { key: "buyers", icon: "buy" as const },
    { key: "sellers", icon: "sell" as const },
    { key: "investors", icon: "invest" as const },
  ];

  return (
    <div>
      {balance && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-600 px-4 py-1.5 text-sm font-semibold text-white">
          <Icon name="trend-up" className="h-4 w-4" />
          {t(`balance.${balance}`)}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.key} className="rounded-xl border border-border bg-surface p-6">
            <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-accent-600">
              <Icon name={g.icon} className="h-5 w-5" />
            </span>
            <h3 className="font-display text-lg font-semibold text-navy-900">
              {t(`${g.key}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t(`${g.key}.body`)}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 rounded-md border border-border bg-sand-100 px-4 py-3 text-xs leading-relaxed text-muted">
        {t("analysisDisclaimer")}
      </p>
    </div>
  );
}
