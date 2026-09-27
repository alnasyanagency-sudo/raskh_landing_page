"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { PILLARS } from "@/lib/content"
import { easeOutExpo, inViewOnce, rise, stagger } from "@/lib/motion"
import { Eyebrow } from "@/components/site/eyebrow"

const STATEMENT = "تجربة قانونية أكثر وضوحًا، من اختيار المحامي حتى الاستشارة."
const HIGHLIGHT = new Set(["أكثر", "وضوحًا،"])

function Word({ children, progress, range, highlight }: { children: string; progress: MotionValue<number>; range: [number, number]; highlight: boolean }) {
  const reduce = useReducedMotion()
  const opacity = useTransform(progress, range, [reduce ? 1 : 0.14, 1])
  return (
    <>
      <motion.span style={{ opacity }} className={highlight ? "text-gold-deep" : undefined}>
        {children}
      </motion.span>{" "}
    </>
  )
}

export function WhyRasikh() {
  const ref = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.45"] })
  const words = STATEMENT.split(" ")

  return (
    <section aria-labelledby="why-title" className="section-y relative z-10 -mt-10 rounded-t-[2.5rem] bg-ivory md:-mt-12 md:rounded-t-[3rem]">
      <div className="container-page">
        <div className="flex items-center gap-4">
          <Image src="/brand/app-icon.png" alt="" width={56} height={56} className="size-12 rounded-[14px] shadow-panel md:size-14 md:rounded-2xl" />
          <Eyebrow>لماذا راسخ</Eyebrow>
        </div>

        <h2
          ref={ref}
          id="why-title"
          className="mt-10 max-w-[20ch] text-[clamp(2rem,3.9vw+0.6rem,4rem)] leading-[1.42] font-bold text-ink md:mt-12 lg:max-w-[22ch]"
        >
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} highlight={HIGHLIGHT.has(w)}>
              {w}
            </Word>
          ))}
        </h2>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          variants={stagger(0.12)}
          className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-8 lg:gap-12"
        >
          {PILLARS.map((p, i) => (
            <motion.li key={p.title} variants={rise} className="relative pt-7">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-hairline" />
              <motion.span
                aria-hidden="true"
                variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.1, ease: easeOutExpo, delay: 0.1 } } }}
                className="absolute inset-x-0 top-0 h-px origin-right bg-gold"
              />
              <span className="text-sm font-bold text-gold-deep tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl leading-9 font-bold text-ink md:text-[1.375rem]">{p.title}</h3>
              <p className="mt-3 text-[16px] leading-8 text-ink-soft">{p.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
