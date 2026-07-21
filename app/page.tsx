import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Trust } from "@/components/sections/trust"
import { Services } from "@/components/sections/services"
import { ProductShowcase } from "@/components/sections/product-showcase"
import { HowItWorks } from "@/components/sections/how-it-works"
import { FAQ } from "@/components/sections/faq"
import { WhatsappCTA } from "@/components/sections/whatsapp-cta"
import { FinalCTA } from "@/components/sections/final-cta"
import { Footer } from "@/components/sections/footer"
import { WhatsappFloat } from "@/components/whatsapp-float"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <Hero />
      <Trust />
      <Services />
      <ProductShowcase />
      <HowItWorks />
      <FAQ />
      <WhatsappCTA />
      <FinalCTA />
      <Footer />
      <WhatsappFloat />
    </main>
  )
}
