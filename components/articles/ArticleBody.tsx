import { useLocale } from "next-intl";
import type { ContentBlock } from "@/types";
import type { Locale } from "@/i18n/routing";
import { BarChart } from "@/components/market/BarChart";
import { LineChart } from "@/components/market/LineChart";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/** Renders portable content blocks into styled, accessible article markup. */
export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  const locale = useLocale() as Locale;

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} className="font-display text-2xl font-semibold text-navy-900">
                {block.text[locale]}
              </h2>
            );
          case "paragraph":
            return (
              <p key={i} className="text-lg leading-relaxed text-navy-800">
                {block.text[locale]}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-navy-800">
                    <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-accent-600" />
                    {item[locale]}
                  </li>
                ))}
              </ul>
            );
          case "note":
            return (
              <p
                key={i}
                className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
              >
                {block.text[locale]}
              </p>
            );
          case "stats":
            return (
              <div key={i} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {block.items.map((stat, j) => (
                  <div key={j} className="rounded-xl border border-border bg-surface p-5">
                    <p className="text-sm font-medium text-muted">{stat.label[locale]}</p>
                    <p className="mt-2 font-display text-2xl font-bold text-navy-900">
                      {stat.value}
                    </p>
                    {stat.change && (
                      <p
                        className={cn(
                          "mt-1 inline-flex items-center gap-1 text-sm font-semibold",
                          stat.trend === "up" && "text-emerald-600",
                          stat.trend === "down" && "text-rose-600",
                          stat.trend === "flat" && "text-muted",
                        )}
                      >
                        {stat.trend === "up" && <Icon name="trend-up" className="h-4 w-4" />}
                        {stat.trend === "down" && <Icon name="trend-down" className="h-4 w-4" />}
                        {stat.change}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            );
          case "barChart":
            return (
              <BarChart
                key={i}
                title={block.title[locale]}
                unit={block.unit}
                data={block.data}
              />
            );
          case "lineChart":
            return (
              <LineChart
                key={i}
                title={block.title[locale]}
                unit={block.unit}
                data={block.data}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
