import Link from "next/link"
import { ArrowRight, CalendarDays, ListTree, UserRound } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PolicySection } from "@/components/policies/policy-section"
import { PolicyReaderBar } from "@/components/policies/policy-reader-bar"
import { POLICY_CATEGORIES, type PolicyData } from "@/lib/policies-data"

export function PolicyDetailPage({ policy }: { policy: PolicyData }) {
  const Icon = policy.icon
  const { badge } = POLICY_CATEGORIES[policy.category]

  const sectionLinks = policy.sections.map((section) => ({
    id: section.id,
    title: section.title,
  }))

  return (
    <>
      <PolicyReaderBar />

      <section className="relative overflow-hidden pt-32 md:pt-36 pb-16 md:pb-24 px-4" aria-label={policy.title}>
        {/* Ambient gradient orbs */}
        <div
          className="absolute top-24 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 -right-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-secondary/[0.04] via-transparent to-transparent blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="container mx-auto max-w-5xl relative z-10">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList className="flex-wrap">
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="hover:text-foreground transition-colors text-sm">
                  <Link href="/">الرئيسية</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="hover:text-foreground transition-colors text-sm">
                  <Link href="/policies">السياسات والأنظمة</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm">{policy.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Page header */}
          <header className="mb-10 md:mb-12">
            <div className="flex items-start gap-4 md:gap-5">
              <span className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shadow-card">
                <Icon className="w-7 h-7 md:w-8 md:h-8" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-[1.3] text-balance mb-4">
                  {policy.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2.5 text-sm">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">
                    <UserRound className="w-3.5 h-3.5" aria-hidden="true" />
                    المستخدم: {badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground font-medium">
                    <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
                    آخر تحديث: {policy.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">
            {/* Table of contents - desktop sidebar */}
            <aside
              className="hidden lg:block sticky top-28"
              aria-label="محتويات الصفحة"
            >
              <nav className="bg-card rounded-2xl border border-border/50 shadow-card p-5">
                <h2 className="flex items-center gap-2 text-sm font-bold text-foreground mb-4">
                  <ListTree className="w-4 h-4 text-primary" aria-hidden="true" />
                  محتويات الصفحة
                </h2>
                <ul className="space-y-1">
                  {sectionLinks.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg py-1.5 px-2 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50"
                      >
                        <span
                          className="text-xs font-bold text-secondary mt-0.5 shrink-0 tabular-nums"
                          aria-hidden="true"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Policy content */}
            <article className="min-w-0 space-y-10 md:space-y-12">
              {policy.sections.map((section) => (
                <PolicySection key={section.id} section={section} />
              ))}
            </article>
          </div>

          {/* Back button */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-border/50">
            <Link
              href="/policies"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50"
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
              العودة إلى السياسات والأنظمة
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}