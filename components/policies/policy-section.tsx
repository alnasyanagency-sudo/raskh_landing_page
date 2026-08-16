import type { PolicySectionData } from "@/lib/policies-data"

function SectionHeading({ title }: { title: string }) {
  return (
    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-3">
      <span
        className="inline-block w-1.5 h-6 rounded-full bg-primary/80 shrink-0"
        aria-hidden="true"
      />
      {title}
    </h3>
  )
}

function ParagraphSection({
  section,
}: {
  section: Extract<PolicySectionData, { kind: "paragraph" }>
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`heading-${section.id}`}
      className="scroll-mt-32"
    >
      <h3
        id={`heading-${section.id}`}
        className="text-lg md:text-xl font-bold text-foreground mb-3 leading-relaxed"
      >
        {section.title}
      </h3>
      <p className="text-[15px] md:text-base text-muted-foreground leading-[2] text-justify">
        {section.body}
      </p>
    </section>
  )
}

function NumberedSection({
  section,
}: {
  section: Extract<PolicySectionData, { kind: "numbered" }>
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`heading-${section.id}`}
      className="scroll-mt-32"
    >
      <SectionHeading title={section.title} />
      <ol className="space-y-4">
        {section.items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-4 bg-card rounded-xl border border-border/50 p-4 md:p-5 transition-colors duration-200 hover:border-primary/20"
          >
            <span
              className="w-9 h-9 shrink-0 rounded-full bg-secondary/10 text-secondary font-bold text-sm flex items-center justify-center mt-0.5"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <p className="text-[15px] md:text-base text-foreground leading-[1.9]">
              {item}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function CardsSection({
  section,
}: {
  section: Extract<PolicySectionData, { kind: "cards" }>
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`heading-${section.id}`}
      className="scroll-mt-32"
    >
      <SectionHeading title={section.title} />
      <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
        {section.items.map((item, index) => {
          const ItemIcon = item.icon
          return (
            <div
              key={index}
              className="group flex flex-col bg-card rounded-xl border border-border/50 p-5 md:p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/20"
            >
              <div className="flex items-center gap-3 mb-4">
                {ItemIcon && (
                  <span className="w-10 h-10 shrink-0 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <ItemIcon className="w-5 h-5" aria-hidden="true" />
                  </span>
                )}
                <h4 className="font-bold text-foreground text-sm md:text-base leading-relaxed">
                  {item.title}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground leading-[1.9]">
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function PolicySection({ section }: { section: PolicySectionData }) {
  switch (section.kind) {
    case "paragraph":
      return <ParagraphSection section={section} />
    case "numbered":
      return <NumberedSection section={section} />
    case "cards":
      return <CardsSection section={section} />
    default:
      return null
  }
}