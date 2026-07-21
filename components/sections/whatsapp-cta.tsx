"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsappCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 px-4 relative overflow-hidden bg-[#1C3522]">
      <div className="relative z-10 container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
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
          
          <Button
            size="lg"
            className="bg-[#25D366] hover:bg-[#22c55e] text-white px-8 h-14 text-base font-medium rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 shrink-0"
          >
            <MessageCircle className="w-5 h-5 ml-2" />
            تواصل عبر واتساب
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
