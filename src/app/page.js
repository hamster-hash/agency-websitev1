// app/page.jsx
// ============================================================
// HOME PAGE — assembles all sections in order
//
// SECTION ORDER (change order here to reorder the page):
//   1. HeroSection        — emotional hook + spotlight
//   2. DiagnosisSection   — horizontal scroll pain points
//   3. HowIHelpSection    — pinned phase reveal
//   4. PhilosophySection  — quote + marquee ticker
//   5. PackagesSection    — expandable offer cards
//   6. CTASection         — final call to action
// ============================================================

import HeroSection       from '@/components/sections/HeroSection'
import DiagnosisSection  from '@/components/sections/DiagnosisSection'
import HowIHelpSection   from '@/components/sections/HowIHelpSection'
import PhilosophySection from '@/components/sections/PhilosophySection'
import PackagesSection   from '@/components/sections/PackagesSection'
import TestimonialSection from '@/components/sections/TestimonialSection'
import FAQSection        from '@/components/sections/FAQSection'
import CTASection        from '@/components/sections/CTASection'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <DiagnosisSection />
      <HowIHelpSection />
      <PhilosophySection />
      <PackagesSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </>
  )
}

export default HomePage