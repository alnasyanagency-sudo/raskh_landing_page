"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

const quickLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "خدماتنا", href: "#services" },
  { label: "التطبيق", href: "#app" },
  { label: "كيف يعمل", href: "#how-it-works" },
  { label: "تواصل معنا", href: "/contact" },
]

function scrollToElement(id: string) {
  const tick = (attempt: number) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    if (attempt < 120) requestAnimationFrame(() => tick(attempt + 1))
  }
  requestAnimationFrame(() => tick(0))
}

const legalLinks = [
  { label: "السياسات والأنظمة", href: "/policies" },
  { label: "سياسة الخصوصية", href: "/policies/client/privacy" },
  { label: "شروط الاستخدام", href: "/policies/client/terms" },
]

export function Footer() {
  const router = useRouter()
  const pathname = usePathname()

  const handleQuickLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/")) {
      // Let Next.js Link handle page navigation normally, but ensure correct behavior from any page
      // For "/" we want scroll to top if already on home
      if (href === "/" && pathname === "/") {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      return
    }
    if (href === "#") {
      e.preventDefault()
      if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" })
      else router.push("/")
      return
    }
    e.preventDefault()
    const id = href.slice(1)
    if (pathname !== "/") router.push("/")
    scrollToElement(id)
  }

  return (
    <footer className="relative py-16 px-4 bg-muted/30 border-t border-border/50" aria-label="التذييل">
      <div className="container mx-auto max-w-5xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2014-esr839iLrsk7x6ot2exVaXlePpnLLi.png"
              alt="راسخ للمحاماة"
              width={120}
              height={80}
              className="h-12 md:h-14 w-auto mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              شريكك القانوني الموثوق في المملكة العربية السعودية.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      onClick={(e) => handleQuickLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, link.href)}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm hover:pr-1 transition-all"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleQuickLinkClick(e, link.href)}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm hover:pr-1 transition-all"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">روابط قانونية</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm hover:pr-1 transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-foreground mb-4 text-sm">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+966541241344" dir="ltr" className="hover:text-foreground transition-colors">
                  +966 54 124 1344
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:info@alnasyan.com" className="hover:text-foreground transition-colors">
                  info@alnasyan.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/966541241344"
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="hover:text-foreground transition-colors"
                >
                  واتساب: +966 54 124 1344
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  تواصل معنا عبر النموذج ←
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} راسخ للمحاماة. جميع الحقوق محفوظة.</p>
          <p>مرخص من وزارة العدل بالمملكة العربية السعودية</p>
        </div>
      </div>
    </footer>
  )
}
