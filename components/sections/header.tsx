"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const navLinks = [
  { label: "الرئيسية", href: "#" },
  { label: "المميزات", href: "#services" },
  { label: "كيف يعمل", href: "#how-it-works" },
  { label: "الأسئلة الشائعة", href: "#faq" },
  { label: "تواصل", href: "#contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2014-esr839iLrsk7x6ot2exVaXlePpnLLi.png"
                alt="راسخ للمحاماة"
                width={100}
                height={67}
                className="h-10 w-auto"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                size="sm"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg h-10 px-5"
              >
                <Download className="ml-2 h-4 w-4" />
                تحميل التطبيق
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden pt-20"
          >
            <div
              className="absolute inset-0 bg-background/90 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <nav className="relative bg-card mx-4 mt-4 rounded-2xl p-6 space-y-1 border border-border/50 shadow-soft">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-4 text-foreground hover:bg-muted rounded-xl transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <Button
                  size="lg"
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl h-12"
                >
                  <Download className="ml-2 h-5 w-5" />
                  تحميل التطبيق
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
