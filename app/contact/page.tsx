import type { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { Phone, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "تواصل معنا | راسخ للمحاماة",
  description:
    "تواصل مع فريق راسخ للمحاماة - يسعدنا استقبال استفساراتكم وملاحظاتكم وطلباتكم عبر الهاتف أو البريد أو واتساب.",
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background" role="main">
        <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20 px-4" aria-label="تواصل مع راسخ">
          <div
            className="absolute top-20 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-10 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/[0.04] via-transparent to-transparent blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
                تواصل معنا
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                تواصل مع <span className="text-gold-gradient">راسخ</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                يسعد فريق راسخ باستقبال استفساراتكم وملاحظاتكم وطلباتكم والتواصل معكم في أقرب وقت.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 mt-12 md:mt-16 items-start">
              {/* معلومات التواصل المختصرة */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl border border-border/50 shadow-card p-6">
                  <h2 className="text-base font-bold text-foreground mb-5">معلومات التواصل</h2>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-3">
                      <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">البريد الإلكتروني</p>
                        <a
                          href="mailto:info@alnasyan.com"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                        >
                          info@alnasyan.com
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">الهاتف</p>
                        <a href="tel:+966541241344" dir="ltr" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          +966 54 124 1344
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* نموذج التواصل */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
