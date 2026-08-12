export interface ProseSection {
  heading: string;
  body: string[];
}

/**
 * Renders a list of heading + paragraph sections for text-heavy pages
 * (About, Privacy, Terms, Fair Housing, Accessibility). Content comes from the
 * translation files so these pages are fully localized.
 */
export function ProseSections({ sections }: { sections: ProseSection[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="font-display text-xl font-semibold text-navy-900 sm:text-2xl">
            {section.heading}
          </h2>
          <div className="mt-3 space-y-3">
            {section.body.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-navy-800">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
