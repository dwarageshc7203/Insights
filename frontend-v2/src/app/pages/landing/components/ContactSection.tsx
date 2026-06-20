import { ArrowRight, Mail, Github } from 'lucide-react'
import { useNavigate } from 'react-router'
import InsightsLogo from '@/app/components/ui/InsightsLogo'

export default function ContactSection() {
  const navigate = useNavigate()

  return (
    <>
      <section
        id="contact"
        className="border-t border-[#EAEAEA] flex flex-col items-center justify-center px-6 py-20"
        style={{ minHeight: '100vh' }}
        aria-label="Contact"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-semibold text-[#111] tracking-tight leading-tight mb-6 text-balance">
            Start building with{' '}
            <span style={{ fontFamily: "'Satisfy', cursive", color: '#22C55E', fontWeight: 400 }}>
              clarity.
            </span>
          </h2>
          <p className="text-[#666] text-lg mb-12 max-w-md mx-auto leading-relaxed">
            Join thousands of thinkers and teams using Insights to turn scattered ideas into
            structured action.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => navigate('/auth')}
              className="btn-shine inline-flex items-center gap-2 text-base font-medium rounded-xl px-8 py-3.5 bg-[#111] text-white hover:bg-[#1E3A8A] transition-colors duration-200 hover:-translate-y-px hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Get Started Free <ArrowRight size={16} aria-hidden />
            </button>
            <a
              href="mailto:hello@insights.app"
              className="btn-shine inline-flex items-center gap-2 text-base font-medium rounded-xl px-8 py-3.5 border border-[#EAEAEA] text-[#111] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] transition-colors duration-200 hover:-translate-y-px hover:scale-[1.02]"
            >
              <Mail size={16} aria-hidden /> Contact Us
            </a>
          </div>

          <div className="flex items-center justify-center gap-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#999] hover:text-[#111] transition-colors"
            >
              <Github size={16} aria-hidden /> Open Source
            </a>
            <div className="w-px h-4 bg-[#EAEAEA]" aria-hidden />
            <a
              href="mailto:hello@insights.app"
              className="flex items-center gap-2 text-sm text-[#999] hover:text-[#111] transition-colors"
            >
              <Mail size={16} aria-hidden /> hello@insights.app
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#EAEAEA]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <InsightsLogo size={20} />
            <span className="text-xs font-semibold text-[#111]">Insights</span>
            <span className="text-xs text-[#CACAD4] ml-2">© 2025 Insights Inc.</span>
          </div>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Status', 'Docs'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-[#CACAD4] hover:text-[#666] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
