"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { cn } from "@/lib/utils";

/**
 * Market-trend charts with metric tabs and a time-range toggle. The interactive
 * shell is ready for real time-series (from an MLS/IDX feed or Zillow history);
 * until that is wired it shows a clearly-labeled structured placeholder rather
 * than fabricated trend lines.
 */
const METRICS = ["medianPrice", "homesSold", "daysOnMarket", "inventory", "pricePerSqft"] as const;
const RANGES = ["12m", "3y", "5y"] as const;

export function CityCharts({ cityName, accent }: { cityName: string; accent: string }) {
  const t = useTranslations("cityGuide.charts");
  const [metric, setMetric] = useState<(typeof METRICS)[number]>("medianPrice");
  const [range, setRange] = useState<(typeof RANGES)[number]>("12m");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t("metricLabel")}>
          {METRICS.map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={metric === m}
              onClick={() => setMetric(m)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                metric === m ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-700 hover:bg-navy-100",
              )}
            >
              {t(`metric.${m}`)}
            </button>
          ))}
        </div>
        <div className="inline-flex overflow-hidden rounded-md border border-border">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className={cn(
                "px-3 py-1.5 text-sm font-medium",
                range === r ? "bg-navy-900 text-white" : "bg-surface text-muted hover:bg-navy-50",
              )}
            >
              {t(`range.${r}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-border">
        <PlaceholderImage
          label={`${t(`metric.${metric}`)} — ${cityName}`}
          sublabel={t("comingSoonShort")}
          accent={accent}
          aspect="aspect-[16/7]"
        />
      </div>
      <p className="mt-3 text-xs text-muted">{t("comingSoon")}</p>
    </div>
  );
}
