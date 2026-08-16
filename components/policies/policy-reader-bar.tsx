"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowUp } from "lucide-react"

export function PolicyReaderBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 inset-x-0 h-[3px] origin-right bg-primary z-[60]"
        role="progressbar"
        aria-label="تقدم القراءة في الصفحة"
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Back to top button */}
      <motion.button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-elevated transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50"
        aria-label="العودة إلى أعلى الصفحة"
        initial={false}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.8,
          pointerEvents: showBackToTop ? "auto" : "none",
        }}
        transition={{ duration: 0.25 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUp className="w-5 h-5" aria-hidden="true" />
      </motion.button>
    </>
  )
}