"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { EXPERIENCE_STEPS, type ExperienceStep } from "@/lib/content"
import type { ScreenKey } from "@/lib/site"
import { easeOutExpo, rise, stagger, inViewOnce } from "@/lib/motion"
import { Phone, ScreenImage } from "@/components/brand/phone"
import { BrandArcs } from "@/components/brand/arcs"
import { Eyebrow } from "@/components/site/eyebrow"

const SHORT_LABELS = ["اكتشف", "راجع", "احجز", "تواصل", "تابع"]
const UNIQUE_SCREENS = Array.from(new Set(EXPERIENCE_STEPS.map((s) => s.screen))) as ScreenKey[]
const pad = (n: number) => String(n + 1).padStart(2, "0")

/* ------------------------------------------------------------------ */
/* Phone that swaps real screens (one layer per unique screen)         */
/* ------------------------------------------------------------------ */
function StoryPhone({ step, className, sizes }: { step: ExperienceStep; className?: string; sizes?: string }) {
  const reduce = useReducedMotion()
  const activeIndex = UNIQUE_SCREENS.indexOf(step.screen)

  return (
    <Phone className={className} glare>
      {UNIQUE_SCREENS.map((screen, i) => {
        const isActive = i === activeIndex
        const focus = isActive ? step.focus : undefined
        return (
          <motion.div
            key={screen}
            aria-hidden={!isActive}
            className="absolute inset-0"
            initial={false}
            animate={
              reduce
                ? { opacity: isActive ? 1 : 0 }
                : { opacity: isActive ? 1 : 0, y: isActive ? 0 : i < activeIndex ? -36 : 36, scale: isActive ? 1 : 0.97 }
            }
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{ scale: focus ? focus.scale : 1 }}
              style={{ transformOrigin: focus ? `${focus.x}% ${focus.y}%` : "50% 46%" }}
              transition={{ duration: reduce ? 0 : 1, ease: easeOutExpo }}
            >
              <ScreenImage screen={screen} sizes={sizes} />
            </motion.div>
          </motion.div>
        )
      })}
    </Phone>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop: sticky phone + scrolling steps                             */
/* ------------------------------------------------------------------ */
function DesktopStory() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        })
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const goTo = (i: number) => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
  const step = EXPERIENCE_STEPS[active]

  return (
    <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10">
      {/* Steps (right column in RTL) */}
      <ol className="lg:col-span-6 xl:col-span-5">
        {EXPERIENCE_STEPS.map((s, i) => (
          <li
            key={s.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            data-index={i}
            className="flex min-h-[82vh] flex-col justify-center py-10"
          >
            <div className={cn("transition-[opacity,transform] duration-700 ease-out-expo", i === active ? "opacity-100" : "opacity-25")}>
              <span className="text-sm font-bold text-gold-deep tabular-nums">
                {pad(i)} <span className="text-ink/30">/ {pad(EXPERIENCE_STEPS.length - 1)}</span>
              </span>
              <h3 className="mt-5 text-[clamp(2rem,2.4vw+0.8rem,3rem)] leading-[1.3] font-extrabold text-ink">{s.title}</h3>
              <p className="text-lead mt-5 max-w-[30rem] text-ink-soft">{s.body}</p>
              {s.tags && (
                <ul className="mt-7 flex max-w-[30rem] flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-full border border-gold/30 bg-gold-wash px-3.5 py-1.5 text-sm font-medium text-green">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>

      {/* Sticky phone (left column in RTL) */}
      <div className="lg:col-span-6 xl:col-span-7">
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <div className="relative flex w-full items-center justify-center">
            <div aria-hidden="true" className="absolute size-[min(560px,70vh)] rounded-full bg-gold-wash" />
            <BrandArcs variant="ring" className="absolute w-[min(640px,80vh)]" opacity={0.35} />

            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={active}
                aria-hidden="true"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
                className="text-stroke-gold pointer-events-none absolute top-[14%] left-0 text-[clamp(6rem,9vw,9rem)] leading-none font-extrabold tabular-nums opacity-50 select-none"
              >
                {pad(active)}
              </motion.span>
            </AnimatePresence>

            <StoryPhone step={step} className="relative w-[min(300px,34vh)]" sizes="340px" />

            {/* step index — desktop only */}
            <nav aria-label="خطوات التطبيق" className="absolute top-1/2 right-[2%] -translate-y-1/2">
              <ul className="flex flex-col gap-3">
                {EXPERIENCE_STEPS.map((s, i) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`${pad(i)} — ${s.title}`}
                      aria-current={i === active ? "step" : undefined}
                      className="group flex items-center gap-3 py-1"
                    >
                      <span
                        className={cn(
                          "block h-2 rounded-full transition-all duration-500 ease-out-expo",
                          i === active ? "w-7 bg-gold" : "w-2 bg-ink/15 group-hover:bg-ink/30",
                        )}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile / tablet: swipeable snap carousel                            */
/* ------------------------------------------------------------------ */

/** Direction-agnostic (works in RTL): scroll so `el` sits in the middle of `root`. */
function centerInScroller(root: HTMLElement, el: HTMLElement) {
  const r = root.getBoundingClientRect()
  const e = el.getBoundingClientRect()
  root.scrollBy({ left: e.left + e.width / 2 - (r.left + r.width / 2), behavior: "smooth" })
}
function MobileStory() {
  const [active, setActive] = useState(0)
  const scroller = useRef<HTMLDivElement>(null)
  const slides = useRef<(HTMLElement | null)[]>([])
  const pills = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const root = scroller.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        })
      },
      { root, threshold: 0.6 },
    )
    slides.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  // keep the active pill visible without moving the page vertically
  useEffect(() => {
    const pill = pills.current[active]
    const bar = pill?.closest<HTMLElement>("[data-pill-bar]")
    if (pill && bar) centerInScroller(bar, pill)
  }, [active])

  const goTo = (i: number) => {
    const root = scroller.current
    const slide = slides.current[i]
    if (root && slide) centerInScroller(root, slide)
  }

  return (
    <div className="-mx-4 sm:-mx-6 lg:hidden">
      <div data-pill-bar className="no-scrollbar overflow-x-auto px-4 sm:px-6">
        <ul className="flex w-max gap-2 pb-5" aria-label="خطوات التطبيق">
          {EXPERIENCE_STEPS.map((s, i) => (
            <li key={s.id}>
              <button
                ref={(el) => {
                  pills.current[i] = el
                }}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active ? "step" : undefined}
                className={cn(
                  "flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors duration-300",
                  i === active ? "border-green bg-green text-white" : "border-border bg-white text-ink-soft",
                )}
              >
                <span className={cn("tabular-nums", i === active ? "text-gold-light" : "text-gold-deep")}>{pad(i)}</span>
                {SHORT_LABELS[i]}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div ref={scroller} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 sm:px-6">
        {EXPERIENCE_STEPS.map((s, i) => (
          <article
            key={s.id}
            ref={(el) => {
              slides.current[i] = el
            }}
            data-index={i}
            aria-label={`${pad(i)} — ${s.title}`}
            className="w-[86%] shrink-0 snap-center overflow-hidden rounded-[2rem] bg-white shadow-panel ring-1 ring-black/[0.04] sm:w-[62%]"
          >
            <div className="relative flex justify-center overflow-hidden bg-gold-wash px-6 py-8">
              <BrandArcs variant="ring" className="absolute top-1/2 w-[130%] -translate-y-1/2" opacity={0.3} />
              <Phone className="relative w-[52%] max-w-[210px]">
                <div className="absolute inset-0" style={s.focus ? { transform: `scale(${s.focus.scale})`, transformOrigin: `${s.focus.x}% ${s.focus.y}%` } : undefined}>
                  <ScreenImage screen={s.screen} sizes="230px" />
                </div>
              </Phone>
            </div>
            <div className="relative bg-white p-6 pt-7">
              <span className="text-sm font-bold text-gold-deep tabular-nums">{pad(i)}</span>
              <h3 className="mt-2 text-[1.375rem] leading-9 font-extrabold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15.5px] leading-8 text-ink-soft">{s.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export function AppExperience() {
  return (
    <section id="app" aria-labelledby="app-title" className="relative scroll-mt-24 bg-ivory pt-4 pb-16 lg:pb-8">
      <div className="container-page">
        <motion.header initial="hidden" whileInView="visible" viewport={inViewOnce} variants={stagger(0.08)} className="max-w-3xl pb-10 lg:pb-0">
          <motion.div variants={rise}>
            <Eyebrow>التطبيق</Eyebrow>
          </motion.div>
          <motion.h2 variants={rise} id="app-title" className="text-h2 mt-5 text-ink">
            رحلتك القانونية داخل التطبيق، خطوة بخطوة
          </motion.h2>
          <motion.p variants={rise} className="text-lead mt-5 max-w-2xl text-ink-soft">
            من اختيار المحامي حتى بدء الاستشارة ومتابعتها — كل ما تحتاجه للحصول على استشارتك القانونية في مكان واحد.
          </motion.p>
        </motion.header>

        <DesktopStory />
        <MobileStory />
      </div>
    </section>
  )
}
