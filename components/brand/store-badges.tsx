import Image from "next/image"
import { cn } from "@/lib/utils"
import { STORES } from "@/lib/site"

/**
 * Official App Store / Google Play badges, used site-wide exactly as supplied
 * by Apple and Google (artwork and logo colours untouched). Both share one
 * height so they read as a matched pair — set it with `badgeClassName`.
 */
export function StoreBadges({ className, badgeClassName = "h-12" }: { className?: string; badgeClassName?: string }) {
  const link =
    "inline-flex shrink-0 rounded-[10px] transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a href={STORES.appStore} target="_blank" rel="noopener noreferrer" className={link}>
        <Image
          src="/badges/app-store.svg"
          alt="حمّل تطبيق راسخ من App Store"
          width={120}
          height={40}
          unoptimized
          className={cn("w-auto", badgeClassName)}
        />
      </a>
      <a href={STORES.googlePlay} target="_blank" rel="noopener noreferrer" className={link}>
        <Image
          src="/badges/google-play.webp"
          alt="حمّل تطبيق راسخ من Google Play"
          width={564}
          height={168}
          unoptimized
          className={cn("w-auto", badgeClassName)}
        />
      </a>
    </div>
  )
}
