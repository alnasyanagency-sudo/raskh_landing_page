"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { 
  Scale, 
  Building2, 
  Users, 
  FileText, 
  Briefcase, 
  Shield 
} from "lucide-react"
import { ease, fadeInUp, staggerContainer } from "@/lib/animations"

const services = [
  {
    icon: Scale,
    title: "القضايا المدنية",
    description: "تمثيل قانوني متكامل في جميع القضايا المدنية والتجارية"
  },
  {
    icon: Building2,
    title: "قضايا الشركات",
    description: "تأسيس الشركات، العقود التجارية، والاستشارات القانونية"
  },
  {
    icon: Users,
    title: "قضايا الأسرة",
    description: "قضايا الأحوال الشخصية والحضانة والميراث بسرية تامة"
  },
  {
    icon: FileText,
    title: "صياغة العقود",
    description: "إعداد ومراجعة العقود لضمان حماية حقوقكم القانونية"
  },
  {
    icon: Briefcase,
    title: "القضايا العمالية",
    description: "حل النزاعات العمالية وتمثيل العملاء أمام الجهات المختصة"
  },
  {
    icon: Shield,
    title: "الملكية الفكرية",
    description: "حماية العلامات التجارية وبراءات الاختراع والحقوق الفكرية"
  },
]

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="section-padding px-4 relative overflow-hidden scroll-mt-20" id="services" aria-label="الخدمات">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/[0.02] to-secondary/[0.02] blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/[0.06] border border-secondary/10 text-secondary text-sm mb-6">
            خدماتنا
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            خدمات قانونية شاملة
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات القانونية للأفراد والشركات
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group"
            >
              <div className="bg-card rounded-2xl p-6 h-full border border-border/50 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <div className="w-12 h-12 rounded-xl bg-primary/[0.08] flex items-center justify-center mb-5 group-hover:bg-primary/[0.12] group-hover:scale-105 transition-all duration-200">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
