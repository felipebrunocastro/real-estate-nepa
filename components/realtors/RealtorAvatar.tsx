import { cn } from "@/lib/utils";

/**
 * Initials avatar. We do not use stock or fabricated photos for sample
 * profiles; a colored monogram stands in until a real professional uploads one.
 */
export function RealtorAvatar({
  name,
  accent,
  size = "md",
  className,
}: {
  name: string;
  accent: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-display font-bold text-white",
        size === "lg" ? "h-20 w-20 text-2xl" : "h-14 w-14 text-lg",
        className,
      )}
      style={{ backgroundColor: accent }}
    >
      {initials}
    </span>
  );
}
