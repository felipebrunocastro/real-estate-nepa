import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Temporary typographic wordmark for Real Estate in NEPA. Intentionally simple
 * — a real logo asset can replace this later without touching layout code.
 */
export function Logo({
  className,
  showRegion = true,
}: {
  className?: string;
  showRegion?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex flex-col leading-none", className)}
      aria-label="Real Estate in NEPA — home"
    >
      <span className="font-display text-lg font-bold tracking-tight text-navy-900 sm:text-xl">
        Real Estate in <span className="text-accent-600">NEPA</span>
      </span>
      {showRegion && (
        <span className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted">
          Northeastern Pennsylvania
        </span>
      )}
    </Link>
  );
}
