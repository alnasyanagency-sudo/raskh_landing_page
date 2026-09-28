export const SITE = {
  name: "راسخ للمحاماة والاستشارات القانونية",
  shortName: "راسخ",
  nameEn: "Rasikh Advocacy & Legal Consultations",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://v0-raskh-landing-page-design.vercel.app").replace(/\/$/, ""),
  description:
    "استشاراتك القانونية بين يديك. تواصل مع محامين مرخّصين في المملكة العربية السعودية واحصل على استشارتك القانونية عبر تطبيق راسخ.",
  tagline: "شريكك القانوني الموثوق في المملكة العربية السعودية.",
  city: "الرياض، المملكة العربية السعودية",
} as const

export const CONTACT = {
  phone: "+966541241344",
  phoneDisplay: "+966 54 124 1344",
  email: "info@rasikh.aldhakii.com",
  whatsapp: "https://wa.me/966541241344",
} as const

export const STORES = {
  appStore:
    "https://apps.apple.com/us/app/%D8%B1%D8%A7%D8%B3%D8%AE-%D8%A7%D9%84%D8%B0%D9%83%D9%8A-rasikh/id6810118137",
  googlePlay: "https://play.google.com/store/apps/details?id=com.rasikh.rasikh_smart",
  appStoreId: "6810118137",
  androidPackage: "com.rasikh.rasikh_smart",
  appName: "راسخ الذكي - Rasikh",
} as const

export const NAV_LINKS = [
  { label: "الرئيسية", href: "/", section: "top" },
  { label: "الخدمات", href: "/#services", section: "services" },
  { label: "التطبيق", href: "/#app", section: "app" },
  { label: "كيف يعمل", href: "/#how-it-works", section: "how-it-works" },
  { label: "الأسئلة الشائعة", href: "/#faq", section: "faq" },
  { label: "تواصل معنا", href: "/contact", section: "contact" },
] as const

export const LEGAL_LINKS = [
  { label: "السياسات والأنظمة", href: "/policies" },
  { label: "سياسة الخصوصية", href: "/policies/client/privacy" },
  { label: "شروط الاستخدام", href: "/policies/client/terms" },
  { label: "الإلغاء والاسترداد", href: "/policies/client/refund" },
] as const

/** Real app screens — official WebP exports (430×932), served as-is. */
export const SCREENS = {
  home: { src: "/app/screen-home.webp", width: 430, height: 932, alt: "الشاشة الرئيسية في تطبيق راسخ: محامون متخصصون في كل المجالات واستشارات قانونية احترافية" },
  lawyers: { src: "/app/screen-lawyers.webp", width: 430, height: 932, alt: "شاشة اختيار المحامي في تطبيق راسخ: سنوات الخبرة والتخصص وسعر الاستشارة والتقييم" },
  video: { src: "/app/screen-video.webp", width: 430, height: 932, alt: "شاشة الاستشارة الفورية بالفيديو في تطبيق راسخ" },
  account: { src: "/app/screen-account.webp", width: 430, height: 932, alt: "شاشة الحساب في تطبيق راسخ: البيانات الشخصية والمحفظة الإلكترونية والإشعارات والدعم" },
  splash: { src: "/app/screen-splash.webp", width: 430, height: 932, alt: "شاشة البداية في تطبيق راسخ بشعار راسخ للمحاماة والاستشارات القانونية" },
  privacy: { src: "/app/screen-privacy.webp", width: 430, height: 932, alt: "شاشة التعريف في تطبيق راسخ: حماية خصوصيتك أولويتنا" },
  payment: { src: "/app/screen-payment.webp", width: 430, height: 932, alt: "شاشة الدفع في تطبيق راسخ: تفاصيل الخدمة والفاتورة وطرق الدفع المتاحة" },
} as const

export type ScreenKey = keyof typeof SCREENS
