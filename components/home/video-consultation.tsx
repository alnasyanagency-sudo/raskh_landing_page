"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { VIDEO_FACTS } from "@/lib/content"
import { inViewOnce, rise, stagger } from "@/lib/motion"
import { Phone, ScreenImage } from "@/components/brand/phone"
import { BrandArcs } from "@/components/brand/arcs"
import { Eyebrow } from "@/components/site/eyebrow"

function Fact({ index, title, body }: { index: number; title: string; body: string }) {
  return (
    <li>
      <span className="flex items-center gap-2.5 text-sm font-bold text-gold-light tabular-nums">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-3 text-xl leading-9 font-bold text-white md:text-[1.375rem]">{title}</h3>
      <p className="mt-2 max-w-xs text-[16px] leading-8 text-white/70">{body}</p>
    </li>
  )
}

export function VideoConsultation() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })

  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.82, 1])
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, 0])
  const dim = useTransform(scrollYProgress, [0.35, 0.95], [reduce ? 0 : 0.7, 0])
  const fromRight = useTransform(scrollYProgress, [0.2, 1], [reduce ? 0 : 70, 0])
  const fromLeft = useTransform(scrollYProgress, [0.2, 1], [reduce ? 0 : -70, 0])
  const factsOpacity = useTransform(scrollYProgress, [0.25, 0.9], [reduce ? 1 : 0, 1])

  return (
    <section aria-labelledby="video-title" className="section-y relative isolate overflow-hidden bg-brand-green text-white">
      <BrandArcs variant="panel" className="absolute inset-0 -z-10 h-full w-full" opacity={0.22} />

      <div className="container-page">
        <motion.header initial="hidden" whileInView="visible" viewport={inViewOnce} variants={stagger(0.08)} className="mx-auto max-w-3xl text-center">
          <motion.div variants={rise}>
            <Eyebrow tone="dark">الاستشارات بالفيديو</Eyebrow>
          </motion.div>
          <motion.h2 variants={rise} id="video-title" className="text-h2 mt-5">
            استشارة قانونية بالفيديو، أقرب إليك
          </motion.h2>
          <motion.p variants={rise} className="text-lead mx-auto mt-5 max-w-2xl text-white/75">
            تواصل مع محاميك بسهولة وفي الوقت المناسب — من أي مكان، وداخل التطبيق.
          </motion.p>
        </motion.header>

        <div ref={ref} className="mt-14 grid items-center gap-12 md:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-14 xl:gap-20">
          <motion.ul style={{ x: fromRight, opacity: factsOpacity }} className="order-2 grid gap-10 sm:grid-cols-2 lg:order-none lg:grid-cols-1 lg:gap-14">
            {VIDEO_FACTS.slice(0, 2).map((f, i) => (
              <Fact key={f.title} index={i} {...f} />
            ))}
          </motion.ul>

          <motion.div style={{ scale, y }} className="relative order-1 mx-auto lg:order-none">
            <div aria-hidden="true" className="absolute inset-[-12%] rounded-full bg-[radial-gradient(closest-side,rgba(214,193,156,0.22),transparent)] blur-2xl" />
            <Phone className="relative w-[min(290px,68vw)] xl:w-[320px]">
              <ScreenImage screen="video" sizes="340px" />
              <motion.span aria-hidden="true" style={{ opacity: dim }} className="absolute inset-0 z-[1] bg-black" />
            </Phone>
          </motion.div>

          <motion.ul style={{ x: fromLeft, opacity: factsOpacity }} className="order-3 grid gap-10 sm:grid-cols-2 lg:order-none lg:grid-cols-1 lg:gap-14">
            {VIDEO_FACTS.slice(2).map((f, i) => (
              <Fact key={f.title} index={i + 2} {...f} />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
