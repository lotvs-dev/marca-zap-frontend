import { createFileRoute } from '@tanstack/react-router'

import { Hero } from '@/components/landing/Hero'
import { ProblemSection } from '@/components/landing/ProblemSection'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { ValueProposition } from '@/components/landing/ValueProposition'
import { SocialProof } from '@/components/landing/SocialProof'
import { Testimonials } from '@/components/landing/Testimonials'
import { FinalCTA } from '@/components/landing/FinalCTA'
import { Footer } from '@/components/landing/Footer'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <ValueProposition />
      <SocialProof />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  )
}
