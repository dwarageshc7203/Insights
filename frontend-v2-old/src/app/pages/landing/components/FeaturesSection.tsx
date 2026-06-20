import { Layers, GitBranch, Layout, Brain } from 'lucide-react'
import type { ReactNode } from 'react'

const GRID_ICON_1 = (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden>
    <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)
const GRID_ICON_2 = (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden>
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 4v4l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)
const GRID_ICON_3 = (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden>
    <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const GRID_ICON_4 = (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden>
    <circle cx="5" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="11" cy="4" r="2" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="11" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7 7l2.5-2M7 9l2.5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

type Feature = { icon: ReactNode; title: string; desc: string; tag?: string }

const PRIMARY: Feature[] = [
  { icon: <Layers size={16} />, title: 'Infinite Canvas', desc: 'No boundaries, no page limits. Pan and zoom across a boundless workspace without losing context or performance.' },
  { icon: <GitBranch size={16} />, title: 'Relationship Mapping', desc: 'Draw typed connections between any two nodes and surface hidden patterns across your entire knowledge graph.' },
  { icon: <Layout size={16} />, title: 'Project Planning', desc: 'From raw idea to executed sprint — strategy, roadmaps, and task tracking in one unified visual space.' },
  { icon: <Brain size={16} />, title: 'AI-Powered Insights', desc: 'Summarize canvases, find missing connections, and generate structured plans from unstructured thinking.', tag: 'Soon' },
]

const SECONDARY: Feature[] = [
  { icon: GRID_ICON_1, title: 'Multi-board Workspaces', desc: 'Organize canvases into shared workspaces. Keep personal projects separate from team work without context switching.' },
  { icon: GRID_ICON_2, title: 'Version History', desc: 'Every change is recorded. Rewind to any previous state of your canvas with a single click — no data is ever lost.' },
  { icon: GRID_ICON_3, title: 'Smart Export', desc: 'Export your canvases as PDF, PNG, or structured markdown. Share a live read-only link or embed in Notion.' },
  { icon: GRID_ICON_4, title: 'Real-time Collaboration', desc: 'See teammates\' cursors live. Edit together without conflicts, leave comments on any node, and resolve inline.' },
]

function FeatureCard({ f, dim }: { f: Feature; dim?: boolean }) {
  return (
    <div
      className={`group rounded-2xl border bg-white p-6 flex flex-col gap-4 ${
        dim
          ? 'border-[#EAEAEA] opacity-65'
          : 'border-[#EAEAEA] hover:border-[#22C55E]/40 hover:shadow-sm transition-colors duration-200'
      }`}
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
          dim
            ? 'bg-[#F5F5F5] text-[#CCC]'
            : 'bg-[#F5F5F5] text-[#666] group-hover:bg-[#F0FDF4] group-hover:text-[#22C55E] transition-colors'
        }`}
      >
        {f.icon}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-sm font-semibold text-[#111]">{f.title}</h3>
          {f.tag && (
            <span className="text-[9px] font-semibold text-[#999] bg-[#F5F5F5] px-2 py-0.5 rounded-full uppercase tracking-wider">
              {f.tag}
            </span>
          )}
        </div>
        <p className="text-xs text-[#666] leading-relaxed">{f.desc}</p>
      </div>
    </div>
  )
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="bg-[#FAFAFA] border-y border-[#EAEAEA]"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      aria-label="Features"
    >
      <div className="max-w-6xl mx-auto px-6 w-full py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#999] uppercase mb-4">
              Features
            </div>
            <h2 className="text-4xl font-semibold text-[#111] tracking-tight text-balance max-w-sm">
              Built for how you actually think.
            </h2>
          </div>
          <p className="text-[#666] text-sm leading-relaxed max-w-xs lg:text-right">
            Every tool you need to externalize, connect, and act on your thinking — in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {PRIMARY.map((f) => <FeatureCard key={f.title} f={f} dim={!!f.tag} />)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SECONDARY.map((f) => <FeatureCard key={f.title} f={f} />)}
        </div>
      </div>
    </section>
  )
}
