import Image from "next/image"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SCREENS, type ScreenKey } from "@/lib/site"

/**
 * CSS iPhone with a gold frame — echoes the official App Store creatives.
 * Sizes are expressed in container units, so the device scales from its
 * width alone (set width via className).
 */
export function Phone({
  screen,
  children,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 320px, 240px",
  glare = true,
}: {
  screen?: ScreenKey
  children?: ReactNode
  className?: string
  priority?: boolean
  sizes?: string
  glare?: boolean
}) {
  const s = screen ? SCREENS[screen] : null

  return (
    <div className={cn("@container relative", className)}>
      {/* side buttons */}
      <span aria-hidden="true" className="absolute top-[22%] -start-[0.9cqw] h-[9%] w-[1.4cqw] rounded-s-full bg-[#b89c6e]" />
      <span aria-hidden="true" className="absolute top-[18%] -end-[0.9cqw] h-[5%] w-[1.4cqw] rounded-e-full bg-[#b89c6e]" />
      <span aria-hidden="true" className="absolute top-[26%] -end-[0.9cqw] h-[9%] w-[1.4cqw] rounded-e-full bg-[#b89c6e]" />

      <div
        className="relative rounded-[16cqw] p-[1.1cqw] shadow-device"
        style={{
          background:
            "linear-gradient(145deg, #eadbbd 0%, #a98b5d 20%, #f4e9d2 42%, #8d7046 68%, #dcc59e 100%)",
        }}
      >
        <div className="rounded-[15cqw] bg-[#0a0c0b] p-[3.2cqw]">
          <div className="relative isolate overflow-hidden rounded-[12cqw] bg-black" style={{ aspectRatio: "798 / 1740" }}>
            {children ??
              (s && (
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  sizes={sizes}
                  priority={priority}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ))}
            {glare && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(115deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0)_32%)]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/** A real screen image to place inside <Phone> when stacking several screens. */
export function ScreenImage({
  screen,
  sizes = "(min-width: 1024px) 340px, 240px",
  priority = false,
  className,
  style,
}: {
  screen: ScreenKey
  sizes?: string
  priority?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  const s = SCREENS[screen]
  return (
    <Image
      src={s.src}
      alt={s.alt}
      width={s.width}
      height={s.height}
      sizes={sizes}
      priority={priority}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      style={style}
    />
  )
}
