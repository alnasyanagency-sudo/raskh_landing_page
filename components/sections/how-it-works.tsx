"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Download, UserCheck, MessageSquare } from "lucide-react"

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
    <section ref={ref} className="section-padding px-4 relative overflow-hidden bg-muted/30" id="how-it-works">
      <div className="relative z-10 container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
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

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-12 left-0 right-0 h-px bg-border hidden md:block" />
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="relative text-center"
              >
                {/* Number circle */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-card border border-border/50 flex items-center justify-center mx-auto mb-6 shadow-subtle">
                  <div className="w-16 h-16 rounded-full bg-secondary/[0.08] flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-secondary" />
                  </div>
                </div>

                {/* Step number badge */}
                <div className="absolute top-0 right-1/2 translate-x-10 -translate-y-1 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
