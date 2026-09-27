import { Scale, UserRound } from "lucide-react"
import { PolicyCard } from "@/components/policies/policy-card"
import { POLICY_CATEGORIES, POLICIES_PAGE_META, getPoliciesByCategory, type PolicyCategory } from "@/lib/policies-data"
import { BrandArcs } from "@/components/brand/arcs"
import { Eyebrow } from "@/components/site/eyebrow"

const GROUP_COPY: Record<PolicyCategory, string> = {
  client: "السياسات الخاصة بالمستفيدين من الخدمات القانونية",
  lawyer: "السياسات الخاصة بالمحامين المسجلين في المنصة",
}

function CategoryGroup({ category }: { category: PolicyCategory }) {
  const policies = getPoliciesByCategory(category)
  const Icon = category === "client" ? UserRound : Scale
  return (
    <section aria-labelledby={`group-${category}`} className="rounded-[2rem] bg-white p-6 shadow-panel ring-1 ring-black/[0.04] sm:p-8 md:p-10">
      <header className="flex items-center gap-4 border-b border-hairline pb-6">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-green text-gold-light">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 id={`group-${category}`} className="text-xl leading-8 font-extrabold text-ink md:text-2xl">
            {POLICY_CATEGORIES[category].label}
          </h2>
          <p className="mt-0.5 text-sm leading-6 text-ink-soft">{GROUP_COPY[category]}</p>
        </div>
      </header>
      <ul className="mt-3 divide-y divide-hairline">
        {policies.map((p, i) => (
          <li key={`${p.category}-${p.slug}`}>
            <PolicyCard policy={p} index={i} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export function PoliciesPage() {
  return (
    <>
      <section aria-labelledby="policies-title" className="relative isolate overflow-hidden bg-brand-green pt-36 pb-28 text-white md:pt-44 md:pb-36">
        <BrandArcs className="absolute inset-0 -z-10 h-full w-full" opacity={0.25} />
        <div className="container-page">
          <Eyebrow tone="dark">راسخ</Eyebrow>
          <h1 id="policies-title" className="mt-6 text-[clamp(2.25rem,3.6vw+1rem,4rem)] leading-[1.25] font-extrabold">
            السياسات <span className="text-gold-light">والأنظمة</span>
          </h1>
          <p className="text-lead mt-5 max-w-2xl text-white/75">{POLICIES_PAGE_META.description}</p>
        </div>
      </section>

      <div className="relative z-10 -mt-16 pb-24 md:-mt-20 md:pb-32">
        <div className="container-page grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <CategoryGroup category="client" />
          <CategoryGroup category="lawyer" />
        </div>
      </div>
    </>
  )
}
