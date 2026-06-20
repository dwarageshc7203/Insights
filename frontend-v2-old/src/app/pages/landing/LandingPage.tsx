import { useRef } from 'react'
import { useScroll, useTransform } from 'motion/react'
import FloatingNav from './components/FloatingNav'
import HeroSection from './components/HeroSection'
import ProductPreviewSection from './components/ProductPreviewSection'
import FeaturesSection from './components/FeaturesSection'
import PricingSection from './components/PricingSection'
import ContactSection from './components/ContactSection'
export default function LandingPage() {
  const scrollTrackRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ['start start', 'end end'],
  })

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const heroBorderRadius = useTransform(scrollYProgress, [0, 1], [0, 24])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <div className="bg-white text-[#111] antialiased" style={{ fontFamily: 'Inter, sans-serif' }}>
      <FloatingNav />

      {/* 200vh scroll track — hero locks sticky, text fades, card scales */}
      <div ref={scrollTrackRef} id="product" style={{ height: '200vh', position: 'relative' }}>
        <HeroSection
          heroScale={heroScale}
          heroBorderRadius={heroBorderRadius}
          textOpacity={textOpacity}
          textY={textY}
        />
      </div>

      {/* Reveal section: -50vh overlap creates card-rising-from-below effect */}
      <div style={{ marginTop: '-50vh', zIndex: 20, position: 'relative' }}>
        <div
          className="bg-white rounded-t-[32px]"
          style={{ boxShadow: '0 -32px 80px rgba(0,0,0,0.07), 0 -1px 0 rgba(0,0,0,0.04)' }}
        >
          <ProductPreviewSection />
          <FeaturesSection />
          <PricingSection />
          <ContactSection />
        </div>
      </div>
    </div>
  )
}
