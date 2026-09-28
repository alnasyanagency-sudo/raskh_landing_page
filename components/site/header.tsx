"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowDownToLine, ArrowLeft, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { CONTACT, NAV_LINKS } from "@/lib/site"
import { easeOutExpo } from "@/lib/motion"
import { Logo } from "@/components/brand/logo"
import { StoreBadges } from "@/components/brand/store-badges"
import { WhatsAppIcon } from "@/components/brand/icons"

const SECTION_IDS = ["services", "app", "how-it-works", "faq"] as const

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>("top")

  useEffect(() => {
    if (!enabled) return
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return

    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        }
        if (window.scrollY < window.innerHeight * 0.5) return setActive("top")
        setActive(SECTION_IDS.find((id) => visible.has(id)) ?? "")
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    els.forEach((el) => io.observe(el))

    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive("top")
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [enabled])

  return active
}

/* ------------------------------------------------------------------ */
/* Mobile drawer                                                        */
/* ------------------------------------------------------------------ */
function MobileDrawer({
  open,
  onClose,
  active,
  onNavClick,
}: {
  open: boolean
  onClose: () => void
  active: string
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = "hidden"
    const first = panel.current?.querySelector<HTMLElement>("[data-autofocus]")
    first?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose()
      if (e.key !== "Tab" || !panel.current) return
      const focusables = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      if (!focusables.length) return
      const firstEl = focusables[0]
      const lastEl = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      html.style.overflow = prev
      document.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 bg-green-deep/55 backdrop-blur-[3px]"
          />
          <motion.div
            ref={panel}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="القائمة"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
            className="absolute inset-y-0 start-0 flex w-[min(88vw,400px)] flex-col overflow-y-auto bg-ivory shadow-[0_0_60px_-10px_rgba(0,0,0,0.4)]"
            style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
          >
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-hairline px-5">
              <Link href="/" onClick={(e) => onNavClick(e, "/")} aria-label="راسخ للمحاماة — الرئيسية">
                <Logo className="h-9" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق القائمة"
                className="grid size-11 place-items-center rounded-full bg-white text-ink shadow-panel ring-1 ring-black/[0.05] transition-transform active:scale-95"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="القائمة الرئيسية للجوال" className="px-3 pt-4">
              <motion.ul initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } }}>
                {NAV_LINKS.map((link, i) => {
                  const isActive = active === link.section
                  return (
                    <motion.li
                      key={link.href}
                      variants={{ hidden: { opacity: 0, x: 28 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOutExpo } } }}
                    >
                      <Link
                        href={link.href}
                        data-autofocus={i === 0 ? "" : undefined}
                        onClick={(e) => onNavClick(e, link.href)}
                        aria-current={isActive ? (link.section === "contact" ? "page" : "location") : undefined}
                        className={cn(
                          "group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors",
                          isActive ? "bg-white shadow-panel ring-1 ring-black/[0.04]" : "hover:bg-white/70",
                        )}
                      >
                        <span className="w-6 text-xs font-bold text-gold-deep tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <span className={cn("flex-1 text-[20px] font-bold", isActive ? "text-green" : "text-ink")}>{link.label}</span>
                        <ArrowLeft
                          className={cn("size-5 transition-all duration-300 ease-out-expo", isActive ? "text-gold" : "text-ink/20 group-hover:-translate-x-1")}
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: easeOutExpo }}
              className="mt-auto px-4 pt-8"
            >
              <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-brand-green p-5 text-white">
                <div className="flex items-center gap-3.5">
                  <Image src="/brand/app-icon.png" alt="" width={52} height={52} className="size-[52px] rounded-[14px] ring-1 ring-white/15" />
                  <div>
                    <p className="text-[17px] font-extrabold">حمّل تطبيق راسخ</p>
                    <p className="mt-0.5 text-sm text-white/70">استشاراتك القانونية بين يديك</p>
                  </div>
                </div>
                <StoreBadges className="mt-5 gap-2" badgeClassName="h-10" />
              </div>

              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2.5 rounded-full bg-white py-3.5 text-[15px] font-bold text-ink shadow-panel ring-1 ring-black/[0.04]"
              >
                <WhatsAppIcon className="size-5 text-[#1fb457]" />
                تواصل معنا عبر واتساب
              </a>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ */
/* Header                                                               */
/* ------------------------------------------------------------------ */
export function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const activeSection = useActiveSection(isHome)

  const active = isHome ? activeSection : pathname.startsWith("/contact") ? "contact" : ""

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const close = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // release the drawer's scroll lock before Next scrolls to the anchor
    document.documentElement.style.overflow = ""
    setOpen(false)
    if (href === "/" && isHome) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-4 md:pt-4">
        <div className="relative mx-auto max-w-[1180px]">
          <div
            className={cn(
              "flex items-center justify-between gap-3 rounded-full border border-black/[0.06] ps-5 pe-2 transition-[height,background-color,box-shadow] duration-500 ease-out-expo sm:ps-6",
              scrolled ? "h-14 bg-white/90 shadow-float backdrop-blur-xl md:h-[60px]" : "h-16 bg-white/95 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] md:h-[68px]",
            )}
          >
            <Link href="/" onClick={(e) => onNavClick(e, "/")} aria-label="راسخ للمحاماة — الرئيسية" className="shrink-0 rounded-lg">
              <Logo priority className={cn("w-auto transition-[height] duration-500 ease-out-expo", scrolled ? "h-8 md:h-9" : "h-9 md:h-10")} />
            </Link>

            <nav aria-label="القائمة الرئيسية" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = active === link.section
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={(e) => onNavClick(e, link.href)}
                        aria-current={isActive ? (link.section === "contact" ? "page" : "location") : undefined}
                        className={cn(
                          "relative block rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-300",
                          isActive ? "text-green" : "text-ink/65 hover:text-ink",
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-full bg-gold-wash ring-1 ring-gold/25"
                            transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          />
                        )}
                        <span className="relative">{link.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5">
              {/* Desktop download CTA — on mobile it lives inside the drawer */}
              <Link
                href="/#download"
                className="group hidden h-11 items-center gap-2 rounded-full bg-green px-5 text-[15px] font-bold text-white transition-[background-color,transform] duration-300 hover:bg-green-mid active:scale-[0.97] lg:inline-flex"
              >
                <ArrowDownToLine className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5" aria-hidden="true" />
                حمّل التطبيق
              </Link>

              <button
                ref={buttonRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label="فتح القائمة"
                className="group flex h-11 items-center gap-2.5 rounded-full bg-green ps-4 pe-3.5 text-sm font-bold text-white transition-transform active:scale-95 lg:hidden"
              >
                القائمة
                <span aria-hidden="true" className="flex w-[18px] flex-col items-end gap-[5px]">
                  <span className="block h-[1.75px] w-full rounded-full bg-current" />
                  <span className="block h-[1.75px] w-2/3 rounded-full bg-gold-light transition-[width] duration-300 group-hover:w-full" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer open={open} onClose={close} active={active} onNavClick={onNavClick} />
    </>
  )
}
