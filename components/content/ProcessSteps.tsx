export interface Step {
  title: string;
  description: string;
}

/** Numbered, ordered process steps (e.g. the home-buying journey). */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="flex gap-4 rounded-xl border border-border bg-surface p-5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-bold text-white">
            {i + 1}
          </span>
          <div>
            <h3 className="font-semibold text-navy-900">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
