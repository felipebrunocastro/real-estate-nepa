import { cn } from "@/lib/utils";
import { Container } from "./Container";

/** A vertical page section with consistent spacing and optional heading. */
export function Section({
  children,
  className,
  containerClassName,
  as: Tag = "section",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: React.ElementType;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("py-16 sm:py-20", className)}>
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}

/** Standard section heading: small eyebrow + serif title + optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-600">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
