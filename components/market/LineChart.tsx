import type { ChartPoint } from "@/types";

/**
 * Dependency-free responsive SVG line chart. The SVG is decorative
 * (aria-hidden); an equivalent data table is provided for screen readers.
 * Renders demonstration data only — always labeled as sample by the caller.
 */
export function LineChart({
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
  const values = data.map((d) => d.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const width = 100;
  const height = 50;
  const pad = 4;

  const coords = data.map((d, i) => {
    const x = data.length === 1 ? width / 2 : (i / (data.length - 1)) * (width - pad * 2) + pad;
    const y = height - pad - ((d.value - min) / range) * (height - pad * 2);
    return { x, y };
  });

  const path = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(2)} ${c.y.toFixed(2)}`)
    .join(" ");

  const fmt = (v: number) =>
    unit === "$" ? `$${v.toLocaleString("en-US")}` : v.toLocaleString("en-US");

  return (
    <figure className="rounded-xl border border-border bg-surface p-5">
      <figcaption className="mb-4 font-semibold text-navy-900">{title}</figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-40 w-full"
        aria-hidden="true"
        role="presentation"
      >
        <path
          d={`${path} L ${coords[coords.length - 1].x.toFixed(2)} ${height} L ${coords[0].x.toFixed(2)} ${height} Z`}
          fill="var(--color-accent-500)"
          opacity="0.08"
        />
        <path d={path} fill="none" stroke="var(--color-accent-500)" strokeWidth="1.2" />
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r="1.4" fill="var(--color-accent-600)" />
        ))}
      </svg>
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
