import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { PolicyData } from "@/lib/policies-data"

interface PolicyCardProps {
  policy: PolicyData
}

export function PolicyCard({ policy }: PolicyCardProps) {
  const Icon = policy.icon

  return (
    <div className="h-full">
      <Link
        href={`/policies/${policy.category}/${policy.slug}`}
        className="group flex h-full flex-col bg-card rounded-2xl border border-border/50 shadow-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover hover:border-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50"
        aria-label={`عرض ${policy.title}`}
      >
        <span className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
          <Icon className="w-6 h-6" aria-hidden="true" />
        </span>

        <h3 className="text-base font-bold text-foreground mb-2 leading-relaxed">
          {policy.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
          {policy.description}
        </p>

        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          عرض السياسة
          <ArrowLeft
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          />
        </span>
      </Link>
    </div>
  )
}