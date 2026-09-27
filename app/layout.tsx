import type { Metadata, Viewport } from "next"
import { Tajawal } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SITE, STORES } from "@/lib/site"
import { MotionProvider } from "@/components/site/motion-provider"
import "./globals.css"

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
})

const title = "راسخ للمحاماة والاستشارات القانونية | استشاراتك القانونية بين يديك"

export const viewport: Viewport = {
  themeColor: "#1C3522",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: "%s | راسخ للمحاماة" },
  description: SITE.description,
  applicationName: SITE.shortName,
  keywords: [
    "راسخ",
    "راسخ للمحاماة",
    "استشارات قانونية",
    "استشارة قانونية عبر التطبيق",
    "محامي",
    "محامين مرخصين",
    "استشارة قانونية بالفيديو",
    "المملكة العربية السعودية",
    "Rasikh",
    "legal consultation Saudi Arabia",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/",
    siteName: SITE.name,
    title,
    description: SITE.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "تطبيق راسخ — استشاراتك القانونية بين يديك" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
    images: ["/og.png"],
  },
  itunes: { appId: STORES.appStoreId },
  robots: { index: true, follow: true },
  category: "legal",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" className={tajawal.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100] focus:rounded-full focus:bg-green focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          تخطَّ إلى المحتوى
        </a>
        <MotionProvider>{children}</MotionProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
