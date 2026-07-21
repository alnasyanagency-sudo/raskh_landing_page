"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ease, fadeInUp, staggerContainer } from "@/lib/animations"
import { Counter } from "@/components/counter"

const stats = [
  { value: 1500, prefix: "+", label: "قضية ناجحة" },
  { value: 200, prefix: "+", label: "عميل راضٍ" },
  { value: 15, prefix: "", label: "سنة خبرة" },
  { value: 24, prefix: "", suffix: "/٧", label: "دعم متواصل" },
]

const partners = [
  {
    name: "وزارة العدل",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <rect x="8" y="18" width="24" height="4" rx="1" fill="currentColor" opacity="0.6" />
        <path d="M20 8l8 10H12l8-10z" fill="currentColor" opacity="0.3" />
        <rect x="14" y="22" width="12" height="8" rx="1" fill="currentColor" opacity="0.4" />
        <circle cx="20" cy="26" r="2" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "هيئة المحامين",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <rect x="12" y="6" width="16" height="20" rx="2" fill="currentColor" opacity="0.25" />
        <rect x="14" y="8" width="12" height="16" rx="1" fill="currentColor" opacity="0.4" />
        <circle cx="20" cy="14" r="3" fill="currentColor" opacity="0.6" />
        <path d="M16 22l1.5-3h5l1.5 3H16z" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "الغرفة التجارية",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <rect x="6" y="16" width="28" height="16" rx="2" fill="currentColor" opacity="0.25" />
        <rect x="10" y="18" width="20" height="4" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="10" y="24" width="8" height="4" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="20" y="24" width="10" height="4" rx="1" fill="currentColor" opacity="0.3" />
        <path d="M20 8l4 6l-8 2l4-8z" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: "منصة ناجز",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <circle cx="20" cy="20" r="12" fill="currentColor" opacity="0.15" />
        <circle cx="20" cy="20" r="8" fill="currentColor" opacity="0.25" />
        <path d="M20 12v16M12 20h16" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
]

export function Trust() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="section-padding px-4 relative overflow-hidden bg-muted/30" id="trust" aria-label="الإحصائيات">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent pointer-events-none" />
      <div className="relative z-10 container mx-auto max-w-5xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group bg-card rounded-2xl p-6 md:p-8 text-center shadow-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <div className="text-3xl md:text-4xl font-bold text-gold-gradient mb-2">
                {stat.prefix}<Counter value={stat.value} isInView={isInView} />{stat.suffix || ""}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <p className="text-xs text-muted-foreground mb-8 uppercase tracking-[0.2em]">
            شركاؤنا في النجاح
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.08, ease }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/20 hover:shadow-subtle transition-all duration-300"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/[0.08] flex items-center justify-center text-primary">
                  {partner.icon}
                </span>
                <span className="font-medium">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
