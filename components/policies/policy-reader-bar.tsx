"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import { ArrowUp } from "lucide-react"

export function PolicyReaderBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* Reading progress — desktop only */}
      <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] hidden h-[3px] origin-right bg-gold md:block" />

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="العودة إلى أعلى الصفحة"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="fixed z-40 grid size-11 place-items-center rounded-full bg-green text-white shadow-panel"
            style={{ insetInlineEnd: "1rem", bottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
