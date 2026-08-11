import { cn } from "@/lib/utils";

/**
 * Visible label used anywhere demo / placeholder data is shown, to satisfy the
 * project's rule that sample listings and market data are never presented as
 * real. Pass the translated label text via `children`.
 */
export function SampleBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-800",
        className,
      )}
    >
      <span aria-hidden="true">●</span>
      {children}
    </span>
  );
}
