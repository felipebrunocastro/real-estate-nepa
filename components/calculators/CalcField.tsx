import { cn } from "@/lib/utils";

/**
 * Reusable labeled numeric input for calculator tools. Supports a currency
 * prefix or a unit suffix (%, /yr) and optional help text. Values are kept as
 * strings by the parent so fields can be cleared while typing.
 */
export function CalcField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  help,
  min = 0,
  step = 1,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  help?: string;
  min?: number;
  step?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy-800">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-muted">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full rounded-md border border-border bg-surface py-2.5 text-sm text-navy-900 focus:border-accent-500 focus:outline-none",
            prefix ? "pl-7" : "pl-3",
            suffix ? "pr-12" : "pr-3",
          )}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted">
            {suffix}
          </span>
        )}
      </div>
      {help && <p className="mt-1 text-xs text-muted">{help}</p>}
    </div>
  );
}
