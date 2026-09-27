"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { TRUST_ITEMS } from "@/lib/content"
import { inViewOnce, rise, stagger } from "@/lib/motion"
import { Phone } from "@/components/brand/phone"
import { BrandArcs } from "@/components/brand/arcs"
import { Eyebrow } from "@/components/site/eyebrow"

const POLICY_LINKS = [
  { label: "سياسة الخصوصية", href: "/policies/client/privacy" },
  { label: "شروط الاستخدام", href: "/policies/client/terms" },
  { label: "الإلغاء والاسترداد", href: "/policies/client/refund" },
]

export function Trust() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const rotate = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -6, reduce ? 0 : 4])
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 50, reduce ? 0 : -50])

  return (
    <section aria-labelledby="trust-title" className="bg-ivory pt-6 pb-24 md:pt-10 md:pb-32 xl:pb-36">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div ref={ref} className="relative order-2 flex justify-center py-6 lg:order-none lg:col-span-5">
          <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[min(460px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-wash" />
          <BrandArcs variant="ring" className="absolute top-1/2 left-1/2 w-[min(540px,92vw)] -translate-x-1/2 -translate-y-1/2" opacity={0.35} />
          <motion.div style={{ rotate, y }} className="relative">
            <Phone screen="privacy" className="w-[min(280px,64vw)]" sizes="300px" />
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <motion.header initial="hidden" whileInView="visible" viewport={inViewOnce} variants={stagger(0.08)}>
            <motion.div variants={rise}>
              <Eyebrow>الثقة والخصوصية</Eyebrow>
            </motion.div>
            <motion.h2 variants={rise} id="trust-title" className="text-h2 mt-5 text-ink">
              حماية خصوصيتك أولويتنا
            </motion.h2>
            <motion.p variants={rise} className="text-lead mt-5 max-w-2xl text-ink-soft">
              استمتع بخدمة قانونية عالية الجودة، مع التزام تام بالحفاظ على سرية معلوماتك وحماية حقوقك.
            </motion.p>
          </motion.header>

          <motion.ul initial="hidden" whileInView="visible" viewport={inViewOnce} variants={stagger(0.1)} className="mt-10 border-t border-ink/10 md:mt-12">
            {TRUST_ITEMS.map((item) => (
              <motion.li key={item.title} variants={rise} className="grid gap-2 border-b border-ink/10 py-6 md:grid-cols-12 md:gap-8 md:py-7">
                <h3 className="text-lg leading-8 font-bold text-ink md:col-span-5">{item.title}</h3>
                <p className="text-[16px] leading-8 text-ink-soft md:col-span-7">{item.body}</p>
              </motion.li>
            ))}
          </motion.ul>

          <nav aria-label="السياسات" className="mt-8 flex flex-wrap gap-2">
            {POLICY_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors duration-300 hover:border-gold/50 hover:text-green"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
