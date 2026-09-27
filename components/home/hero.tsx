"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { Phone } from "@/components/brand/phone"
import { BrandArcs } from "@/components/brand/arcs"
import { StoreBadges } from "@/components/brand/store-badges"
import { Eyebrow } from "@/components/site/eyebrow"

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return desktop
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const desktop = useIsDesktop()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  // Scroll parallax — gentler on mobile so the side phones never leave the screen.
  // Read through a ref so the transforms pick up breakpoint changes after mount.
  const m = reduce ? 0 : 1
  const k = useRef({ text: 0, front: 0, side: 0, fan: 0, rot: 0, fade: 0 })
  k.current = desktop
    ? { text: 90 * m, front: -110 * m, side: -40 * m, fan: 46 * m, rot: 5 * m, fade: 0.8 * m }
    : { text: 40 * m, front: -50 * m, side: -30 * m, fan: 10 * m, rot: 2 * m, fade: 0.8 * m }

  const textY = useTransform(scrollYProgress, (p) => p * k.current.text)
  const textOpacity = useTransform(scrollYProgress, (p) => 1 - Math.min(p / 0.75, 1) * k.current.fade)
  const frontY = useTransform(scrollYProgress, (p) => p * k.current.front)
  const sideY = useTransform(scrollYProgress, (p) => p * k.current.side)
  const rightX = useTransform(scrollYProgress, (p) => p * k.current.fan)
  const leftX = useTransform(scrollYProgress, (p) => -p * k.current.fan)
  const rightRotate = useTransform(scrollYProgress, (p) => 7 + p * k.current.rot)
  const leftRotate = useTransform(scrollYProgress, (p) => -7 - p * k.current.rot)

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-brand-green text-white">
      <BrandArcs className="absolute inset-0 -z-10 h-full w-full" opacity={0.3} />

      <div className="container-page grid items-center gap-12 pt-28 pb-20 sm:gap-14 sm:pt-36 sm:pb-28 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-8 lg:pt-32 lg:pb-24">
        {/* Copy */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="text-center lg:col-span-6 lg:text-start">
          <div className="hero-in hidden sm:block" style={delay(0)}>
            <Eyebrow tone="dark">راسخ للمحاماة والاستشارات القانونية</Eyebrow>
          </div>

          <h1 id="hero-title" className="text-display sm:mt-6">
            <span className="block overflow-hidden pt-[0.06em] pb-[0.14em]">
              <span className="hero-line block" style={delay(120)}>
                استشاراتك القانونية
              </span>
            </span>
            <span className="-mt-[0.1em] block overflow-hidden pt-[0.06em] pb-[0.14em]">
              <span className="hero-line block text-gold-light" style={delay(220)}>
                بين يديك
              </span>
            </span>
          </h1>

          <p className="hero-in text-lead mx-auto mt-3 max-w-[20rem] text-white/75 sm:mt-5 sm:max-w-[33rem] lg:mx-0" style={delay(320)}>
            {/* shorter copy on phones */}
            <span className="sm:hidden">تواصل مع محامين مرخّصين واحصل على استشارتك القانونية عبر التطبيق.</span>
            <span className="hidden sm:inline">
              تواصل مع محامين مرخّصين في المملكة العربية السعودية، واحصل على استشارتك القانونية عبر التطبيق — فورية أو كتابية أو
              مجدولة.
            </span>
          </p>

          <div className="hero-in mt-7 sm:mt-10" style={delay(420)}>
            <p className="mb-4 hidden text-sm font-bold text-gold-light sm:block">حمّل تطبيق راسخ</p>
            <StoreBadges
              variant="light"
              className="mx-auto grid max-w-[22rem] grid-cols-2 gap-2.5 sm:flex sm:max-w-none sm:justify-center sm:gap-3 lg:justify-start"
              itemClassName="w-full sm:w-auto"
            />
          </div>

        </motion.div>

        {/* Product composition — three real screens */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-[0.86] w-full max-w-[330px] sm:max-w-[440px] lg:aspect-[0.8] lg:max-w-[540px]">
            <div
              aria-hidden="true"
              className="absolute inset-x-[10%] top-[18%] bottom-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(214,193,156,0.28),transparent)] blur-2xl"
            />
            <BrandArcs variant="ring" className="absolute top-1/2 left-1/2 w-[104%] -translate-x-1/2 -translate-y-1/2 lg:w-[112%]" opacity={0.28} />

            {/* back left — video consultation */}
            <motion.div style={{ x: leftX, y: sideY, rotate: leftRotate }} className="absolute top-[16%] left-[1%] z-10 w-[37%] lg:left-0 lg:w-[40%]">
              <div className="hero-fan-left brightness-[0.88]" style={delay(550)}>
                <Phone screen="video" sizes="(min-width: 1024px) 220px, 130px" />
              </div>
            </motion.div>

            {/* back right — choose a lawyer */}
            <motion.div style={{ x: rightX, y: sideY, rotate: rightRotate }} className="absolute top-[16%] right-[1%] z-10 w-[37%] lg:right-0 lg:w-[40%]">
              <div className="hero-fan-right brightness-[0.88]" style={delay(550)}>
                <Phone screen="lawyers" sizes="(min-width: 1024px) 220px, 130px" />
              </div>
            </motion.div>

            {/* front — home */}
            <motion.div style={{ y: frontY }} className="absolute top-[2%] left-1/2 z-20 w-[54%] -translate-x-1/2 lg:top-[3%] lg:w-[52%]">
              <div className="hero-phone" style={delay(250)}>
                <Phone screen="home" priority sizes="(min-width: 1024px) 290px, 190px" />
              </div>
            </motion.div>

            {/* editorial labels (desktop) */}
            <p className="hero-in absolute top-[7%] -right-2 z-30 hidden items-center gap-2 text-xs font-medium text-white/70 xl:flex" style={delay(1300)}>
              <span className="size-1.5 rounded-full bg-gold-light" />
              اختيار المحامي
            </p>
            <p className="hero-in absolute bottom-[10%] -left-2 z-30 hidden items-center gap-2 text-xs font-medium text-white/70 xl:flex" style={delay(1450)}>
              <span className="size-1.5 rounded-full bg-gold-light" />
              استشارة بالفيديو
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
