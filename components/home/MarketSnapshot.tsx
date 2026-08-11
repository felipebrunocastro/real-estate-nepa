import { useTranslations } from "next-intl";
import { marketStats } from "@/data/home-content";
import { Section } from "@/components/ui/Section";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function MarketSnapshot() {
  const t = useTranslations("home.market");

  return (
    <Section className="bg-navy-900 text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-300">
            {t("eyebrow")}
          </p>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-navy-100">
            {t("intro")}
          </p>
        </div>
        <SampleBadge className="self-start border-amber-300/40 bg-amber-400/10 text-amber-200">
          {t("sampleLabel")}
        </SampleBadge>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {marketStats.map((stat) => (
          <div
            key={stat.key}
            className="rounded-xl border border-navy-700 bg-navy-800 p-6"
          >
            <p className="text-sm font-medium text-navy-200">
              {t(`stats.${stat.key}`)}
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-white">
              {stat.value}
            </p>
            {stat.changeLabel && (
              <p
                className={cn(
                  "mt-2 inline-flex items-center gap-1 text-sm font-semibold",
                  stat.trend === "up" && "text-emerald-300",
                  stat.trend === "down" && "text-rose-300",
                  stat.trend === "flat" && "text-navy-200",
                )}
              >
                {stat.trend === "up" && <Icon name="trend-up" className="h-4 w-4" />}
                {stat.trend === "down" && (
                  <Icon name="trend-down" className="h-4 w-4" />
                )}
                {stat.changeLabel}
                <span className="font-normal text-navy-300">{t("vsPrior")}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-navy-300">{t("disclaimer")}</p>
    </Section>
  );
}
