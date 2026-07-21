"use client"

import Image from "next/image"
import { MapPin, Phone, Mail } from "lucide-react"

const quickLinks = [
  { label: "الرئيسية", href: "#" },
  { label: "خدماتنا", href: "#services" },
  { label: "التطبيق", href: "#app" },
  { label: "كيف يعمل", href: "#how-it-works" },
]

const legalLinks = [
  { label: "سياسة الخصوصية", href: "#" },
  { label: "الشروط والأحكام", href: "#" },
]

export function Footer() {
  return (
    <footer className="relative py-16 px-4 bg-muted/30 border-t border-border/50">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2014-esr839iLrsk7x6ot2exVaXlePpnLLi.png"
              alt="راسخ للمحاماة"
              width={120}
              height={80}
              className="h-14 w-auto mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              شريكك القانوني الموثوق في المملكة العربية السعودية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">روابط قانونية</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span dir="ltr">+966 12 345 6789</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>info@rasikh.sa</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} راسخ للمحاماة. جميع الحقوق محفوظة.</p>
          <p>مرخص من وزارة العدل بالمملكة العربية السعودية</p>
        </div>
      </div>
    </footer>
  )
}
