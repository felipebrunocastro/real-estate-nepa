import type { ChartPoint } from "@/types";

/**
 * Dependency-free responsive SVG bar chart. The SVG is decorative
 * (aria-hidden); an equivalent data table is provided for screen readers.
 * Renders demonstration data only — always labeled as sample by the caller.
 */
export function BarChart({
  title,
  data,
  unit = "",
  caption,
}: {
  title: string;
  data: ChartPoint[];
  unit?: string;
  caption?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const width = 100;
  const gap = 4;
  const barW = (width - gap * (data.length - 1)) / data.length;
  const fmt = (v: number) =>
    unit === "$" ? `$${v.toLocaleString("en-US")}` : v.toLocaleString("en-US");

  return (
    <figure className="rounded-xl border border-border bg-surface p-5">
      <figcaption className="mb-4 font-semibold text-navy-900">{title}</figcaption>
      <div className="flex items-end gap-2" aria-hidden="true">
        <svg
          viewBox={`0 0 ${width} 60`}
          preserveAspectRatio="none"
          className="h-40 w-full"
          role="presentation"
        >
          {data.map((d, i) => {
            const h = (d.value / max) * 50;
            const x = i * (barW + gap);
            return (
              <rect
                key={d.label}
                x={x}
                y={55 - h}
                width={barW}
                height={h}
                rx={0.8}
                fill="var(--color-accent-500)"
              />
            );
          })}
        </svg>
      </div>
      <div className="mt-2 grid" style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }} aria-hidden="true">
        {data.map((d) => (
          <div key={d.label} className="text-center">
            <p className="text-sm font-semibold text-navy-900">{fmt(d.value)}</p>
            <p className="truncate text-xs text-muted">{d.label}</p>
          </div>
        ))}
      </div>

      {/* Accessible equivalent */}
      <table className="sr-only">
        <caption>{caption ?? title}</caption>
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}>
              <th scope="row">{d.label}</th>
              <td>{fmt(d.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
