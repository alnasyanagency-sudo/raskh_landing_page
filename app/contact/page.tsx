import type { Metadata } from "next"
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react"
import { CONTACT, SITE } from "@/lib/site"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { Eyebrow } from "@/components/site/eyebrow"
import { BrandArcs } from "@/components/brand/arcs"
import { WhatsAppIcon } from "@/components/brand/icons"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع فريق راسخ للمحاماة والاستشارات القانونية عبر واتساب أو الهاتف أو البريد الإلكتروني.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "تواصل معنا | راسخ للمحاماة" },
}

const channels = [
  {
    label: "واتساب",
    value: CONTACT.phoneDisplay,
    href: CONTACT.whatsapp,
    external: true,
    icon: WhatsAppIcon,
    primary: true,
  },
  { label: "الهاتف", value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}`, icon: Phone },
  { label: "البريد الإلكتروني", value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail },
] as const

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-ivory">
        <section aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-brand-green pt-36 pb-28 text-white md:pt-44 md:pb-36">
          <BrandArcs className="absolute inset-0 -z-10 h-full w-full" opacity={0.25} />
          <div className="container-page">
            <Eyebrow tone="dark">تواصل معنا</Eyebrow>
            <h1 id="contact-title" className="mt-6 text-[clamp(2.25rem,3.6vw+1rem,4rem)] leading-[1.25] font-extrabold">
              تواصل مع <span className="text-gold-light">راسخ</span>
            </h1>
            <p className="text-lead mt-5 max-w-xl text-white/75">
              يسعد فريق راسخ باستقبال استفساراتكم وملاحظاتكم وطلباتكم والتواصل معكم في أقرب وقت.
            </p>
          </div>
        </section>

        <section aria-label="قنوات التواصل ونموذج المراسلة" className="relative z-10 -mt-16 pb-24 md:-mt-20 md:pb-32">
          <div className="container-page grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 className="sr-only">قنوات التواصل</h2>
              <ul className="space-y-3">
                {channels.map((c) => {
                  const Icon = c.icon
                  const primary = "primary" in c && c.primary
                  return (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        {...("external" in c && c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={`group flex items-center gap-4 rounded-[1.5rem] p-5 shadow-panel ring-1 transition-transform duration-300 hover:-translate-y-0.5 md:p-6 ${
                          primary ? "bg-green text-white ring-green" : "bg-white text-ink ring-black/[0.04]"
                        }`}
                      >
                        <span
                          className={`grid size-12 shrink-0 place-items-center rounded-full ${primary ? "bg-[#25D366] text-white" : "bg-gold-wash text-gold-deep"}`}
                        >
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block text-sm ${primary ? "text-white/70" : "text-ink-soft"}`}>{c.label}</span>
                          <span className="mt-0.5 block truncate text-[17px] font-bold">
                            <bdi dir="ltr">{c.value}</bdi>
                          </span>
                        </span>
                        <ArrowLeft
                          className={`size-5 shrink-0 transition-transform duration-300 ease-out-expo group-hover:-translate-x-1 ${primary ? "text-gold-light" : "text-ink/30"}`}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  )
                })}
                <li className="flex items-center gap-4 rounded-[1.5rem] bg-white/60 p-5 ring-1 ring-black/[0.04] md:p-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold-wash text-gold-deep">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-ink-soft">الموقع</span>
                    <span className="mt-0.5 block text-[17px] font-bold text-ink">{SITE.city}</span>
                  </span>
                </li>
              </ul>
              <p className="mt-6 px-2 text-sm leading-7 text-ink-soft">لطلبات حذف الحساب، اختر «حذف حساب» في نوع الطلب داخل النموذج.</p>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
