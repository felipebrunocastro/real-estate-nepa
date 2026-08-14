"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { MarketHistory, ChartMetricKey } from "@/types";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { cn } from "@/lib/utils";

/**
 * Real market-trend charts drawn from Zillow Research monthly history
 * (data/market-history.ts). Metric tabs show only the metrics we actually have
 * data for; the 12mo / 3yr / 5yr toggle slices the series. Metrics that fall
 * back to the regional (metro) series are labeled as such. Pure inline SVG —
 * no charting dependency — and responsive.
 */
const RANGES = { "12m": 12, "3y": 36, "5y": 60 } as const;
type Range = keyof typeof RANGES;

const fmt = (key: ChartMetricKey, v: number) =>
  key === "medianPrice" ? `$${v.toLocaleString("en-US")}` : v.toLocaleString("en-US");

export function CityCharts({
  history,
  regionalMetrics,
  source,
  asOf,
  cityName,
  accent,
}: {
  history: MarketHistory;
  regionalMetrics: ChartMetricKey[];
  source: string;
  asOf: string;
  cityName: string;
  accent: string;
}) {
  const t = useTranslations("cityGuide.charts");
  const locale = useLocale();

  const available = (["medianPrice", "homesSold", "daysOnMarket", "inventory"] as ChartMetricKey[]).filter(
    (k) => history[k] && history[k]!.length >= 2,
  );
  const [metric, setMetric] = useState<ChartMetricKey>(available[0] ?? "medianPrice");
  const [range, setRange] = useState<Range>("12m");

  const monthLabel = (d: string) =>
    new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" }).format(
      new Date(`${d}-01T00:00:00Z`),
    );

  const series = useMemo(() => (history[metric] ?? []).slice(-RANGES[range]), [history, metric, range]);

  if (available.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-border">
        <PlaceholderImage label={cityName} sublabel={t("comingSoonShort")} accent={accent} aspect="aspect-[16/7]" />
      </div>
    );
  }

  const values = series.map((p) => p.v);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const W = 100;
  const H = 42;
  const pad = 3;
  const coords = series.map((p, i) => ({
    x: series.length === 1 ? W / 2 : (i / (series.length - 1)) * (W - pad * 2) + pad,
    y: H - pad - ((p.v - min) / span) * (H - pad * 2),
  }));
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(2)} ${c.y.toFixed(2)}`).join(" ");
  const last = series[series.length - 1];
  const first = series[0];
  const delta = last && first ? last.v - first.v : 0;
  const deltaPct = first?.v ? (delta / first.v) * 100 : 0;
  const isRegional = regionalMetrics.includes(metric);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t("metricLabel")}>
          {available.map((m) => (
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
          {(Object.keys(RANGES) as Range[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              disabled={(history[metric]?.length ?? 0) < 3 && r !== "12m"}
              className={cn(
                "px-3 py-1.5 text-sm font-medium disabled:opacity-40",
                range === r ? "bg-navy-900 text-white" : "bg-surface text-muted hover:bg-navy-50",
              )}
            >
              {t(`range.${r}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-surface p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-display text-3xl font-bold text-navy-900">
              {last ? fmt(metric, last.v) : "—"}
            </p>
            {last && <p className="mt-0.5 text-xs text-muted">{t("current", { date: monthLabel(last.d) })}</p>}
          </div>
          <div className="text-right">
            {last && first && (
              <>
                <p
                  className={cn(
                    "font-display text-2xl font-bold",
                    delta > 0 ? "text-emerald-600" : delta < 0 ? "text-rose-600" : "text-muted",
                  )}
                >
                  {delta > 0 ? "+" : ""}
                  {metric === "medianPrice" ? `${deltaPct.toFixed(1)}%` : delta.toLocaleString("en-US")}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {t("sinceStart", { date: monthLabel(first.d) })} · {fmt(metric, first.v)}
                </p>
              </>
            )}
            {isRegional && (
              <span className="mt-1.5 inline-block rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-700">
                {t("regional")}
              </span>
            )}
          </div>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="mt-4 h-44 w-full"
          role="img"
          aria-label={`${t(`metric.${metric}`)} — ${cityName}`}
        >
          <path
            d={`${line} L ${coords[coords.length - 1].x.toFixed(2)} ${H} L ${coords[0].x.toFixed(2)} ${H} Z`}
            fill={accent}
            opacity="0.08"
          />
          <path d={line} fill="none" stroke={accent} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
          {coords.length > 0 && (
            <circle cx={coords[coords.length - 1].x} cy={coords[coords.length - 1].y} r="1" fill={accent} />
          )}
        </svg>

        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span>{first ? monthLabel(first.d) : ""}</span>
          <span>{last ? monthLabel(last.d) : ""}</span>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted">
        {t("source", { source })} · {t("through", { date: monthLabel(asOf) })}
      </p>
    </div>
  );
}
