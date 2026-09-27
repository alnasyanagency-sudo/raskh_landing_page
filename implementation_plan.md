# راسخ — Implementation Plan (Full Redesign)

## 1. Audit

### Stack
- Next.js 16.2 (App Router) · React 19 · Tailwind CSS v4 · framer-motion 12 · Radix (shadcn/ui) · Tajawal via `next/font`.
- `next.config.mjs` had `typescript.ignoreBuildErrors: true` and a remote image host (Vercel Blob) for the logo and phone mockups.

### Routes
| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/contact` | Contact info + form (form opens a pre-filled WhatsApp message) |
| `/policies` | Policies index (client / lawyer) |
| `/policies/[category]/[slug]` | 6 static policy pages (privacy, terms, refund, financial) |

### Brand (kept as-is)
- Logo: gold wordmark `راسخ — للمحاماة والاستشارات القانونية — Advocacy & Legal Consultations` (was loaded from Vercel Blob; now served locally at `/brand/rasikh-logo.png`).
- Colors: gold `#B29569` (primary), deep green `#1C3522` (secondary), ivory background, near-black ink.
- Typeface: Tajawal.
- App store creatives use green gradients + thin gold arcs + gold-framed iPhones → adopted as the site's visual motif.

### Real product assets found
| Asset | Source | Used as |
| --- | --- | --- |
| Home screen | App Store screenshot 02 (also old blob `Iphone 14`) | `public/app/screen-home.webp` |
| Choose lawyer | App Store screenshot 03 (also old blob `Iphone 15`) | `public/app/screen-lawyers.webp` |
| Video consultation | App Store screenshot 04 (also old blob `Iphone 16`) | `public/app/screen-video.webp` |
| Account / wallet | App Store screenshot 01 | `public/app/screen-account.webp` |
| Splash | App Store screenshot 05 | `public/app/screen-splash.webp` |
| Privacy onboarding | App Store screenshot 06 | `public/app/screen-privacy.webp` |
| App icon | App Store artwork (1024px) | favicon, apple icon, manifest, OG |

Screens were cropped out of the official store creatives at native resolution (798×1740 / 762×1661) and are rendered inside a CSS iPhone frame, so every phone on the site shows a real screen.

### Real product facts (source of truth for copy)
- Store listing (App Store + Google Play, identical): the app lets lawyers receive case requests from clients, review details, accept suitable cases, communicate with the client, and manage cases.
- Client terms: instant, written or scheduled consultations; payments only inside the app; rating after consultation; disputes reviewed by platform administration.
- Lawyer terms: valid practising licence required; lawyer is visible to clients only after admin approval; account suspended if the licence expires.
- Refund policy: >2h before scheduled consultation → full refund to wallet; <2h → platform fee deducted; instant consultation not accepted within 2 minutes → full refund; lawyer not joining within 5 minutes → refund.
- Privacy policy: chats, attachments, voice notes, appointments, ratings; confidentiality of consultations.
- App UI: years of experience, specialty, consultation price, rating and availability per lawyer; wallet, notifications, help & support.

### Claims removed (not verifiable in any source — need confirmation before re-adding)
- "تطبيق موثوق لأكثر من 10,000 مستخدم", "+10,000 مستخدم"
- Rating "4.9" and "+2,500 تقييم" (App Store shows 0 ratings; app released 2026-09-27)
- "+1500 قضية ناجحة", "+200 عميل راضٍ", "15 سنة خبرة"
- "شركاؤنا في النجاح": وزارة العدل، هيئة المحامين، الغرفة التجارية، منصة ناجز
- "مكالمات مشفرة", "تسجيل الجلسات", "دعم على مدار الساعة"
- "مرخص من وزارة العدل بالمملكة العربية السعودية" (firm-level licence statement — replaced with the verifiable lawyer-licence rule from the terms)
- FAQ "إلغاء قبل 24 ساعة" → contradicted the official refund policy (2 hours); corrected.
- Fake UI overlays in the old hero ("تم الحجز بنجاح" card, star rating card).

