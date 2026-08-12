import { useLocale, useTranslations } from "next-intl";
import { getMarketArea, formatMarketValue, MARKET_METRIC_KEYS } from "@/lib/market";
import { SampleBadge } from "@/components/ui/SampleBadge";

/**
 * Per-city market snapshot. Reads through the market-data layer, falling back
 * to the regional dataset (clearly labeled "Regional estimate") when a city has
 * no data of its own. Shows a "Sample Data" badge until a real source is set.
 */
export function CityMarketSnapshot({ area }: { area: string }) {
  const tm = useTranslations("home.market");
  const locale = useLocale();
  const { data, isFallback } = getMarketArea(area);

  const asOf = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(data.asOf));

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {data.isSample ? (
          <SampleBadge>{tm("sampleLabel")}</SampleBadge>
        ) : (
          <span className="text-xs text-muted">
            {tm("sourceLabel", { source: data.source })} · {tm("asOf", { date: asOf })}
          </span>
        )}
        {isFallback && (
          <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-700">
            {tm("regionalEstimate")}
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {MARKET_METRIC_KEYS.map((key) => {
          const metric = data.metrics[key];
          if (!metric) return null;
          return (
            <div key={key} className="rounded-xl border border-border bg-surface p-5">
              <p className="text-sm font-medium text-muted">{tm(`stats.${key}`)}</p>
              <p className="mt-2 font-display text-2xl font-bold text-navy-900">
                {formatMarketValue(key, metric.value)}
              </p>
            </div>
          );
        })}
      </div>
      {data.isSample && (
        <p className="mt-4 text-xs text-muted">{tm("disclaimer")}</p>
      )}
    </div>
  );
}
