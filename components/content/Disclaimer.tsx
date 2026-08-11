/**
 * Small-print disclaimer box for educational / not-advice notices required on
 * investment, valuation and calculator content.
 */
export function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-md border border-border bg-sand-100 px-4 py-3 text-xs leading-relaxed text-muted">
      {children}
    </p>
  );
}
