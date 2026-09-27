"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { easeInOutQuart } from "@/lib/motion"

/**
 * Thin gold arcs — the line motif from Rasikh's App Store creatives.
 * Purely decorative.
 */
export function BrandArcs({
  className,
  variant = "hero",
  opacity = 0.4,
}: {
  className?: string
  variant?: "hero" | "panel" | "ring"
  opacity?: number
}) {
  const reduce = useReducedMotion()
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true },
          transition: { duration: 2.2, delay, ease: easeInOutQuart },
        }

  const stroke = { stroke: "var(--gold)", strokeWidth: 1, fill: "none", vectorEffect: "non-scaling-stroke" as const }

  if (variant === "ring") {
    return (
      <svg aria-hidden="true" viewBox="0 0 600 600" className={cn("pointer-events-none", className)} style={{ opacity }}>
        <motion.circle cx="300" cy="300" r="296" {...stroke} {...draw(0)} />
        <motion.circle cx="300" cy="300" r="230" {...stroke} {...draw(0.2)} />
        <motion.circle cx="300" cy="300" r="160" {...stroke} strokeDasharray="2 6" {...draw(0.4)} />
      </svg>
    )
  }

  if (variant === "panel") {
    return (
      <svg aria-hidden="true" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" className={cn("pointer-events-none", className)} style={{ opacity }}>
        <motion.circle cx="820" cy="-40" r="420" {...stroke} {...draw(0)} />
        <motion.circle cx="820" cy="-40" r="560" {...stroke} {...draw(0.15)} />
        <motion.circle cx="-60" cy="860" r="300" {...stroke} {...draw(0.3)} />
        <motion.line x1="0" y1="620" x2="800" y2="620" {...stroke} {...draw(0.45)} />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className={cn("pointer-events-none", className)} style={{ opacity }}>
      <motion.circle cx="-80" cy="120" r="520" {...stroke} {...draw(0.2)} />
      <motion.circle cx="-80" cy="120" r="660" {...stroke} {...draw(0.35)} />
      <motion.circle cx="1500" cy="980" r="420" {...stroke} {...draw(0.5)} />
      <motion.path d="M 1040 0 A 640 640 0 0 0 1440 560" {...stroke} {...draw(0.6)} />
    </svg>
  )
}
