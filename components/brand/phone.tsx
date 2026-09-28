import Image from "next/image"
import { useId, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SCREENS, type ScreenKey } from "@/lib/site"

/*
 * Realistic iPhone (Pro-style) frame in Rasikh gold.
 * Geometry is in device units where the body is 100 wide; the viewBox adds
 * 1.5 on each side for the side buttons. The screen is 92 × 199.4 units —
 * exactly the 430 × 932 aspect of the app screenshots, so nothing is cropped.
 */
const VB_W = 103
const VB_H = 207.4
const BODY_X = 1.5
const INSET = 4 // metal band + glass bezel
const SCREEN_W = 100 - INSET * 2
const SCREEN_H = VB_H - INSET * 2
const SCREEN_R = 11.8
const pct = (v: number, of: number) => `${(v / of) * 100}%`

function Frame({ uid }: { uid: string }) {
  const metal = `metal-${uid}`
  const light = `light-${uid}`
  const btn = `btn-${uid}`
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={metal} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7c6140" />
          <stop offset="0.012" stopColor="#d8c199" />
          <stop offset="0.028" stopColor="#f6ecd7" />
          <stop offset="0.05" stopColor="#ae8f62" />
          <stop offset="0.5" stopColor="#cfb68b" />
          <stop offset="0.95" stopColor="#ae8f62" />
          <stop offset="0.972" stopColor="#f6ecd7" />
          <stop offset="0.988" stopColor="#d8c199" />
          <stop offset="1" stopColor="#7c6140" />
        </linearGradient>
        <linearGradient id={light} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.012" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.988" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={btn} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a6d44" />
          <stop offset="0.5" stopColor="#eadbbd" />
          <stop offset="1" stopColor="#a3845a" />
        </linearGradient>
      </defs>

      {/* side buttons: action + volume (left), power (right) */}
      <rect x="0.2" y="36" width="1.8" height="6.4" rx="0.7" fill={`url(#${btn})`} />
      <rect x="0.2" y="50.5" width="1.8" height="12.5" rx="0.7" fill={`url(#${btn})`} />
      <rect x="0.2" y="66.5" width="1.8" height="12.5" rx="0.7" fill={`url(#${btn})`} />
      <rect x={VB_W - 2} y="55" width="1.8" height="19" rx="0.7" fill={`url(#${btn})`} />

      {/* metal body */}
      <rect x={BODY_X} y="0" width="100" height={VB_H} rx="15.6" fill={`url(#${metal})`} />
      <rect x={BODY_X} y="0" width="100" height={VB_H} rx="15.6" fill={`url(#${light})`} />
      <rect x={BODY_X + 0.35} y="0.35" width="99.3" height={VB_H - 0.7} rx="15.25" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="0.3" />

      {/* antenna lines */}
      <rect x={BODY_X} y="17" width="1.5" height="0.8" fill="#5a4630" fillOpacity="0.55" />
      <rect x={BODY_X + 98.5} y="17" width="1.5" height="0.8" fill="#5a4630" fillOpacity="0.55" />
      <rect x={BODY_X + 17} y={VB_H - 1.5} width="0.8" height="1.5" fill="#5a4630" fillOpacity="0.55" />
      <rect x={BODY_X + 82.2} y={VB_H - 1.5} width="0.8" height="1.5" fill="#5a4630" fillOpacity="0.55" />

      {/* glass edge + black bezel */}
      <rect x={BODY_X + 1.5} y="1.5" width="97" height={VB_H - 3} rx="14.2" fill="#15130f" />
      <rect x={BODY_X + 1.9} y="1.9" width="96.2" height={VB_H - 3.8} rx="13.8" fill="#030303" />
    </svg>
  )
}

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
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const s = screen ? SCREENS[screen] : null

  return (
    <div className={cn("relative", className)} style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
      {/* soft device shadow following the body outline */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 shadow-device"
        style={{ left: pct(BODY_X, VB_W), right: pct(BODY_X, VB_W), borderRadius: `15.6% / ${pct(15.6, VB_H)}` }}
      />

      <Frame uid={uid} />

      {/* screen */}
      <div
        className="absolute isolate overflow-hidden bg-black"
        style={{
          left: pct(BODY_X + INSET, VB_W),
          top: pct(INSET, VB_H),
          width: pct(SCREEN_W, VB_W),
          height: pct(SCREEN_H, VB_H),
          borderRadius: `${pct(SCREEN_R, SCREEN_W)} / ${pct(SCREEN_R, SCREEN_H)}`,
        }}
      >
        {children ??
          (s && (
            <Image
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
              sizes={sizes}
              preload={priority}
              fetchPriority={priority ? "high" : undefined}
              unoptimized
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

      {/* Dynamic Island */}
      <span
        aria-hidden="true"
        className="absolute z-20 -translate-x-1/2 rounded-full bg-black"
        style={{ left: "50%", top: pct(INSET + 2.3, VB_H), width: pct(27, VB_W), height: pct(7.9, VB_H) }}
      >
        <span className="absolute top-1/2 right-[12%] aspect-square h-[42%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#3a4a6b,#0b0f1a_60%)]" />
      </span>
    </div>
  )
}

/**
 * A real screen image to place inside <Phone> when stacking several screens.
 * Screens are pre-optimized WebP exports, so they are served unmodified —
 * one small file per screen, reused by every section (no per-width variants).
 */
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
      preload={priority}
      fetchPriority={priority ? "high" : undefined}
      unoptimized
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      style={style}
    />
  )
}
