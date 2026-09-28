"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { HOW_STEPS } from "@/lib/content"
import { inViewOnce, rise, stagger } from "@/lib/motion"
import { Phone } from "@/components/brand/phone"
import { BrandArcs } from "@/components/brand/arcs"
import { StoreBadges } from "@/components/brand/store-badges"
import { Eyebrow } from "@/components/site/eyebrow"

const pad = (n: number) => String(n + 1).padStart(2, "0")

function Intro({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Eyebrow>كيف يعمل</Eyebrow>
      <h2 id="how-title" className="text-h2 mt-5 text-ink">
        ثلاث خطوات بسيطة
      </h2>
      <p className="text-lead mt-5 max-w-md text-ink-soft">رحلة سهلة وواضحة للحصول على استشارتك القانونية.</p>
    </div>
  )
}

function StepCard({ step, index, variant }: { step: (typeof HOW_STEPS)[number]; index: number; variant: "track" | "stack" }) {
  const track = variant === "track"
  return (
    <article
      aria-label={`الخطوة ${index + 1}: ${step.title}`}
      className={
        track
          ? "grid h-[min(540px,calc(100svh_-_13rem))] min-h-[320px] w-[min(820px,64vw)] shrink-0 grid-cols-[1.1fr_1fr] overflow-hidden rounded-[2.5rem] bg-white shadow-panel ring-1 ring-black/[0.04]"
          : "overflow-hidden rounded-[2rem] bg-white shadow-panel ring-1 ring-black/[0.04] md:grid md:grid-cols-[1.1fr_1fr]"
      }
    >
      {/* same padding on every card: p-10 in the track, p-6 → p-8 → p-10 when stacked */}
      <div className={track ? "flex min-h-0 flex-col justify-between p-10" : "p-6 sm:p-8 md:flex md:flex-col md:justify-between md:p-10"}>
        <span
          aria-hidden="true"
          className={`text-stroke-gold block leading-none font-extrabold tabular-nums ${track ? "text-[clamp(3.25rem,9vh,7rem)]" : "text-[4.5rem] md:text-[6rem]"}`}
        >
          {pad(index)}
        </span>
        <div className={track ? "" : "mt-6 md:mt-0"}>
          <h3 className={`font-extrabold text-ink ${track ? "text-[clamp(1.5rem,4.2vh,2.5rem)] leading-[1.3]" : "text-[1.75rem] leading-[1.35]"}`}>
            {step.title}
          </h3>
          <p className="mt-3 max-w-sm text-[16px] leading-7 text-ink-soft xl:text-[17px] xl:leading-8 short:mt-2 short:text-[15px] short:leading-6">{step.body}</p>
          {step.withStores && <StoreBadges className="mt-5 short:mt-4" badgeClassName="h-10 short:h-9" />}
        </div>
      </div>
      {/* in the track the phone is sized by the card height, so it always fits with even space around it */}
      <div className={`relative flex items-center justify-center overflow-hidden bg-gold-wash ${track ? "min-h-0" : "py-10"}`}>
        <BrandArcs variant="ring" className="absolute w-[150%]" opacity={0.35} />
        <Phone screen={step.screen} className={track ? "relative h-[82%] w-auto" : "relative w-[48%] max-w-[220px]"} sizes="260px" />
      </div>
    </article>
  )
}

/* Desktop: vertical scroll drives a horizontal track (RTL: moves right). */
function HorizontalTrack() {
  const section = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0, 1], [0, distance])
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <div ref={section} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20 short:pt-16">
        <motion.div
          ref={track}
          style={{ x }}
          className="flex w-max items-center gap-8 ps-[max(2rem,calc((100vw_-_1240px)/2_+_2rem))] pe-[max(2rem,calc((100vw_-_1240px)/2_+_2rem))] will-change-transform"
        >
          <Intro className="w-[min(420px,30vw)] shrink-0 pe-6" />
          {HOW_STEPS.map((s, i) => (
            <StepCard key={s.title} step={s} index={i} variant="track" />
          ))}
        </motion.div>

        {/* desktop-only progress */}
        <div className="container-page mt-10 short:mt-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 overflow-hidden bg-ink/10">
              <motion.div style={{ scaleX: progress }} className="h-full origin-right bg-gold" />
            </div>
            <span className="text-sm font-bold text-ink-soft tabular-nums" dir="ltr">
              01 — {pad(HOW_STEPS.length - 1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HowItWorks() {
  const reduce = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const pinned = isDesktop && !reduce

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative scroll-mt-0 bg-ivory">
      {pinned ? (
        <HorizontalTrack />
      ) : (
        <div className="section-y container-page">
          <motion.div initial="hidden" whileInView="visible" viewport={inViewOnce} variants={rise}>
            <Intro />
          </motion.div>
          <motion.ol initial="hidden" whileInView="visible" viewport={inViewOnce} variants={stagger(0.1)} className="mt-12 space-y-6 md:mt-16 md:space-y-8">
            {HOW_STEPS.map((s, i) => (
              <motion.li key={s.title} variants={rise}>
                <StepCard step={s} index={i} variant="stack" />
              </motion.li>
            ))}
          </motion.ol>
        </div>
      )}
    </section>
  )
}
