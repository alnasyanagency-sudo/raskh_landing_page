"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { ease, fadeInDown, staggerContainer } from "@/lib/animations"

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "المميزات", href: "#services" },
  { label: "كيف يعمل", href: "#how-it-works" },
  { label: "الأسئلة الشائعة", href: "#faq" },
  { label: "تواصل معنا", href: "/contact" },
]

function scrollToElement(id: string) {
  const tick = (attempt: number) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    if (attempt < 120) requestAnimationFrame(() => tick(attempt + 1))
  }
  requestAnimationFrame(() => tick(0))
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Page navigation (e.g. /contact, /)
    if (href.startsWith("/")) {
      e.preventDefault()
      if (href === "/") {
        if (pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
          router.push("/")
        }
      } else {
        router.push(href)
      }
      return
    }

    // Anchor links (#services, #how-it-works, ...)
    if (href === "#") {
      e.preventDefault()
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        router.push("/")
      }
      return
    }

    e.preventDefault()
    const id = href.slice(1)
    if (pathname !== "/") router.push("/")
    scrollToElement(id)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.35, ease }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3 shadow-subtle"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-primary/50 rounded-lg"
              aria-label="راسخ للمحاماة - الرئيسية"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2014-esr839iLrsk7x6ot2exVaXlePpnLLi.png"
                alt="راسخ للمحاماة"
                width={100}
                height={67}
                className="h-10 w-auto"
                priority
              />
            </a>

            <nav className="hidden lg:flex items-center gap-8" aria-label="القائمة الرئيسية">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.03 }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <Button
                  size="sm"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg h-10 px-5 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20"
                >
                  <Download className="ml-2 h-4 w-4" />
                  تحميل التطبيق
                </Button>
              </motion.div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground rounded-lg hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-primary/50"
              aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/90 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <nav
              className="relative bg-card mx-4 mt-20 rounded-2xl p-6 space-y-1 border border-border/50 shadow-elevated"
              aria-label="القائمة الرئيسية"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    variants={fadeInDown}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false)
                      handleNavClick(e, link.href)
                    }}
                    className="block py-3 px-4 text-foreground hover:bg-muted rounded-xl transition-colors text-base"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.div
                  variants={fadeInDown}
                  className="pt-4"
                >
                  <Button
                    size="lg"
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl h-12 text-base"
                  >
                    <Download className="ml-2 h-5 w-5" />
                    تحميل التطبيق
                  </Button>
                </motion.div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
