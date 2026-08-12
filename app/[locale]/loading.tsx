/**
 * Route-level loading UI shown during navigation to server-rendered segments.
 * The spin animation is neutralized under prefers-reduced-motion via globals.css.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Loading">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-navy-200 border-t-accent-500" />
    </div>
  );
}
