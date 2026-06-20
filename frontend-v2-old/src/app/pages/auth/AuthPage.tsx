import { motion } from 'motion/react'
import { Link, Navigate } from 'react-router'
import { useState } from 'react'
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback'
import InsightsLogo from '@/app/components/ui/InsightsLogo'
import brainImage from '@/imports/brain.png'
import { useAuth } from '../../hooks/useAuth'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

const RAW_THOUGHTS = ['Redesign onboarding', 'Improve search', 'Fix navigation', 'Improve onboarding']
const STRUCTURED_PLAN = ['Product Experience', 'User Flows', 'Execution Plan', 'Release Strategy']

function IllustrationPanel() {
  return (
    <div className="relative w-full h-full bg-[#F97316] flex items-center justify-center overflow-hidden min-h-[52vh] md:min-h-screen">
      {/* White foreground layer */}
      <div className="absolute inset-6 md:inset-10 bg-white rounded-3xl shadow-xl" />

      {/*
        SVG arrow paths.

        Coordinate system: viewBox="0 0 100 100" + preserveAspectRatio="none"
        makes every SVG unit = 1% of the panel. This matches CSS top/left percentages
        exactly, ensuring paths touch the card edges and brain image.

        Arrow 1: Card 1 bottom edge (26, 29) → Brain top edge (38, 40) — the ╲ path
        Arrow 2: Card 2 top edge  (74, 71) → Brain bottom edge (62, 60) — the ╱ path

        Z-stack: cards (z-20) < SVG (z-25) < brain (z-30)
        The brain image covers the arrowheads, communicating thoughts flowing into the brain.
      */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 25 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          {/*
            markerUnits="userSpaceOnUse" with width/height calibrated for non-square scaling.
            At ~640×900 panel: 1 unit ≈ 6.4px wide × 9.0px tall.
            markerWidth="1.4" × 6.4 ≈ 9px   markerHeight="0.85" × 9 ≈ 7.6px → ~8px arrowhead.
          */}
          <marker
            id="auth-arrow"
            markerWidth="1.4"
            markerHeight="0.85"
            refX="1.1"
            refY="0.42"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M0 0.06 L1.1 0.42 L0 0.79 Z" fill="#94A3B8" />
          </marker>
        </defs>

        {/* Arrow 1: bottom of Card 1 (top-left) → top of Brain — the ╲ descent */}
        <motion.path
          d="M 26 29 C 26 33, 34 39, 38 40"
          stroke="#94A3B8"
          strokeWidth="0.28"
          fill="none"
          strokeLinecap="round"
          markerEnd="url(#auth-arrow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65, ease: 'easeInOut' }}
        />

        {/* Arrow 2: top of Card 2 (bottom-right) → bottom of Brain — the ╱ ascent */}
        <motion.path
          d="M 74 71 C 74 66, 66 61, 62 60"
          stroke="#94A3B8"
          strokeWidth="0.28"
          fill="none"
          strokeLinecap="round"
          markerEnd="url(#auth-arrow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.82, ease: 'easeInOut' }}
        />
      </svg>

      {/* Card 1 — Raw Thoughts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="absolute bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-5"
        style={{ top: '13%', left: '7%', width: 196, zIndex: 20 }}
      >
        <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">
          Raw Thoughts
        </p>
        <ul className="space-y-2">
          {RAW_THOUGHTS.map((t) => (
            <li key={t} className="text-[12px] text-[#374151] leading-snug">{t}</li>
          ))}
        </ul>
      </motion.div>

      {/* Card 2 — Structured Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.42 }}
        className="absolute bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-5"
        style={{ bottom: '13%', right: '6%', width: 196, zIndex: 20 }}
      >
        <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-3">
          Structured Plan
        </p>
        <ul className="space-y-2">
          {STRUCTURED_PLAN.map((t) => (
            <li key={t} className="text-[12px] text-[#374151] leading-snug">{t}</li>
          ))}
        </ul>
      </motion.div>

      {/* Brain — z-30 so it sits above arrows, naturally covering the arrowheads */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center"
        style={{ width: '50%', maxWidth: 230, zIndex: 30 }}
      >
        <ImageWithFallback
          src={brainImage}
          alt="Engraving-style black and white brain illustration representing thoughts becoming structure"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Concept label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.95 }}
        className="absolute bottom-10 md:bottom-14 left-0 right-0 flex items-center justify-center gap-2"
        style={{ zIndex: 30 }}
      >
        {['Thoughts', 'Structure', 'Plan'].map((step, i) => (
          <span key={step} className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white/60">{step}</span>
            {i < 2 && <span className="text-white/30 text-sm" aria-hidden>→</span>}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function AuthPage() {
  const { user, signInWithGoogle } = useAuth()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  if (user) {
    return <Navigate to="/workspace" replace />
  }

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true)
      await signInWithGoogle()
    } catch (error) {
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="md:w-1/2">
        <IllustrationPanel />
      </div>

      <div className="md:w-1/2 bg-white flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <Link to="/" className="inline-flex items-center gap-2 mb-12">
              <InsightsLogo size={24} />
              <span className="text-sm font-semibold text-[#111]">Insights</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
          >
            <h1
              className="text-[2rem] tracking-tight text-[#111] mb-3 leading-tight"
              style={{ fontWeight: 700 }}
            >
              Welcome to<br />Insights
            </h1>
            <p className="text-[#666] text-base leading-relaxed mb-10">
              Turn scattered thoughts into structured plans.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
          >
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="btn-shine w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-[#EAEAEA] rounded-2xl text-sm font-medium text-[#111] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] transition-all duration-200 hover:-translate-y-px shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Continue with Google"
            >
              <GoogleIcon />
              {isLoggingIn ? 'Signing in...' : 'Continue with Google'}
            </button>
            <p className="text-xs text-[#999] text-center mt-5">
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.38 }}
            className="mt-12 p-5 bg-amber-50 border border-amber-100 rounded-2xl relative"
            role="note"
          >
            <div className="absolute -top-2.5 left-5">
              <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 uppercase tracking-wide border border-amber-100 rounded-full">
                Dev Note
              </span>
            </div>
            <p className="text-sm text-amber-900/80 leading-relaxed">
              Hey! Hi and greetings to you!
              <br /><br />
              Your presence here is extremely valued!
              <br /><br />
              Thanks for using my project and I hope it makes your work easier!
            </p>
            <p className="text-sm font-semibold text-amber-900 mt-4">— Dwaragesh C</p>
            <p className="text-xs text-amber-600">Dev</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
