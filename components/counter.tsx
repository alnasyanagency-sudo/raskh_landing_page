"use client"

import { useEffect, useState, useRef } from "react"

function toArabicNumerals(num: number): string {
  return num.toLocaleString("ar-SA", { useGrouping: false })
}

export function Counter({ value, isInView }: { value: number; isInView: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      const duration = 1500
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  if (value === 24) {
    return <>{isInView ? toArabicNumerals(24) : toArabicNumerals(0)}/٧</>
  }

  return <>{isInView ? toArabicNumerals(count) : toArabicNumerals(0)}</>
}
