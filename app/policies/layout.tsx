import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"

export default function PoliciesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-ivory">
        {children}
      </main>
      <Footer />
    </>
  )
}
