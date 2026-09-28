import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { CONTACT, LEGAL_LINKS, NAV_LINKS, SITE } from "@/lib/site"
import { Logo } from "@/components/brand/logo"
import { StoreBadges } from "@/components/brand/store-badges"
import { WhatsAppIcon } from "@/components/brand/icons"

const linkClass =
  "inline-block text-[15px] text-ink-soft transition-colors duration-200 hover:text-green focus-visible:text-green"

export function Footer() {
  return (
    <footer id="site-footer" className="relative border-t border-hairline bg-[#f3eee5]" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        تذييل الموقع
      </h2>
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo className="h-12 md:h-14" />
            <p className="mt-5 max-w-xs text-[15px] leading-8 text-ink-soft">{SITE.tagline}</p>
            <div className="mt-7">
              <p className="mb-3 text-sm font-bold text-ink">حمّل تطبيق راسخ</p>
              <StoreBadges badgeClassName="h-10" />
            </div>
          </div>

          <nav aria-label="روابط الموقع" className="lg:col-span-2 lg:col-start-6">
            <h3 className="mb-5 text-sm font-bold text-ink">الموقع</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="روابط قانونية" className="lg:col-span-2">
            <h3 className="mb-5 text-sm font-bold text-ink">قانوني</h3>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="mb-5 text-sm font-bold text-ink">تواصل معنا</h3>
            <ul className="space-y-4">
              <li>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-[15px] text-ink-soft transition-colors hover:text-green">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#25D366]/12 text-[#1a9e4b]">
                    <WhatsAppIcon className="size-[18px]" />
                  </span>
                  <span>
                    واتساب <span dir="ltr" className="whitespace-nowrap">{CONTACT.phoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 text-[15px] text-ink-soft transition-colors hover:text-green">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold/12 text-gold-deep">
                    <Phone className="size-4" aria-hidden="true" />
                  </span>
                  <span dir="ltr" className="whitespace-nowrap">
                    {CONTACT.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-[15px] text-ink-soft transition-colors hover:text-green">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold/12 text-gold-deep">
                    <Mail className="size-4" aria-hidden="true" />
                  </span>
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-[15px] text-ink-soft">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold/12 text-gold-deep">
                  <MapPin className="size-4" aria-hidden="true" />
                </span>
                {SITE.city}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-7 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. جميع الحقوق محفوظة.
          </p>
          <p dir="ltr" className="text-start md:text-end">
            {SITE.nameEn}
          </p>
        </div>
      </div>
    </footer>
  )
}
