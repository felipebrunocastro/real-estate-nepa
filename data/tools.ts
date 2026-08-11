import type { IconName } from "@/components/ui/Icon";

/**
 * Calculator/tool registry. Adding a tool here surfaces it in the tools grid.
 * `available: false` renders a "coming soon" card; set a `href` and flip the
 * flag when the tool ships in a later phase — no other wiring needed.
 */
export interface Tool {
  /** Translation key under `calculators.tools.items`. */
  key: string;
  href?: string;
  icon: IconName;
  available: boolean;
}

export const tools: Tool[] = [
  { key: "mortgage", href: "/mortgage-calculator", icon: "calculator", available: true },
  { key: "affordability", icon: "buy", available: false },
  { key: "closingCost", icon: "document", available: false },
  { key: "investment", icon: "invest", available: false },
  { key: "capRate", icon: "trend-up", available: false },
  { key: "rentalCashFlow", icon: "trend-up", available: false },
  { key: "netProceeds", icon: "sell", available: false },
];
