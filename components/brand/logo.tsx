import Image from "next/image"
import { cn } from "@/lib/utils"

/** Official Rasikh wordmark (unchanged). */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/rasikh-logo.png"
      alt="راسخ للمحاماة والاستشارات القانونية"
      width={460}
      height={183}
      preload={priority}
      sizes="150px"
      className={cn("h-10 w-auto", className)}
    />
  )
}
