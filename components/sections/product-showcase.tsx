"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const showcases = [
  {
    title: "اختر المحامي المناسب",
    description: "تصفح قائمة المحامين المرخصين، اطلع على تخصصاتهم وتقييماتهم، واحجز استشارتك بكل سهولة.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Iphone%2015-DHE1D4Uofqx6WtvGFV1gjGTw7TVxFi.png",
    alt: "شاشة اختيار المحامي",
    features: ["تصفية حسب التخصص", "عرض التقييمات", "حجز فوري"]
  },
  {
    title: "استشارات فورية بالفيديو",
    description: "تواصل مباشرة مع المحامي عبر مكالمات فيديو آمنة ومشفرة، من أي مكان وفي أي وقت.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Iphone%2016-NObwOSUeblbFKPaB1wcZCqDFqG8m8k.png",
    alt: "شاشة الاستشارة بالفيديو",
    features: ["مكالمات مشفرة", "تسجيل الجلسات", "دعم فني متواصل"]
  },
]

export function ProductShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="section-padding px-4 relative overflow-hidden" id="app">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/[0.02] to-secondary/[0.02] blur-3xl" />

      <div className="relative z-10 container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/[0.06] border border-secondary/10 text-secondary text-sm mb-6">
            التطبيق
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            تجربة قانونية متكاملة
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            كل ما تحتاجه للحصول على استشارتك القانونية في مكان واحد
          </p>
        </motion.div>

        {/* Showcase Items */}
        <div className="space-y-24 md:space-y-32">
          {showcases.map((showcase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Phone Mockup */}
              <motion.div
                className={`relative flex justify-center ${index % 2 === 1 ? "lg:order-2" : ""}`}
                whileInView={{ y: [10, -10, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative w-[240px] md:w-[280px]">
                  <Image
                    src={showcase.image}
                    alt={showcase.alt}
                    width={280}
                    height={571}
                    className="w-full h-auto phone-shadow rounded-[2.5rem]"
                  />
                </div>
              </motion.div>

              {/* Content */}
              <div className={`text-center lg:text-right ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  {showcase.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {showcase.description}
                </p>
                
                {/* Feature tags */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {showcase.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-primary/[0.06] border border-primary/10 text-sm text-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
