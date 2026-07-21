import { type Variants } from "framer-motion"

export const ease = [0.25, 0.1, 0.25, 1] as const
export const easeOut = [0, 0.55, 0.45, 1] as const
export const easeInOut = [0.76, 0, 0.24, 1] as const

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease } },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

export const cardHover = {
  rest: {
    y: 0,
    boxShadow:
      "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
    transition: { duration: 0.3, ease },
  },
  hover: {
    y: -4,
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.08)",
    transition: { duration: 0.3, ease },
  },
}

export const iconHover = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.2, ease } },
}

export const buttonGlow = {
  rest: {
    boxShadow:
      "0 4px 14px rgba(28, 53, 34, 0.15)",
  },
  hover: {
    boxShadow:
      "0 6px 24px rgba(28, 53, 34, 0.25)",
    transition: { duration: 0.3, ease },
  },
}

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
}
