"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Apple, Star, Shield, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ease, fadeInUp, staggerContainer } from "@/lib/animations"

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="section-padding px-4 relative overflow-hidden" aria-label="تحميل التطبيق">
      {/* Deep glowing backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-primary/[0.05] via-secondary/[0.03] to-transparent blur-[150px] pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-4xl">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            className="lg:col-span-3 text-center lg:text-right"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2014-esr839iLrsk7x6ot2exVaXlePpnLLi.png"
                alt="راسخ للمحاماة"
                width={100}
                height={67}
                className="h-12 w-auto lg:mx-0 mx-auto"
              />
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground"
            >
              ابدأ رحلتك القانونية اليوم
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              حمّل تطبيق راسخ الآن واحصل على استشارتك القانونية من محامين مرخصين
            </motion.p>

            {/* App Store Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 rounded-[12px] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:shadow-foreground/10 group"
              >
                <Apple className="ml-3 h-5 w-5 group-hover:scale-105 transition-transform duration-300" />
                <div className="text-right">
                  <div className="text-[10px] opacity-70 leading-tight">حمّل من</div>
                  <div className="font-semibold text-sm leading-tight">App Store</div>
                </div>
              </Button>
              <Button
                size="lg"
                className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 rounded-[12px] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:shadow-foreground/10 group"
              >
                <svg className="ml-3 h-5 w-5 group-hover:scale-105 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="text-right">
                  <div className="text-[10px] opacity-70 leading-tight">حمّل من</div>
                  <div className="font-semibold text-sm leading-tight">Google Play</div>
                </div>
              </Button>
            </motion.div>

            {/* Trust & Contact row */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span>مرخص من وزارة العدل</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span>4.9</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <a href="tel:+966123456789" dir="ltr" className="hover:text-foreground transition-colors">
                  +966 12 345 6789
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Phone mockup */}
          <motion.div
            className="lg:col-span-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-secondary/[0.05] blur-3xl rounded-full scale-150" />
              <div>
                <div className="relative w-[180px] sm:w-[220px]">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Iphone%2014-3nk8yMChdMeYm4ySQRl1wsx58ZhLm1.png"
                    alt="تطبيق راسخ"
                    width={220}
                    height={449}
                    className="w-full h-auto phone-shadow rounded-[1.5rem] sm:rounded-[2rem]"
                  />
                  {/* Download count badge (static) */}
                  <div className="absolute -bottom-3 -left-4 bg-card border border-border/50 rounded-[12px] px-3 py-2 shadow-soft">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs font-semibold text-foreground whitespace-nowrap">+10,000 مستخدم</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
