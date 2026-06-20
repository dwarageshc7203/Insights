import { motion } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

type Props = {
  heroScale: MotionValue<number>
  heroBorderRadius: MotionValue<number>
  textOpacity: MotionValue<number>
  textY: MotionValue<number>
}

export default function HeroSection({ heroScale, heroBorderRadius, textOpacity, textY }: Props) {
  return (
    <motion.div
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        scale: heroScale,
        borderRadius: heroBorderRadius,
        willChange: 'transform',
        backgroundColor: '#ffffff',
      }}
      aria-label="Hero"
    >
      {/* Faint green radial wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 48% at 50% 42%, rgba(34,197,94,0.04) 0%, transparent 65%)',
        }}
        aria-hidden
      />

      {/* Typography — fades out at 50% scroll, drifts upward */}
      <motion.div
        style={{
          opacity: textOpacity,
          y: textY,
          willChange: 'transform',
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <h1 className="tracking-tight mb-8 text-balance" style={{ lineHeight: 1.04 }}>
          <span
            className="block text-[clamp(2.5rem,6.5vw,5.25rem)] text-[#111]"
            style={{ fontWeight: 900 }}
          >
            Transform raw thoughts
          </span>
          <span className="block" style={{ lineHeight: 1.14 }}>
            <span
              className="text-[clamp(2.5rem,6.5vw,5.25rem)] text-[#111]"
              style={{ fontWeight: 900 }}
            >
              into{' '}
            </span>
            <span
              className="text-[clamp(2.7rem,7vw,5.6rem)]"
              style={{
                fontFamily: "'Satisfy', cursive",
                color: '#22C55E',
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              plans.
            </span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[#666] leading-relaxed max-w-xl mx-auto mb-12 font-light text-balance">
          Visualize ideas, map relationships, organize projects, and build clarity on an infinite
          canvas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/auth"
            className="btn-shine inline-flex items-center gap-2 text-base font-medium rounded-xl px-7 py-3.5 bg-[#111] text-white hover:bg-[#1E3A8A] transition-colors duration-200 hover:-translate-y-px hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started Free <ArrowRight size={16} aria-hidden />
          </Link>
          <Link
            to="/auth"
            className="btn-shine inline-flex items-center gap-2 text-base font-medium rounded-xl px-7 py-3.5 border border-[#EAEAEA] text-[#111] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] transition-colors duration-200 hover:-translate-y-px hover:scale-[1.02] active:scale-[0.98]"
          >
            <div
              className="w-5 h-5 rounded-full bg-[#111] flex items-center justify-center shrink-0"
              aria-hidden
            >
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[7px] border-l-white ml-0.5" />
            </div>
            Watch Demo
          </Link>
        </div>

        <p className="text-xs text-[#CACAD4] mt-8">
          No credit card required. Free forever on the Free plan.
        </p>
      </motion.div>
    </motion.div>
  )
}
