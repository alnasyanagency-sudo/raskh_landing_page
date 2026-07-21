"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return prefersReducedMotion
}

function FloatingOrb({
  className,
  duration = 20,
  delay = 0,
  reduced,
}: {
  className: string
  duration?: number
  delay?: number
  reduced: boolean
}) {
  if (reduced) return <div className={className} />
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0, 15, 0],
        x: [0, 10, -12, 6, 0],
        rotate: [0, 3, -2, 1, 0],
        scale: [1, 1.05, 0.96, 1.02, 1],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  )
}

export function Background() {
  const reduced = useReducedMotion()

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* === DEPTH LAYER 1: Animated mesh gradients (far back) === */}
      <motion.div
        className="absolute inset-0 opacity-[0.035]"
        animate={
          reduced
            ? {}
            : {
                background: [
                  `radial-gradient(ellipse 70% 55% at 15% 20%, rgba(178, 149, 105, 0.5) 0%, transparent 55%),
                   radial-gradient(ellipse 50% 45% at 50% 65%, rgba(28, 53, 34, 0.4) 0%, transparent 50%),
                   radial-gradient(ellipse 40% 60% at 80% 25%, rgba(178, 149, 105, 0.35) 0%, transparent 45%)`,
                  `radial-gradient(ellipse 65% 50% at 30% 15%, rgba(178, 149, 105, 0.45) 0%, transparent 50%),
                   radial-gradient(ellipse 55% 40% at 45% 75%, rgba(28, 53, 34, 0.45) 0%, transparent 55%),
                   radial-gradient(ellipse 45% 55% at 75% 35%, rgba(178, 149, 105, 0.4) 0%, transparent 50%)`,
                  `radial-gradient(ellipse 60% 50% at 10% 30%, rgba(178, 149, 105, 0.5) 0%, transparent 50%),
                   radial-gradient(ellipse 50% 45% at 55% 60%, rgba(28, 53, 34, 0.4) 0%, transparent 55%),
                   radial-gradient(ellipse 45% 55% at 85% 20%, rgba(178, 149, 105, 0.35) 0%, transparent 50%)`,
                  `radial-gradient(ellipse 70% 55% at 15% 20%, rgba(178, 149, 105, 0.5) 0%, transparent 55%),
                   radial-gradient(ellipse 50% 45% at 50% 65%, rgba(28, 53, 34, 0.4) 0%, transparent 50%),
                   radial-gradient(ellipse 40% 60% at 80% 25%, rgba(178, 149, 105, 0.35) 0%, transparent 45%)`,
                ],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === DEPTH LAYER 2: Warm light from top-right === */}
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-[0.04]"
        style={{
          background: "radial-gradient(circle at center, rgba(178, 149, 105, 0.6) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={reduced ? {} : { scale: [1, 1.08, 1], rotate: [0, 2, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === DEPTH LAYER 3: Cool green light from bottom-left === */}
      <motion.div
        className="absolute -bottom-20 -left-20 w-[450px] h-[450px] opacity-[0.035]"
        style={{
          background: "radial-gradient(circle at center, rgba(28, 53, 34, 0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={reduced ? {} : { scale: [1, 1.12, 1], rotate: [0, -1.5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === DEPTH LAYER 4: Cross light beams === */}
      {!reduced && (
        <>
          <motion.div
            className="absolute top-[-15%] right-[25%] w-[300px] h-[120%] opacity-[0.008]"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(178, 149, 105, 0.3) 30%, rgba(178, 149, 105, 0.3) 70%, transparent 100%)",
              filter: "blur(60px)",
              transform: "skewX(-8deg)",
            }}
            animate={{ x: ["0%", "8%", "0%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-10%] left-[20%] w-[250px] h-[100%] opacity-[0.006]"
            style={{
              background: "linear-gradient(0deg, transparent 0%, rgba(28, 53, 34, 0.25) 40%, rgba(28, 53, 34, 0.25) 60%, transparent 100%)",
              filter: "blur(60px)",
              transform: "skewX(6deg)",
            }}
            animate={{ x: ["0%", "-6%", "0%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* === DEPTH LAYER 5: Central light pool === */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.025]"
        style={{
          background: "radial-gradient(circle at center, rgba(178, 149, 105, 0.3) 0%, rgba(28, 53, 34, 0.15) 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={reduced ? {} : { scale: [1, 1.06, 0.97, 1.03, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === DEPTH LAYER 6: Dot grid (fine) === */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(178, 149, 105, 0.35) 0.5px, transparent 0.5px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* === DEPTH LAYER 7: Secondary diagonal dot grid (contrast) === */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(28, 53, 34, 0.25) 0.5px, transparent 0.5px)`,
          backgroundSize: "44px 44px",
          backgroundPosition: "22px 22px",
        }}
      />

      {/* === DEPTH LAYER 8: Noise grain === */}
      <div
        className="absolute inset-0 opacity-[0.008] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      {/* === DEPTH LAYER 9: Focused glow spots at section anchors === */}
      <div className="absolute top-[5%] left-[25%] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent blur-[100px]" />
      <div className="absolute top-[35%] right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-secondary/[0.035] via-transparent to-transparent blur-[80px]" />
      <div className="absolute top-[60%] left-[5%] w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-primary/[0.03] via-transparent to-transparent blur-[90px]" />
      <div className="absolute bottom-[8%] right-[20%] w-[320px] h-[320px] rounded-full bg-gradient-to-tl from-secondary/[0.025] via-transparent to-transparent blur-[80px]" />

      {/* === DEPTH LAYER 10: Floating geometric shapes (varied sizes & shapes) === */}
      <FloatingOrb
        reduced={reduced}
        className="absolute top-[8%] right-[12%] w-20 h-20 rounded-full border border-primary/[0.025] bg-primary/[0.012]"
        duration={26}
      />
      <FloatingOrb
        reduced={reduced}
        className="absolute top-[22%] left-[5%] w-14 h-14 rounded-full border border-secondary/[0.025] bg-secondary/[0.012]"
        duration={30}
        delay={3}
      />
      <FloatingOrb
        reduced={reduced}
        className="absolute top-[42%] right-[8%] w-10 h-10 rotate-45 rounded-[3px] border border-primary/[0.02] bg-primary/[0.01]"
        duration={22}
        delay={5}
      />
      <FloatingOrb
        reduced={reduced}
        className="absolute top-[58%] left-[6%] w-24 h-24 rounded-full border border-primary/[0.02] bg-primary/[0.008]"
        duration={28}
        delay={2}
      />
      <FloatingOrb
        reduced={reduced}
        className="absolute top-[75%] right-[18%] w-12 h-12 rounded-full border border-secondary/[0.02] bg-secondary/[0.01]"
        duration={34}
        delay={7}
      />
      <FloatingOrb
        reduced={reduced}
        className="absolute top-[38%] left-[40%] w-8 h-8 rounded-full border border-primary/[0.02] bg-primary/[0.012]"
        duration={36}
        delay={4}
      />
      <FloatingOrb
        reduced={reduced}
        className="absolute bottom-[12%] left-[30%] w-16 h-16 rounded-[1.5rem] border border-secondary/[0.02] bg-secondary/[0.008]"
        duration={24}
        delay={6}
      />
      <FloatingOrb
        reduced={reduced}
        className="absolute top-[15%] left-[35%] w-6 h-6 rounded-full border border-primary/[0.025] bg-primary/[0.015]"
        duration={40}
        delay={8}
      />

      {/* === DEPTH LAYER 11: Light streak accents === */}
      {!reduced && (
        <>
          <motion.div
            className="absolute top-[10%] right-[40%] w-[2px] h-32 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent"
            animate={{ opacity: [0.3, 0.8, 0.3], scaleY: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[25%] left-[30%] w-[1.5px] h-24 bg-gradient-to-t from-transparent via-secondary/[0.03] to-transparent"
            animate={{ opacity: [0.2, 0.7, 0.2], scaleY: [1, 1.3, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
          <motion.div
            className="absolute top-[55%] right-[25%] w-[1px] h-20 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent"
            animate={{ opacity: [0.1, 0.6, 0.1], scaleY: [1, 1.15, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          />
        </>
      )}

      {/* === DEPTH LAYER 12: Soft vignette (multi-directional) === */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/8 via-transparent to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/5 via-transparent to-background/8" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background/15 to-transparent" />
    </div>
  )
}
