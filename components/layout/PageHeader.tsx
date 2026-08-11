import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { cn } from "@/lib/utils";

/**
 * Standard page header used across all core pages: breadcrumb trail, optional
 * eyebrow, a strong H1, an intro paragraph and optional actions (CTAs). Keeps
 * every top-level page visually consistent with the Phase 1 design system.
 */
export function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  intro,
  children,
  variant = "light",
}: {
  breadcrumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <div
      className={cn(
        "border-b",
        dark ? "border-navy-800 bg-navy-900 text-white" : "border-border bg-sand-100",
      )}
    >
      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 max-w-3xl">
          {eyebrow && (
            <p
              className={cn(
                "mb-3 text-sm font-semibold uppercase tracking-widest",
                dark ? "text-accent-300" : "text-accent-600",
              )}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "font-display text-4xl font-bold tracking-tight sm:text-5xl",
              dark ? "text-white" : "text-navy-900",
            )}
          >
            {title}
          </h1>
          {intro && (
            <p
              className={cn(
                "mt-5 text-lg leading-relaxed",
                dark ? "text-navy-100" : "text-muted",
              )}
            >
              {intro}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