### Issues found
- Favicons were v0 placeholders (not Rasikh).
- `generator: v0.app` metadata, no canonical/OG image/sitemap/robots/structured data.
- Header "تحميل التطبيق" and store buttons had no links.
- Remote images (Vercel Blob) for critical visuals.
- `overflow-hidden` wrappers everywhere (would break sticky storytelling).

## 2. Design system
- **Color tokens** (`app/globals.css`): `--gold`, `--gold-deep` (AA text on light), `--gold-soft`, `--gold-wash`, `--green`, `--green-deep`, `--green-mid`, `--olive`, `--ivory`, `--ink`. Existing shadcn tokens kept and mapped to the brand.
- **Type scale**: Tajawal 400/500/700/800. Display `clamp()` sizes; Arabic line-heights 1.25–1.35 for headings, 1.9 for body.
- **Spacing**: section rhythm `py-24 md:py-32`; heading → paragraph 20–24px; paragraph → CTA 32–40px.
- **Radius**: pills for nav/buttons, 28–40px for panels, device radius derived from width.
- **Shadows**: `shadow-float` (header), `shadow-device` (phones), `shadow-panel`.
- **Buttons**: primary (green), gold, ghost/link; custom Arabic App Store / Google Play badges (dark + light variants).
- **Motion tokens** (`lib/motion.ts`): `easeOutExpo`, `easeInOutQuart`; durations 0.5–0.9s; line-mask reveal; all scroll motion respects `prefers-reduced-motion`.

## 3. Homepage flow
```
HEADER (floating white pill, active-section indicator)
HERO (green; mask-reveal headline; 3 real phones layered + scroll parallax; store badges; WhatsApp link)
WHY RASIKH (scroll-revealed editorial statement + 3 pillars)
APP EXPERIENCE (sticky storytelling: 5 steps, one phone, screens change with scroll; mobile = snap carousel)
LEGAL SERVICES (large interactive list + sticky visual panel; mobile = expandable list)
VIDEO CONSULTATION (green; phone mask reveal; 4 annotated real facts)
HOW IT WORKS (desktop pinned horizontal track: 3 steps with real screens; mobile vertical)
FOR LAWYERS (store description; request → review → accept → communicate)
TRUST (privacy onboarding screen + verified policy facts + policy links)
FAQ (minimal Radix accordion, corrected answers)
DOWNLOAD (green block, badges, WhatsApp)
FOOTER
```

## 4. Internal pages
- `/contact`: compact hero, three direct channels (WhatsApp, phone, email), existing form restyled.
- `/policies`: editorial index (rows, not cards).
- `/policies/[category]/[slug]`: reading layout, sticky TOC (desktop), progress bar desktop-only.

## 5. SEO / Performance / A11y
- `metadataBase`, title template, canonical, OG/Twitter image (`/og.png`), `apple-itunes-app` smart banner, manifest, `sitemap.ts`, `robots.ts`, JSON-LD (LegalService, MobileApplication, FAQPage).
- Local optimized images via `next/image` with `sizes`; hero priority only.
- Transform/opacity-only animations; no new dependencies.
- Skip link, focus-visible rings, semantic landmarks, accessible accordion/tabs, labelled store links, reduced motion.

## 6. Changes requested during the build
- Mobile header: the pill shows only the logo + «القائمة»; «حمّل التطبيق» moved into a full-height drawer (links + download card with both store badges + WhatsApp).
- WhatsApp float: desktop = green pill with label, pulse ring and a once-per-session greeting bubble; phones = compact 52px icon only (no label, no bubble). Hidden over the download block and footer.
- Hero: «أو تواصل معنا عبر واتساب» removed on all sizes; on phones the eyebrow and «حمّل تطبيق راسخ» label are hidden and the paragraph is shortened.
- Hero entrance runs in pure CSS so the hero is fully visible before (and without) JavaScript.

## 7. QA
`npm run build`, route checks, console errors, responsive at 1440 / 1280 / 768 / 390 / 360, no horizontal overflow.
