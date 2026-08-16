"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Download, UserCheck, MessageSquare } from "lucide-react"
import { ease, fadeInUp, staggerContainer } from "@/lib/animations"

const steps = [
  {
    icon: Download,
    number: "١",
    title: "حمّل التطبيق",
    description: "قم بتحميل تطبيق راسخ من متجر التطبيقات"
  },
  {
    icon: UserCheck,
    number: "٢",
    title: "اختر محاميك",
    description: "تصفح المحامين واختر الأنسب لقضيتك"
  },
  {
    icon: MessageSquare,
    number: "٣",
    title: "ابدأ استشارتك",
    description: "تواصل فورياً واحصل على الدعم القانوني"
  }
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="section-padding px-4 relative overflow-hidden bg-muted/30 scroll-mt-20" id="how-it-works" aria-label="كيف يعمل">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent pointer-events-none" />
      <div className="relative z-10 container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/[0.06] border border-secondary/10 text-secondary text-sm mb-6">
            كيف يعمل
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            ثلاث خطوات بسيطة
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            رحلة سهلة وواضحة للحصول على استشارتك القانونية
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute top-12 left-[15%] right-[15%] h-px bg-border hidden md:block"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-8 md:gap-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative text-center"
              >
                <div className="relative z-10 w-24 h-24 rounded-full bg-card border border-border/50 flex items-center justify-center mx-auto mb-6 shadow-card transition-shadow duration-300 group-hover:shadow-soft">
                  <div className="w-16 h-16 rounded-full bg-secondary/[0.08] flex items-center justify-center group-hover:bg-secondary/[0.12] transition-colors">
                    <step.icon className="w-7 h-7 text-secondary" />
                  </div>
                </div>

                <motion.div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md border-2 border-background z-20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.05, ease }}
                >
                  {step.number}
                </motion.div>

                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
