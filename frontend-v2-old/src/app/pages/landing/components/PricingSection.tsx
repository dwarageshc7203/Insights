import { useState } from 'react'
import { Check } from 'lucide-react'
import { useNavigate } from 'react-router'

type Plan = {
  name: string
  price: { monthly: number; annual: number }
  desc: string
  cta: string
  isPrimary: boolean
  badge?: string
  features: string[]
}

const PLANS: Plan[] = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    desc: 'For individuals getting started',
    cta: 'Get Started',
    isPrimary: false,
    features: ['Up to 5 canvases', '100 nodes per canvas', 'Basic connections', 'Export to PDF'],
  },
  {
    name: 'Pro',
    price: { monthly: 18, annual: 12 },
    desc: 'For serious thinkers and makers',
    cta: 'Start Free Trial',
    isPrimary: true,
    badge: 'Most Popular',
    features: [
      'Unlimited canvases',
      'Unlimited nodes',
      'AI connections',
      'Version history',
      'Priority support',
      'Advanced export',
    ],
  },
  {
    name: 'Team',
    price: { monthly: 32, annual: 22 },
    desc: 'For collaborative teams',
    cta: 'Contact Sales',
    isPrimary: false,
    features: [
      'Everything in Pro',
      'Unlimited members',
      'Real-time collaboration',
      'SSO / SAML',
      'Audit logs',
      'Dedicated CSM',
    ],
  },
]

export default function PricingSection() {
  const [annual, setAnnual] = useState(true)
  const navigate = useNavigate()

  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center px-6 py-20"
      style={{ minHeight: '100vh' }}
      aria-label="Pricing"
    >
      <div className="w-full max-w-5xl">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold tracking-widest text-[#999] uppercase mb-5">
            Pricing
          </div>
          <h2 className="text-4xl font-semibold text-[#111] tracking-tight mb-4">
            Simple, honest pricing.
          </h2>
          <p className="text-[#666] text-base">Start free. Upgrade when you need to.</p>
        </div>

        {/* Annual / Monthly toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm font-medium ${!annual ? 'text-[#111]' : 'text-[#999]'}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual((v) => !v)}
            className="relative rounded-full transition-colors duration-200 cursor-pointer"
            style={{ background: annual ? '#111' : '#EAEAEA', height: '22px', width: '40px' }}
            aria-label={annual ? 'Switch to monthly billing' : 'Switch to annual billing'}
            aria-pressed={annual}
          >
            <div
              className="absolute top-0.5 rounded-full bg-white shadow-sm transition-transform duration-200"
              style={{
                width: '18px',
                height: '18px',
                transform: annual ? 'translateX(20px)' : 'translateX(2px)',
              }}
            />
          </button>
          <span className={`text-sm font-medium ${annual ? 'text-[#111]' : 'text-[#999]'}`}>
            Annual <span className="text-[#22C55E] text-xs font-semibold">–33%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 flex flex-col transition-colors duration-200 ${
                plan.badge
                  ? 'border-[#111] shadow-[0_0_0_1px_#111]'
                  : 'border-[#EAEAEA] hover:border-[#ccc]'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111] text-white text-[10px] font-semibold px-3 py-1 rounded-full tracking-wide">
                  {plan.badge}
                </div>
              )}
              <div className="mb-7">
                <div className="text-xs font-semibold text-[#999] mb-2 tracking-widest uppercase">
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-semibold text-[#111] tracking-tight">
                    {plan.price[annual ? 'annual' : 'monthly'] === 0
                      ? 'Free'
                      : `$${plan.price[annual ? 'annual' : 'monthly']}`}
                  </span>
                  {plan.price[annual ? 'annual' : 'monthly'] !== 0 && (
                    <span className="text-[#999] text-sm">/mo</span>
                  )}
                </div>
                <p className="text-sm text-[#666]">{plan.desc}</p>
              </div>

              <button
                onClick={() => navigate('/auth')}
                className={`btn-shine w-full mb-8 inline-flex items-center justify-center gap-2 text-sm font-medium rounded-xl px-5 py-2.5 transition-all duration-200 hover:-translate-y-px hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                  plan.isPrimary
                    ? 'bg-[#111] text-white hover:bg-[#1E3A8A]'
                    : 'border border-[#EAEAEA] text-[#111] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A]'
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-3" aria-label={`${plan.name} plan features`}>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#444]">
                    <Check size={13} className="mt-0.5 shrink-0 text-[#22C55E]" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
