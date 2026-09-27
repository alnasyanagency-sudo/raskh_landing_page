import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { WhatsappFloat } from "@/components/site/whatsapp-float"
import { Hero } from "@/components/home/hero"
import { WhyRasikh } from "@/components/home/why-rasikh"
import { AppExperience } from "@/components/home/app-experience"
import { Services } from "@/components/home/services"
import { VideoConsultation } from "@/components/home/video-consultation"
import { HowItWorks } from "@/components/home/how-it-works"
import { ForLawyers } from "@/components/home/for-lawyers"
import { Trust } from "@/components/home/trust"
import { FAQ } from "@/components/home/faq"
import { DownloadCTA } from "@/components/home/download-cta"
import { FAQS } from "@/lib/content"
import { CONTACT, SITE, STORES } from "@/lib/site"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      alternateName: ["راسخ", "Rasikh", SITE.nameEn],
      url: SITE.url,
      logo: `${SITE.url}/brand/rasikh-logo.png`,
      image: `${SITE.url}/og.png`,
      description: SITE.description,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      address: { "@type": "PostalAddress", addressLocality: "الرياض", addressCountry: "SA" },
      areaServed: { "@type": "Country", name: "المملكة العربية السعودية" },
      sameAs: [STORES.appStore, STORES.googlePlay],
    },
    {
      "@type": "MobileApplication",
      name: STORES.appName,
      operatingSystem: "iOS, Android",
      applicationCategory: "BusinessApplication",
      inLanguage: "ar",
      downloadUrl: [STORES.appStore, STORES.googlePlay],
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: "ar",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <WhyRasikh />
        <AppExperience />
        <Services />
        <VideoConsultation />
        <HowItWorks />
        <ForLawyers />
        <Trust />
        <FAQ />
        <DownloadCTA />
      </main>
      <Footer />
      <WhatsappFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
    </>
  )
}
