"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Apple } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="section-padding px-4 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/[0.03] to-secondary/[0.03] blur-3xl" />

      <div className="relative z-10 container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-3xl p-8 md:p-12 text-center border border-border/50 shadow-soft"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2014-esr839iLrsk7x6ot2exVaXlePpnLLi.png"
              alt="راسخ للمحاماة"
              width={120}
              height={80}
              className="h-16 w-auto mx-auto"
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold mb-4 text-foreground"
          >
            ابدأ رحلتك القانونية اليوم
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground max-w-md mx-auto mb-10"
          >
            حمّل تطبيق راسخ الآن واحصل على استشارتك القانونية من محامين مرخصين
          </motion.p>

          {/* App Store Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background px-6 h-14 rounded-xl"
            >
              <Apple className="ml-3 h-6 w-6" />
              <div className="text-right">
                <div className="text-[10px] opacity-70">حمّل من</div>
                <div className="font-semibold text-sm">App Store</div>
              </div>
            </Button>
            <Button
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background px-6 h-14 rounded-xl"
            >
              <svg className="ml-3 h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
              </svg>
              <div className="text-right">
                <div className="text-[10px] opacity-70">حمّل من</div>
                <div className="font-semibold text-sm">Google Play</div>
              </div>
            </Button>
          </motion.div>

          {/* Contact info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            أو اتصل بنا: <span className="text-foreground font-medium" dir="ltr">+966 12 345 6789</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
