import Link from "next/link"
import { ArrowRight, CalendarDays, UserRound } from "lucide-react"
import { PolicySection } from "@/components/policies/policy-section"
import { PolicyReaderBar } from "@/components/policies/policy-reader-bar"
import { POLICY_CATEGORIES, getPoliciesByCategory, type PolicyData } from "@/lib/policies-data"
import { BrandArcs } from "@/components/brand/arcs"

export function PolicyDetailPage({ policy }: { policy: PolicyData }) {
  const Icon = policy.icon
  const { badge } = POLICY_CATEGORIES[policy.category]
  const siblings = getPoliciesByCategory(policy.category).filter((p) => p.slug !== policy.slug)
  const showToc = policy.sections.length > 1

  return (
    <>
      <PolicyReaderBar />

      <section aria-labelledby="policy-title" className="relative isolate overflow-hidden bg-brand-green pt-32 pb-24 text-white md:pt-40 md:pb-32">
        <BrandArcs className="absolute inset-0 -z-10 h-full w-full" opacity={0.22} />
        <div className="container-page">
          <nav aria-label="مسار التنقل" className="text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  الرئيسية
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/policies" className="transition-colors hover:text-white">
                  السياسات والأنظمة
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/85">
                {policy.title}
              </li>
            </ol>
          </nav>

          <div className="mt-10 flex items-start gap-5">
            <span className="hidden size-16 shrink-0 place-items-center rounded-2xl bg-white/10 text-gold-light ring-1 ring-white/15 sm:grid">
              <Icon className="size-7" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h1 id="policy-title" className="text-[clamp(1.875rem,2.6vw+1rem,3.25rem)] leading-[1.3] font-extrabold">
                {policy.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[17px] leading-8 text-white/75">{policy.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-2.5 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 font-medium text-white ring-1 ring-white/15">
                  <UserRound className="size-3.5" aria-hidden="true" />
                  المستخدم: {badge}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 font-medium text-white ring-1 ring-white/15">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  آخر تحديث: {policy.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 -mt-12 pb-24 md:-mt-16 md:pb-32">
        <div className={`container-page grid items-start gap-8 ${showToc ? "lg:grid-cols-[280px_1fr] lg:gap-12" : ""}`}>
          {showToc && (
            <aside aria-label="محتويات الصفحة" className="sticky top-28 hidden lg:block">
              <nav className="rounded-[1.75rem] bg-white p-6 shadow-panel ring-1 ring-black/[0.04]">
                <h2 className="mb-4 text-sm font-bold text-ink">محتويات الصفحة</h2>
                <ol className="space-y-0.5">
                  {policy.sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex items-start gap-3 rounded-xl px-2.5 py-2 text-sm leading-6 text-ink-soft transition-colors duration-200 hover:bg-ivory hover:text-green"
                      >
                        <span className="mt-px shrink-0 text-xs font-bold text-gold-deep tabular-nums" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          <article className="min-w-0 rounded-[2rem] bg-white p-6 shadow-panel ring-1 ring-black/[0.04] sm:p-10 md:p-12">
            <div className="space-y-10 md:space-y-12">
              {policy.sections.map((section, index) => (
                <PolicySection key={section.id} section={section} index={index} />
              ))}
            </div>
          </article>
        </div>

        <div className="container-page mt-12 md:mt-16">
          <div className="flex flex-col gap-6 border-t border-hairline pt-8 md:flex-row md:items-center md:justify-between">
            <Link
              href="/policies"
              className="group inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-[15px] font-bold text-ink shadow-panel ring-1 ring-black/[0.04] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              العودة إلى السياسات والأنظمة
            </Link>
            {siblings.length > 0 && (
              <nav aria-label="سياسات ذات صلة" className="flex flex-wrap items-center gap-2">
                <span className="me-1 text-sm text-ink-soft">اقرأ أيضًا:</span>
                {siblings.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/policies/${p.category}/${p.slug}`}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-gold/50 hover:text-green"
                  >
                    {p.title}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
