import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ArrowRight } from 'lucide-react'
import InsightsLogo from '@/app/components/ui/InsightsLogo'

const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function FloatingNav() {
  const [active, setActive] = useState('Product')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const scrollTo = (href: string, label: string) => {
    setActive(label)
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (!mobileOpen) return
    const close = () => setMobileOpen(false)
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close())
  }, [mobileOpen])

  return (
    <>
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
      >
        <nav
          className="flex items-center gap-0.5 px-2 py-1.5 rounded-2xl border border-[#E5E7EB] bg-white/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
          aria-label="Main navigation"
        >
          <a
            href="#"
            onClick={() => scrollTo('#product', 'Product')}
            className="flex items-center gap-1.5 px-3 py-1.5 mr-1.5"
          >
            <InsightsLogo size={20} />
            <span className="text-xs font-semibold text-[#111] tracking-tight">Insights</span>
          </a>

          <div className="w-px h-4 bg-[#EAEAEA] mx-1" aria-hidden />

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-0.5">
            {NAV_LINKS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href, item.label)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  active === item.label
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-[#666] hover:text-[#111] hover:bg-[#F5F5F5]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:block w-px h-4 bg-[#EAEAEA] mx-1" aria-hidden />

          <button
            onClick={() => navigate('/auth')}
            className="hidden sm:inline-flex btn-shine items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#111] text-white text-xs font-medium hover:bg-[#1E3A8A] transition-colors duration-200 hover:-translate-y-px hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Get Started <ArrowRight size={11} aria-hidden />
          </button>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-1.5 text-[#666] hover:text-[#111] transition-colors cursor-pointer ml-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-4 right-4 z-40 bg-white border border-[#EAEAEA] rounded-2xl shadow-xl p-4 sm:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href, item.label)}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-[#444] hover:bg-[#F5F5F5] hover:text-[#111] rounded-xl transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-[#EAEAEA] my-1" />
              <button
                onClick={() => { setMobileOpen(false); navigate('/auth') }}
                className="btn-shine w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#111] text-white text-sm font-medium rounded-xl hover:bg-[#1E3A8A] transition-colors cursor-pointer"
              >
                Get Started <ArrowRight size={14} aria-hidden />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
