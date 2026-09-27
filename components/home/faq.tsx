"use client"

import Link from "next/link"
import * as Accordion from "@radix-ui/react-accordion"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { FAQS } from "@/lib/content"
import { CONTACT } from "@/lib/site"
import { inViewOnce, rise, stagger } from "@/lib/motion"
import { WhatsAppIcon } from "@/components/brand/icons"
import { Eyebrow } from "@/components/site/eyebrow"

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y scroll-mt-20 border-t border-ink/[0.07] bg-ivory">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <motion.div initial="hidden" whileInView="visible" viewport={inViewOnce} variants={stagger(0.08)} className="lg:sticky lg:top-32">
            <motion.div variants={rise}>
              <Eyebrow>الأسئلة الشائعة</Eyebrow>
            </motion.div>
            <motion.h2 variants={rise} id="faq-title" className="text-h2 mt-5 text-ink">
              كل ما تحتاج معرفته
            </motion.h2>
            <motion.p variants={rise} className="text-lead mt-5 text-ink-soft">
              إجابات على الأسئلة الأكثر شيوعًا حول راسخ والاستشارات عبر التطبيق.
            </motion.p>
            <motion.a
              variants={rise}
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white py-2 ps-2 pe-5 text-[15px] font-medium text-ink shadow-panel ring-1 ring-black/[0.05] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="grid size-9 place-items-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon className="size-[18px]" />
              </span>
              لم تجد إجابتك؟ تواصل عبر واتساب
            </motion.a>
          </motion.div>
        </div>

        <Accordion.Root type="single" collapsible defaultValue="item-0" className="border-t border-ink/10 lg:col-span-8">
          {FAQS.map((f, i) => (
            <Accordion.Item key={f.q} value={`item-${i}`} className="group border-b border-ink/10">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between gap-6 py-6 text-start text-[17px] leading-8 font-bold text-ink transition-colors duration-300 hover:text-green md:py-7 md:text-xl md:leading-9">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="relative grid size-10 shrink-0 place-items-center rounded-full text-ink ring-1 ring-ink/12 transition-[background-color,color,box-shadow] duration-300 group-data-[state=open]:bg-green group-data-[state=open]:text-white group-data-[state=open]:ring-green"
                  >
                    <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
                    <span className="absolute h-3.5 w-[1.5px] rounded-full bg-current transition-transform duration-300 ease-out-expo group-data-[state=open]:scale-y-0" />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down [animation-duration:320ms]">
                <div className="pe-4 pb-7 md:pe-16">
                  <p className="text-[16px] leading-8 text-ink-soft md:text-[17px] md:leading-9">{f.a}</p>
                  {"link" in f && f.link && (
                    <Link href={f.link.href} className="group/link mt-3 inline-flex items-center gap-1.5 text-[15px] font-bold text-gold-deep hover:text-green">
                      {f.link.label}
                      <ArrowLeft className="size-4 transition-transform duration-300 group-hover/link:-translate-x-1" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
