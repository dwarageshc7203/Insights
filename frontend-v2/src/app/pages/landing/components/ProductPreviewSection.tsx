import { Layers, GitBranch, Layout, Brain } from 'lucide-react'
import DemoCanvas from './DemoCanvas'

const FEATURES = [
  {
    icon: <Layers size={16} />,
    title: 'Infinite Canvas',
    desc: 'No boundaries. Build knowledge structures at any scale without losing context.',
  },
  {
    icon: <GitBranch size={16} />,
    title: 'Relationship Mapping',
    desc: 'Draw connections between nodes. Surface hidden patterns across your graph.',
  },
  {
    icon: <Layout size={16} />,
    title: 'Project Planning',
    desc: 'Strategy, roadmaps, and task tracking in one unified visual space.',
  },
  {
    icon: <Brain size={16} />,
    title: 'AI-Powered Insights',
    desc: 'Summarize canvases and generate structured plans from unstructured thinking.',
    soon: true,
  },
]

export default function ProductPreviewSection() {
  return (
    <section
      id="canvas-preview"
      className="flex flex-col justify-center px-6"
      style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '5rem' }}
      aria-label="Product preview"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <div className="text-xs font-semibold tracking-widest text-[#999] uppercase mb-5">
            Canvas Preview
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-4xl font-semibold text-[#111] tracking-tight text-balance">
              Your ideas, finally connected.
            </h2>
            <p className="text-[#666] text-base max-w-xs leading-relaxed lg:text-right">
              An infinite canvas where nodes, relationships, and structure emerge naturally from
              your thinking.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 items-start">
          <DemoCanvas />

          <div className="flex flex-col gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`rounded-2xl border bg-white p-5 flex items-start gap-4 ${
                  f.soon
                    ? 'border-[#EAEAEA] opacity-65'
                    : 'border-[#EAEAEA] hover:border-[#22C55E]/40 hover:shadow-sm transition-colors duration-200'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    f.soon ? 'bg-[#F5F5F5] text-[#CCC]' : 'bg-[#F5F5F5] text-[#666]'
                  }`}
                >
                  {f.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-sm font-semibold text-[#111]">{f.title}</h3>
                    {f.soon && (
                      <span className="text-[9px] font-semibold text-[#999] bg-[#F5F5F5] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#666] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
