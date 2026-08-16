import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"

export default function PoliciesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background" role="main">
        {children}
      </main>
      <Footer />
    </>
  )
}