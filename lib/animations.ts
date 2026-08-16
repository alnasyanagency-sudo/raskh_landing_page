import { type Variants } from "framer-motion"

export const ease = [0.25, 0.1, 0.25, 1] as const
export const easeOut = [0, 0.55, 0.45, 1] as const
export const easeInOut = [0.76, 0, 0.24, 1] as const

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease } },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const cardHover = {
  rest: {
    y: 0,
    boxShadow:
      "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
    transition: { duration: 0.2, ease },
  },
  hover: {
    y: -2,
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.08)",
    transition: { duration: 0.2, ease },
  },
}

export const iconHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.15, ease } },
}

export const buttonGlow = {
  rest: {
    boxShadow:
      "0 4px 14px rgba(28, 53, 34, 0.15)",
  },
  hover: {
    boxShadow:
      "0 6px 24px rgba(28, 53, 34, 0.25)",
    transition: { duration: 0.2, ease },
  },
}

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
}