/**
 * Tiny classname joiner (keeps the dependency footprint minimal — no clsx).
 * Falsy values are ignored so conditional classes read cleanly.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a whole-dollar amount as USD without cents. */
export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
