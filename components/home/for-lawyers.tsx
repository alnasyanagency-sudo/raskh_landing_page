"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, BadgeCheck } from "lucide-react"
import { LAWYER_FLOW } from "@/lib/content"
import { easeOutExpo, inViewOnce, rise, stagger } from "@/lib/motion"
import { BrandArcs } from "@/components/brand/arcs"
import { Eyebrow } from "@/components/site/eyebrow"

export function ForLawyers() {
  return (
    <section aria-labelledby="lawyers-title" className="section-y bg-ivory">
      <div className="container-page">
        <div className="relative isolate grid gap-12 overflow-hidden rounded-[2rem] bg-white p-7 shadow-panel ring-1 ring-black/[0.04] sm:p-10 md:rounded-[2.5rem] lg:grid-cols-12 lg:items-center lg:gap-14 lg:p-16">
          <BrandArcs variant="panel" className="absolute inset-0 -z-10 h-full w-full" opacity={0.18} />

          <motion.div initial="hidden" whileInView="visible" viewport={inViewOnce} variants={stagger(0.08)} className="lg:col-span-6">
            <motion.div variants={rise}>
              <Eyebrow>للمحامين</Eyebrow>
            </motion.div>
            <motion.h2 variants={rise} id="lawyers-title" className="text-h2 mt-5 text-ink">
              أدِر قضاياك وتواصل مع عملائك من مكان واحد
            </motion.h2>
            <motion.p variants={rise} className="text-lead mt-5 text-ink-soft">
              تطبيق راسخ مصمم أيضًا للمحامين لتسهيل إدارة القضايا والتواصل مع العملاء، بواجهة بسيطة ومنظمة وأدوات تساعدك على تقديم خدمات
              قانونية احترافية.
            </motion.p>
            <motion.p variants={rise} className="mt-7 flex items-start gap-3 rounded-2xl bg-gold-wash p-4 text-[15px] leading-7 text-green md:p-5">
              <BadgeCheck className="mt-0.5 size-5 shrink-0 text-gold-deep" aria-hidden="true" />
              يتطلب التسجيل رخصة مزاولة مهنة سارية، ويظهر حسابك للعملاء بعد اعتماده من إدارة المنصة.
            </motion.p>
            <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="#download"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-green px-6 text-[15px] font-bold text-white transition-[background-color,transform] duration-300 hover:bg-green-mid active:scale-[0.97]"
              >
                انضم عبر التطبيق
                <ArrowLeft className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-x-1" aria-hidden="true" />
              </Link>
              <Link href="/policies/lawyer/terms" className="text-[15px] font-medium text-ink-soft underline decoration-ink/20 underline-offset-[6px] transition-colors hover:text-green hover:decoration-green/50">
                شروط الاستخدام للمحامي
              </Link>
            </motion.div>
          </motion.div>

          <motion.ol initial="hidden" whileInView="visible" viewport={inViewOnce} variants={stagger(0.12, 0.15)} className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
            {LAWYER_FLOW.map((f, i) => (
              <motion.li
                key={f.title}
                variants={{ hidden: { opacity: 0, y: 24, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: easeOutExpo } } }}
                className="group relative rounded-3xl border border-border bg-ivory p-6 transition-colors duration-300 hover:border-gold/40 hover:bg-gold-wash"
              >
                <span className="grid size-10 place-items-center rounded-full bg-green text-sm font-bold text-gold-light tabular-nums">{i + 1}</span>
                <h3 className="mt-5 text-lg leading-8 font-bold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-[15px] leading-7 text-ink-soft">{f.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
