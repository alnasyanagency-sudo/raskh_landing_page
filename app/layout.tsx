import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
})

export const metadata: Metadata = {
  title: 'راسخ للمحاماة والاستشارات القانونية | Rasikh Advocacy',
  description: 'شريكك القانوني الموثوق في المملكة العربية السعودية. نقدم خدمات قانونية متكاملة للأفراد والشركات.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className={`${tajawal.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
