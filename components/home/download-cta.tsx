"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { CONTACT } from "@/lib/site"
import { inViewOnce, rise, stagger } from "@/lib/motion"
import { Logo } from "@/components/brand/logo"
import { Phone } from "@/components/brand/phone"
import { BrandArcs } from "@/components/brand/arcs"
import { StoreBadges } from "@/components/brand/store-badges"
import { WhatsAppIcon } from "@/components/brand/icons"

export function DownloadCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const frontY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 70, reduce ? 0 : -50])
  const backY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 30, reduce ? 0 : -20])
  const backRotate = useTransform(scrollYProgress, [0, 1], [reduce ? -8 : -3, reduce ? -8 : -12])

  return (
    <section id="download" aria-labelledby="download-title" className="scroll-mt-24 bg-ivory pb-20 md:pb-28">
      <div className="container-page">
        <div
          ref={ref}
          className="relative isolate grid items-center gap-10 overflow-hidden rounded-[2rem] bg-brand-green px-6 pt-14 pb-12 text-white sm:px-10 md:rounded-[3rem] md:px-14 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:px-20 lg:py-20"
        >
          <BrandArcs className="absolute inset-0 -z-10 h-full w-full" opacity={0.28} />

          <motion.div initial="hidden" whileInView="visible" viewport={inViewOnce} variants={stagger(0.08)} className="text-center lg:col-span-7 lg:text-start">
            <motion.div variants={rise}>
              <Logo className="mx-auto h-12 md:h-14 lg:mx-0" />
            </motion.div>
            <motion.h2 variants={rise} id="download-title" className="text-h2 mt-8">
              ابدأ رحلتك القانونية اليوم
            </motion.h2>
            <motion.p variants={rise} className="text-lead mx-auto mt-5 max-w-xl text-white/75 lg:mx-0">
              حمّل تطبيق راسخ الآن واحصل على استشارتك القانونية من محامين مرخّصين في المملكة العربية السعودية.
            </motion.p>
            <motion.div variants={rise}>
              <StoreBadges className="mt-9 justify-center lg:justify-start" badgeClassName="h-11 sm:h-12" />
            </motion.div>
            <motion.div variants={rise} className="mt-10 border-t border-white/10 pt-8">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[15px] text-white/75 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="size-[18px] text-[#4ade80]" />
                تحتاج استشارة سريعة؟
                <span className="font-bold text-white underline decoration-white/30 underline-offset-[6px] group-hover:decoration-white/80">تواصل معنا عبر واتساب</span>
                <ArrowLeft className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-x-1" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>

          <div className="relative mx-auto aspect-[0.82] w-full max-w-[340px] lg:col-span-5 lg:max-w-[420px]">
            <motion.div style={{ y: backY, rotate: backRotate }} className="absolute top-[6%] left-[4%] w-[44%]">
              <div className="brightness-[0.9]">
                <Phone screen="home" sizes="200px" />
              </div>
            </motion.div>
            <motion.div style={{ y: frontY }} className="absolute top-0 right-[8%] w-[50%]">
              <Phone screen="splash" sizes="220px" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
