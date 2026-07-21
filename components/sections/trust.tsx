"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const stats = [
  { value: "+١٥٠٠", label: "قضية ناجحة" },
  { value: "+٢٠٠", label: "عميل راضٍ" },
  { value: "١٥", label: "سنة خبرة" },
  { value: "٢٤/٧", label: "دعم متواصل" },
]

const partners = [
  "وزارة العدل",
  "هيئة المحامين",
  "الغرفة التجارية",
  "منصة ناجز",
]

export function Trust() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="section-padding px-4 relative overflow-hidden bg-muted/30">
      <div className="relative z-10 container mx-auto max-w-5xl">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              className="bg-card rounded-2xl p-6 md:p-8 text-center shadow-subtle border border-border/50 hover:border-primary/20 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-bold text-gold-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xs text-muted-foreground mb-6 uppercase tracking-[0.2em]">
            شركاؤنا في النجاح
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                className="px-6 py-3 rounded-full bg-card border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
