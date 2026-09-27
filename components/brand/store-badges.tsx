import { cn } from "@/lib/utils"
import { STORES } from "@/lib/site"
import { AppleIcon, GooglePlayIcon } from "@/components/brand/icons"

type Variant = "light" | "dark" | "glass"
type Size = "md" | "lg"

const variants: Record<Variant, string> = {
  light:
    "bg-white text-ink ring-1 ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_10px_24px_-12px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_16px_32px_-12px_rgba(0,0,0,0.4)]",
  dark: "bg-ink text-white hover:bg-green-deep shadow-[0_10px_24px_-14px_rgba(0,0,0,0.6)]",
  glass: "bg-white/[0.08] text-white ring-1 ring-white/15 backdrop-blur-md hover:bg-white/[0.14]",
}

const sizes: Record<Size, { root: string; icon: string; top: string; bottom: string }> = {
  md: { root: "h-12 gap-2.5 rounded-xl ps-3.5 pe-4", icon: "size-6", top: "text-[10px]", bottom: "text-[15px]" },
  lg: {
    root: "h-14 gap-2.5 rounded-2xl ps-3.5 pe-4 sm:gap-3 sm:ps-4 sm:pe-5",
    icon: "size-6 sm:size-7",
    top: "text-[10.5px] sm:text-[11px]",
    bottom: "text-[15px] sm:text-[17px]",
  },
}

function Badge({
  href,
  label,
  top,
  bottom,
  icon: Icon,
  variant,
  size,
  className,
}: {
  href: string
  label: string
  top: string
  bottom: string
  icon: typeof AppleIcon
  variant: Variant
  size: Size
  className?: string
}) {
  const s = sizes[size]
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group inline-flex select-none items-center justify-center transition-[transform,background-color,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        s.root,
        variants[variant],
        className,
      )}
    >
      <Icon className={cn(s.icon, "shrink-0 transition-transform duration-300 ease-out-expo group-hover:scale-110")} />
      <span className="flex min-w-0 flex-col items-start leading-none whitespace-nowrap">
        <span className={cn(s.top, "font-medium opacity-70")}>{top}</span>
        <span className={cn(s.bottom, "mt-1 font-bold tracking-tight")} dir="ltr">
          {bottom}
        </span>
      </span>
    </a>
  )
}

export function AppStoreBadge({ variant = "dark", size = "lg", className }: { variant?: Variant; size?: Size; className?: string }) {
  return (
    <Badge
      href={STORES.appStore}
      label="حمّل تطبيق راسخ من App Store"
      top="حمّله من"
      bottom="App Store"
      icon={AppleIcon}
      variant={variant}
      size={size}
      className={className}
    />
  )
}

export function GooglePlayBadge({ variant = "dark", size = "lg", className }: { variant?: Variant; size?: Size; className?: string }) {
  return (
    <Badge
      href={STORES.googlePlay}
      label="حمّل تطبيق راسخ من Google Play"
      top="احصل عليه من"
      bottom="Google Play"
      icon={GooglePlayIcon}
      variant={variant}
      size={size}
      className={className}
    />
  )
}

export function StoreBadges({
  variant = "dark",
  size = "lg",
  className,
  itemClassName,
}: {
  variant?: Variant
  size?: Size
  className?: string
  itemClassName?: string
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <AppStoreBadge variant={variant} size={size} className={itemClassName} />
      <GooglePlayBadge variant={variant} size={size} className={itemClassName} />
    </div>
  )
}
