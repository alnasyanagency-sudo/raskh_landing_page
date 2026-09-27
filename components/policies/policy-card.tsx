import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { PolicyData } from "@/lib/policies-data"

export function PolicyCard({ policy, index }: { policy: PolicyData; index: number }) {
  const Icon = policy.icon
  return (
    <Link
      href={`/policies/${policy.category}/${policy.slug}`}
      className="group -mx-3 flex items-start gap-4 rounded-2xl px-3 py-5 transition-colors duration-300 hover:bg-ivory md:gap-5"
    >
      <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-full bg-gold-wash text-gold-deep transition-colors duration-300 group-hover:bg-green group-hover:text-gold-light">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-2">
          <span className="text-xs font-bold text-gold-deep tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-[17px] leading-8 font-bold text-ink">{policy.title}</span>
        </span>
        <span className="mt-1 block text-[15px] leading-7 text-ink-soft">{policy.description}</span>
      </span>
      <ArrowLeft className="mt-3 size-5 shrink-0 text-ink/25 transition-[color,translate] duration-300 ease-out-expo group-hover:-translate-x-1 group-hover:text-green" aria-hidden="true" />
    </Link>
  )
}
