"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { CONTACT } from "@/lib/site"
import { WhatsAppIcon } from "@/components/brand/icons"
import { easeOutExpo } from "@/lib/motion"

const DEFAULT_HIDE_OVER = ["download", "site-footer"]
const TEASER_KEY = "rasikh-wa-teaser-seen"

/**
 * WhatsApp shortcut. Desktop: green pill with label, soft pulse ring and a
 * one-time greeting bubble. Phones: a compact icon button only, so it never
 * takes screen space. Hidden over the download block and footer so it never
 * covers a primary CTA.
 */
export function WhatsappFloat({ hideOver = DEFAULT_HIDE_OVER }: { hideOver?: string[] }) {
  const [ready, setReady] = useState(false)
  const [overCta, setOverCta] = useState(false)
  const [teaser, setTeaser] = useState(false)

  // Appear shortly after load (or as soon as the visitor starts scrolling).
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1800)
    const onScroll = () => {
      if (window.scrollY > 200) setReady(true)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.clearTimeout(t)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  // Hide over the primary CTAs.
  useEffect(() => {
    const targets = hideOver.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const visible = new Set<Element>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
        setOverCta(visible.size > 0)
      },
      { rootMargin: "0px 0px -10% 0px" },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [hideOver])

  // Greeting bubble: desktop only, once per session.
  useEffect(() => {
    if (!ready || !window.matchMedia("(min-width: 768px)").matches) return

    let seen = false
    try {
      seen = sessionStorage.getItem(TEASER_KEY) === "1"
    } catch {}
    if (seen) return
    const open = window.setTimeout(() => setTeaser(true), 4500)
    const auto = window.setTimeout(() => dismissTeaser(), 16000)

    return () => {
      window.clearTimeout(open)
      window.clearTimeout(auto)
    }
  }, [ready])

  const dismissTeaser = () => {
    setTeaser(false)
    try {
      sessionStorage.setItem(TEASER_KEY, "1")
    } catch {}
  }

  const show = ready && !overCta

  return (
    <div
      className="pointer-events-none fixed z-40 flex flex-col items-end gap-3"
      style={{
        insetInlineEnd: "max(1rem, env(safe-area-inset-left))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      <AnimatePresence>
        {show && teaser && (
          <motion.div
            key="teaser"
            role="status"
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            style={{ transformOrigin: "bottom left" }}
            className="pointer-events-auto relative hidden w-[300px] rounded-[1.5rem] md:block bg-white p-4 shadow-[0_24px_60px_-20px_rgba(18,34,24,0.45)] ring-1 ring-black/[0.06]"
          >
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="إغلاق الرسالة"
              className="absolute top-3 left-3 grid size-7 place-items-center rounded-full text-ink/40 transition-colors hover:bg-black/5 hover:text-ink"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-3">
              <span className="relative">
                <Image src="/brand/app-icon.png" alt="" width={44} height={44} className="size-11 rounded-[12px]" />
                <span className="absolute -bottom-0.5 -left-0.5 size-3 rounded-full bg-[#25D366] ring-2 ring-white" />
              </span>
              <div>
                <p className="text-[15px] font-extrabold text-ink">راسخ للمحاماة</p>
                <p className="text-xs font-medium text-[#159a47]">عبر واتساب</p>
              </div>
            </div>
            <p className="mt-3 rounded-2xl rounded-tr-md bg-[#f0f7f2] px-3.5 py-2.5 text-[15px] leading-7 text-ink">
              كيف نقدر نخدمك؟ تواصل معنا مباشرة عبر واتساب.
            </p>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismissTeaser}
              className="mt-3 flex h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] text-[15px] font-bold text-white transition-colors hover:bg-[#1fb457]"
            >
              <WhatsAppIcon className="size-[18px]" />
              ابدأ المحادثة
            </a>
            <span aria-hidden="true" className="absolute -bottom-1.5 left-6 size-3 rotate-45 bg-white ring-1 ring-black/[0.04] [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {show && (
          <motion.a
            key="wa"
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تواصل معنا عبر واتساب"
            onClick={dismissTeaser}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 16 }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
            whileTap={{ scale: 0.95 }}
            className="group pointer-events-auto relative flex h-[52px] items-center rounded-full bg-gradient-to-b from-[#34e07f] to-[#1faf55] text-white shadow-[0_14px_34px_-10px_rgba(31,175,85,0.75),inset_0_1px_0_rgba(255,255,255,0.35)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-10px_rgba(31,175,85,0.9),inset_0_1px_0_rgba(255,255,255,0.35)] md:h-[60px]"
          >
            {/* label (first child = right side in RTL, so it extends inward from the corner icon) */}
            <span className="relative hidden ps-6 md:block">
              <span className="block">
                <span className="block whitespace-nowrap text-[15px] leading-tight font-bold md:text-base">تواصل عبر واتساب</span>
                <span className="mt-0.5 block whitespace-nowrap text-[11px] leading-tight font-medium text-white/85 md:text-xs">استفسارك يصلنا مباشرة</span>
              </span>
            </span>

            <span className="relative grid size-[52px] shrink-0 place-items-center md:size-[60px]">
              {/* attention rings */}
              <span aria-hidden="true" className="wa-pulse absolute inset-1 rounded-full bg-[#25D366]" />
              <span aria-hidden="true" className="wa-pulse absolute inset-1 rounded-full bg-[#25D366]" style={{ "--d": "1.3s" } as React.CSSProperties} />
              <WhatsAppIcon className="relative size-[26px] transition-transform md:size-7 duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-6" />
              <span aria-hidden="true" className="absolute top-2.5 right-2.5 size-2.5 rounded-full bg-white ring-2 ring-[#25D366] md:top-3.5 md:right-3.5" />
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  )
}
