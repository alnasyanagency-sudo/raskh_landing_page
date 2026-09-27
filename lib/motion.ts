import type { Transition, Variants } from "framer-motion"

export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const

export const spring: Transition = { type: "spring", stiffness: 260, damping: 30, mass: 0.8 }

/** Fade + rise, used for editorial blocks entering the viewport. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

/** Line mask reveal: the parent clips, the child slides up from below. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: easeOutExpo } },
}

export const inViewOnce = { once: true, margin: "0px 0px -12% 0px" } as const
