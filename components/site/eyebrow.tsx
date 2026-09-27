import { cn } from "@/lib/utils"

export function Eyebrow({ children, className, tone = "light" }: { children: React.ReactNode; className?: string; tone?: "light" | "dark" }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-sm font-bold",
        tone === "light" ? "text-gold-deep" : "text-gold-light",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-6", tone === "light" ? "bg-gold" : "bg-gold-light/70")} />
      {children}
    </p>
  )
}
