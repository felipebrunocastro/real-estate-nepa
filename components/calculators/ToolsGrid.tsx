import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { tools } from "@/data/tools";
import { Icon } from "@/components/ui/Icon";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { cn } from "@/lib/utils";

/**
 * Grid of calculator tools. Available tools link out; upcoming tools render a
 * "coming soon" card. Data-driven from `data/tools.ts`.
 */
export function ToolsGrid({ exclude }: { exclude?: string }) {
  const t = useTranslations("calculators.tools");
  const list = tools.filter((tool) => tool.key !== exclude);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((tool) => {
        const inner = (
          <>
            <div className="flex items-start justify-between">
              <span
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-lg",
                  tool.available
                    ? "bg-navy-50 text-accent-600"
                    : "bg-sand-100 text-muted",
                )}
              >
                <Icon name={tool.icon} className="h-5 w-5" />
              </span>
              {!tool.available && <SampleBadge>{t("comingSoon")}</SampleBadge>}
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
              {t(`items.${tool.key}.name`)}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {t(`items.${tool.key}.description`)}
            </p>
            {tool.available && (
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-600">
                {t("open")}
                <Icon name="arrow-right" className="h-4 w-4" />
              </span>
            )}
          </>
        );

        return tool.available && tool.href ? (
          <Link
            key={tool.key}
            href={tool.href}
            className="flex flex-col rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-md"
          >
            {inner}
          </Link>
        ) : (
          <div
            key={tool.key}
            className="flex flex-col rounded-xl border border-dashed border-navy-300 bg-surface p-6"
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}
