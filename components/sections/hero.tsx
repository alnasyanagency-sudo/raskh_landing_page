"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Download, MessageCircle, ChevronDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRef } from "react"
import { ease, fadeInUp, staggerContainer, buttonGlow } from "@/lib/animations"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-background pt-28 pb-12 md:pt-32" aria-label="القسم الرئيسي">
      {/* Ambient gradient orbs */}
      <div className="absolute top-20 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/[0.04] via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/[0.02] to-transparent blur-3xl pointer-events-none" />

      {/* Decorative line */}
      <div className="absolute top-0 right-1/3 w-px h-48 bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-px h-32 bg-gradient-to-t from-transparent via-primary/10 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          <motion.div
            className="text-center lg:text-right order-2 lg:order-1"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ opacity }}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/[0.08] border border-secondary/10 text-secondary text-sm font-medium">
                <Star className="w-3.5 h-3.5 fill-current" />
                تطبيق موثوق لأكثر من 10,000 مستخدم
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-[2rem] sm:text-[2.5rem] md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold leading-[1.1] mb-5 text-foreground"
            >
              <span className="text-balance block">استشاراتك القانونية</span>
              <span className="text-gold-gradient block mt-1">بين يديك</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto lg:mx-0 text-pretty"
            >
              تواصل مع محامين مرخصين في المملكة العربية السعودية.
              احصل على استشارات قانونية فورية عبر التطبيق.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <motion.div
                variants={buttonGlow}
                initial="rest"
                whileHover="hover"
              >
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 h-12 sm:h-14 text-sm sm:text-base font-semibold rounded-xl shadow-lg shadow-secondary/20 transition-all duration-300 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  <Download className="w-5 h-5 ml-2" />
                  تحميل التطبيق
                </Button>
              </motion.div>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-border hover:border-[#25D366]/50 text-foreground hover:bg-[#25D366]/5 px-8 h-12 sm:h-14 text-sm sm:text-base font-medium rounded-xl transition-all duration-300 group w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 ml-2 text-[#25D366] group-hover:scale-110 transition-transform duration-300" />
                تواصل عبر واتساب
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>مرخص رسمياً</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>سرية تامة</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>دعم على مدار الساعة</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative order-1 lg:order-2 flex justify-center items-center min-h-[300px] sm:min-h-[400px] lg:min-h-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative perspective-[2000px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl scale-150 rounded-full" />

              {/* Main phone */}
              <motion.div
                className="relative z-20"
                style={{ y: y1 }}
                initial={{ rotateY: 8, rotateX: 2 }}
                animate={{
                  y: [-6, 6, -6],
                  rotateY: [8, 6, 8],
                  rotateX: [2, -1, 2]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] transform-gpu" style={{ transformStyle: "preserve-3d" }}>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Iphone%2014-3nk8yMChdMeYm4ySQRl1wsx58ZhLm1.png"
                    alt="تطبيق راسخ - الشاشة الرئيسية"
                    width={280}
                    height={571}
                    className="w-full h-auto phone-shadow rounded-[2rem] sm:rounded-[2.5rem]"
                    priority
                  />
                </div>
              </motion.div>

              {/* Secondary phone */}
              <motion.div
                className="absolute -left-8 sm:-left-16 md:-left-24 top-8 sm:top-16 z-10"
                style={{ y: y2 }}
                initial={{ opacity: 0, x: -40, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: -15 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotateY: [-15, -12, -15]
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="w-[130px] sm:w-[160px] md:w-[200px] transform-gpu" style={{ transformStyle: "preserve-3d" }}>
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Iphone%2015-DHE1D4Uofqx6WtvGFV1gjGTw7TVxFi.png"
                      alt="تطبيق راسخ - اختيار المحامي"
                      width={200}
                      height={408}
                      className="w-full h-auto phone-shadow rounded-[1.5rem] sm:rounded-[2rem] opacity-90"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Success notification card */}
              <motion.div
                className="absolute -right-2 sm:-right-4 md:-right-8 top-16 sm:top-20 z-30"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-soft border border-green-500/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-semibold text-foreground">تم الحجز بنجاح</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">استشارة مع المحامي</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Rating card */}
              <motion.div
                className="absolute -left-4 sm:-left-8 md:-left-12 bottom-16 sm:bottom-24 z-30 hidden sm:block"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5, type: "spring" }}
              >
                <motion.div
                  animate={{ y: [0, 6, 0], rotate: [0, -1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="glass-card rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-soft">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-foreground">4.9</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">+2,500 تقييم</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#trust"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
          aria-label="اكتشف المزيد"
        >
          <span className="text-xs font-medium">اكتشف المزيد</span>
          <ChevronDown className="h-5 w-5" />
        </motion.a>
      </motion.div>
    </section>
  )
}
