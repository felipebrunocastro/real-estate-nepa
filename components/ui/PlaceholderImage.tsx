import { cn } from "@/lib/utils";

/**
 * Structured placeholder used wherever authentic NEPA photography is not yet
 * available. Rather than misrepresenting a location with generic stock imagery,
 * we render a labeled gradient tile. Swap for a real <Image> per city later.
 */
export function PlaceholderImage({
  label,
  sublabel,
  accent = "#274266",
  className,
  aspect = "aspect-[4/3]",
}: {
  label: string;
  sublabel?: string;
  accent?: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden text-white",
        aspect,
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, ${accent} 0%, #0e1a2b 100%)`,
      }}
      role="img"
      aria-label={sublabel ? `${label}, ${sublabel}` : label}
    >
      {/* Subtle skyline motif so tiles do not read as empty blocks. */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-15"
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 100V60l20-10v-15l14 8V38l22 12v-8l16 9V40l24 14v-9l18 10V44l22 12v-6l16 9V48l26 14v-7l18 10V50l20 11v-6l18 10V58l22 12v30Z"
          fill="#ffffff"
        />
      </svg>
      <div className="relative px-4 text-center">
        <p className="font-display text-lg font-semibold drop-shadow-sm">{label}</p>
        {sublabel && (
          <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-white/80">
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
}
