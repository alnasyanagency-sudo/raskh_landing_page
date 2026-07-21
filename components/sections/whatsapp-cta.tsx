"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ease, fadeInUp } from "@/lib/animations"

export function WhatsappCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 md:py-20 px-4 relative overflow-hidden bg-[#1C3522]" id="contact" aria-label="تواصل عبر واتساب">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-4xl">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              تحتاج استشارة سريعة؟
            </h3>
            <p className="text-white/70">
              تواصل معنا مباشرة عبر واتساب وسنرد عليك فوراً
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease }}
          >
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#22c55e] text-white px-8 h-14 text-base font-medium rounded-xl shadow-lg shadow-black/10 transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/20 hover:-translate-y-0.5 shrink-0"
            >
              <MessageCircle className="w-5 h-5 ml-2" />
              تواصل عبر واتساب
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
