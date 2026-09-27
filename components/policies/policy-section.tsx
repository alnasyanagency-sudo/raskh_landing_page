import type { PolicySectionData } from "@/lib/policies-data"

function Heading({ id, title, index }: { id: string; title: string; index: number }) {
  return (
    <h2 id={`heading-${id}`} className="flex items-baseline gap-3 text-xl leading-9 font-extrabold text-ink md:text-2xl md:leading-10">
      <span className="text-sm font-bold text-gold-deep tabular-nums" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      {title}
    </h2>
  )
}

export function PolicySection({ section, index }: { section: PolicySectionData; index: number }) {
  return (
    <section id={section.id} aria-labelledby={`heading-${section.id}`} className="scroll-mt-32">
      <Heading id={section.id} title={section.title} index={index} />

      {section.kind === "paragraph" && <p className="mt-3 text-[16px] leading-[2] text-ink-soft md:text-[17px]">{section.body}</p>}

      {section.kind === "numbered" && (
        <ol className="mt-6 divide-y divide-hairline border-y border-hairline">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-4 py-4 md:gap-5 md:py-5">
              <span
                className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-gold-wash text-sm font-bold text-gold-deep tabular-nums"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <p className="text-[16px] leading-[1.95] text-ink md:text-[17px]">{item}</p>
            </li>
          ))}
        </ol>
      )}

      {section.kind === "cards" && (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {section.items.map((item, i) => {
            const ItemIcon = item.icon
            return (
              <li key={i} className="rounded-3xl border border-border bg-ivory p-5 md:p-6">
                <div className="flex items-start gap-3">
                  {ItemIcon && (
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-gold-deep ring-1 ring-black/[0.05]">
                      <ItemIcon className="size-5" aria-hidden="true" />
                    </span>
                  )}
                  <h3 className="pt-1.5 text-[16px] leading-7 font-bold text-ink">{item.title}</h3>
                </div>
                <p className="mt-3 text-[15px] leading-[1.9] text-ink-soft">{item.description}</p>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
