import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/landing/Hero'
import { ValueProposition } from '@/components/landing/ValueProposition'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { SocialProof } from '@/components/landing/SocialProof'
import { FinalCTA } from '@/components/landing/FinalCTA'
import { Footer } from '@/components/landing/Footer'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ValueProposition />
      <HowItWorks />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  )
}
