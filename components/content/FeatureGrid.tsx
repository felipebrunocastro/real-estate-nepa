import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface Feature {
  title: string;
  description: string;
  icon?: IconName;
}

/** Responsive grid of feature/topic cards with an optional icon. */
export function FeatureGrid({
  items,
  columns = 3,
}: {
  items: Feature[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
      )}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="flex flex-col rounded-xl border border-border bg-surface p-6"
        >
          {item.icon && (
            <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-accent-600">
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
          )}
          <h3 className="font-display text-lg font-semibold text-navy-900">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
