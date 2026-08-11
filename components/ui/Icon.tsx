import { cn } from "@/lib/utils";

/**
 * Minimal inline SVG icon set (no icon-library dependency). All icons inherit
 * `currentColor` and are decorative by default (aria-hidden). Stroke-based,
 * 24x24 viewBox, consistent 1.75 stroke width.
 */
export type IconName =
  | "buy"
  | "sell"
  | "invest"
  | "move"
  | "first-time"
  | "search"
  | "bed"
  | "bath"
  | "area"
  | "map-pin"
  | "arrow-right"
  | "menu"
  | "close"
  | "chevron-down"
  | "trend-up"
  | "trend-down"
  | "document"
  | "calculator"
  | "check";

const paths: Record<IconName, React.ReactNode> = {
  buy: <path d="M3 11.5 12 4l9 7.5M5 10v10h14V10M9 20v-6h6v6" />,
  sell: (
    <>
      <path d="M3 11.5 12 4l9 7.5M5 10v10h14V10" />
      <path d="M12 8v6m0 0-2.5-2.5M12 14l2.5-2.5" />
    </>
  ),
  invest: <path d="M4 19h16M6 19v-6m5 6V8m5 11v-9M4 9l6-4 5 3 5-4" />,
  move: (
    <>
      <path d="M3 13 12 4l9 9M6 11v9h4v-5h4v5h4v-9" />
      <path d="M14 15h5m0 0-2-2m2 2-2 2" />
    </>
  ),
  "first-time": (
    <>
      <path d="M3 11.5 12 4l9 7.5M5 10v10h14V10" />
      <circle cx="12" cy="14" r="2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  bed: <path d="M3 18v-5h18v5M3 13V7h10v6M13 10h6a2 2 0 0 1 2 2M3 18v2m18-2v2" />,
  bath: (
    <>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
      <path d="M6 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2M6 19l-1 2m14-2 1 2" />
    </>
  ),
  area: <path d="M4 4h16v16H4zM4 9h16M9 4v16" />,
  "map-pin": (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  "arrow-right": <path d="M5 12h14m0 0-6-6m6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "trend-up": <path d="M4 17 10 11l4 4 6-7m0 0h-5m5 0v5" />,
  "trend-down": <path d="M4 7 10 13l4-4 6 7m0 0h-5m5 0v-5" />,
  document: <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h6" />,
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v2M8 19h4" />
    </>
  ),
  check: <path d="M5 12.5 10 17l9-10" />,
};

export function Icon({
  name,
  className,
  title,
}: {
  name: IconName;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  );
}
