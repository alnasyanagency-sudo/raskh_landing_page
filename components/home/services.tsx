"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowDownToLine, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { SERVICES } from "@/lib/content"
import { easeOutExpo, inViewOnce, rise, stagger } from "@/lib/motion"
import { BrandArcs } from "@/components/brand/arcs"
import { Eyebrow } from "@/components/site/eyebrow"

const pad = (n: number) => String(n + 1).padStart(2, "0")

export function Services() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const items = useRef<(HTMLLIElement | null)[]>([])

  // On desktop the item crossing the middle of the viewport becomes active too.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    if (!mq.matches) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        })
      },
      { rootMargin: "-48% 0px -48% 0px" },
    )
    items.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const service = SERVICES[active]

  return (
    <section id="services" aria-labelledby="services-title" className="section-y relative scroll-mt-20 bg-[#f4efe6]">
      <div className="container-page">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          variants={stagger(0.08)}
          className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10"
        >
          <div className="lg:col-span-7">
            <motion.div variants={rise}>
              <Eyebrow>الخدمات القانونية</Eyebrow>
            </motion.div>
            <motion.h2 variants={rise} id="services-title" className="text-h2 mt-5 text-ink">
              خدمات قانونية شاملة للأفراد والشركات
            </motion.h2>
          </div>
          <motion.p variants={rise} className="text-lead text-ink-soft lg:col-span-5">
            نقدم مجموعة متكاملة من الخدمات القانونية للأفراد والشركات. اختر المجال، واعثر على المحامي المتخصص عبر التطبيق.
          </motion.p>
        </motion.header>

        <div className="mt-12 grid gap-10 md:mt-16 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* Interactive list */}
          <ul className="lg:col-span-7">
            {SERVICES.map((s, i) => {
              const isActive = i === active
              return (
                <li
                  key={s.title}
                  ref={(el) => {
                    items.current[i] = el
                  }}
                  data-index={i}
                  className="border-b border-ink/10 first:border-t"
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    aria-controls={`service-panel-${i}`}
                    className="group flex w-full items-center gap-4 py-5 text-start md:gap-6 md:py-7"
                  >
                    <span className={cn("w-7 shrink-0 text-sm font-bold tabular-nums transition-colors duration-500", isActive ? "text-gold-deep" : "text-ink/45")}>
                      {pad(i)}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-[clamp(1.5rem,2.4vw+0.7rem,3.25rem)] leading-[1.35] font-extrabold transition-[color,translate] duration-500 ease-out-expo",
                        isActive ? "text-ink lg:-translate-x-3" : "text-ink/70 group-hover:text-ink lg:text-ink/50",
                      )}
                    >
                      {s.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-full transition-all duration-500 ease-out-expo md:size-12",
                        isActive ? "bg-green text-white" : "bg-transparent text-ink/30 ring-1 ring-ink/10",
                      )}
                    >
                      <ArrowLeft className={cn("size-5 transition-transform duration-500 ease-out-expo", isActive && "-translate-x-0.5")} />
                    </span>
                  </button>

                  {/* Inline description (mobile & tablet) */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={`service-panel-${i}`}
                        key="body"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: easeOutExpo }}
                        className="overflow-hidden lg:hidden"
                      >
                        <p className="ps-11 pb-6 text-[16px] leading-8 text-ink-soft md:ps-[3.25rem]">{s.body}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          {/* Sticky visual panel (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative isolate flex min-h-[500px] flex-col overflow-hidden rounded-[2.5rem] bg-brand-green p-10 text-white xl:p-12">
                <BrandArcs variant="panel" className="absolute inset-0 -z-10 h-full w-full" opacity={0.3} />
                <motion.div
                  aria-hidden="true"
                  animate={{ rotate: active * 30 }}
                  transition={{ type: "spring", stiffness: 60, damping: 18 }}
                  className="absolute -bottom-40 -left-40 -z-10 size-[26rem] rounded-full border border-dashed border-gold/35"
                />

                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>مجالات الخدمة</span>
                  <span className="tabular-nums" dir="ltr">
                    {pad(active)} / {pad(SERVICES.length - 1)}
                  </span>
                </div>

                <div id={`service-panel-desktop`} aria-live="polite" className="relative mt-10 flex-1">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active}
                      initial={reduce ? false : { opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.5, ease: easeOutExpo }}
                    >
                      <span aria-hidden="true" className="text-stroke-gold block text-[7.5rem] leading-none font-extrabold tabular-nums">
                        {pad(active)}
                      </span>
                      <h3 className="mt-8 text-[2rem] leading-[1.35] font-extrabold">{service.title}</h3>
                      <p className="mt-4 max-w-sm text-[17px] leading-8 text-white/75">{service.body}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-7">
                  <p className="text-[15px] leading-7 text-white/70">اعثر على محامٍ متخصص عبر التطبيق</p>
                  <Link
                    href="#download"
                    className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-gold px-5 text-[15px] font-bold text-green-deep transition-[background-color,transform] duration-300 hover:bg-gold-light active:scale-[0.97]"
                  >
                    <ArrowDownToLine className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                    حمّل التطبيق
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
