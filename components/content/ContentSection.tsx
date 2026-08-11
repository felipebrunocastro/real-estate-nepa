import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * A titled content section with an anchor id (for in-page links). Provides the
 * consistent vertical rhythm and heading treatment used across core pages.
 */
export function ContentSection({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  bordered = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-12 sm:py-16",
        bordered && "border-t border-border",
        className,
      )}
    >
      <Container>
        {(eyebrow || title || intro) && (
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-600">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
          </div>
        )}
        <div className={cn((eyebrow || title || intro) && "mt-8")}>{children}</div>
      </Container>
    </section>
  );
}
