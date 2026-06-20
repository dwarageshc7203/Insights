const SIDEBAR_WORKSPACES = ['Product Design', 'Engineering', 'Marketing']
const SIDEBAR_CANVASES = ['Wireframes', 'User Flows', 'Brand Kit']
const TABS = ['Wireframes', 'User Flows']

const NODES = [
  { x: 40, y: 28, label: 'Login Screen', color: 'bg-violet-50 border-violet-200' },
  { x: 260, y: 28, label: 'Dashboard', color: 'bg-sky-50 border-sky-200' },
  { x: 150, y: 140, label: 'Onboarding', color: 'bg-emerald-50 border-emerald-200' },
]

export default function ProductMockup() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-black/[0.09] shadow-[0_32px_64px_rgba(0,0,0,0.12)] overflow-hidden bg-white">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F5F5F5] border-b border-black/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 mx-3">
          <div className="h-5 bg-white rounded-md border border-black/[0.06] flex items-center justify-center max-w-xs mx-auto">
            <span className="text-[10px] text-neutral-400">insights.app/workspace</span>
          </div>
        </div>
      </div>

      {/* App */}
      <div className="flex" style={{ height: '56vh', minHeight: 320 }}>
        {/* Sidebar */}
        <div className="w-44 bg-[#18181B] flex-shrink-0 p-2.5 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 px-1.5 py-1.5 mb-1.5">
            <div className="w-3.5 h-3.5 rounded-[3px] bg-white/20" />
            <span className="text-white text-[11px] font-semibold">Insights</span>
          </div>
          <div className="px-1.5 py-1 rounded-md bg-white/[0.05] flex items-center gap-1.5 mb-0.5">
            <div className="w-2 h-2 rounded-full border border-white/20" />
            <span className="text-white/30 text-[10px]">Search...</span>
          </div>
          {SIDEBAR_WORKSPACES.map((ws, i) => (
            <div key={ws}>
              <div className={`px-1.5 py-1 rounded-md flex items-center gap-1.5 ${i === 0 ? 'bg-white/10' : ''}`}>
                <div className="w-2.5 h-2.5 rounded-sm bg-white/20 flex-shrink-0" />
                <span className={`text-[10px] ${i === 0 ? 'text-white font-medium' : 'text-white/40'}`}>{ws}</span>
              </div>
              {i === 0 && (
                <div className="pl-4 mt-0.5 flex flex-col gap-0.5">
                  {SIDEBAR_CANVASES.map((c, j) => (
                    <div key={c} className={`px-1.5 py-0.5 rounded flex items-center gap-1.5 ${j === 0 ? 'bg-green-500/15' : ''}`}>
                      <div className="w-1.5 h-1.5 rounded-sm bg-white/20 flex-shrink-0" />
                      <span className={`text-[9px] ${j === 0 ? 'text-green-400' : 'text-white/30'}`}>{c}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center gap-0 px-2 pt-1.5 bg-[#FAFAFA] border-b border-black/[0.06]">
            {TABS.map((tab, i) => (
              <div key={tab} className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] rounded-t-md ${i === 0 ? 'bg-white border border-b-white border-black/[0.06] text-neutral-700' : 'text-neutral-400'}`}>
                <div className={`w-3.5 h-3.5 rounded-[3px] flex items-center justify-center text-[8px] font-bold ${i === 0 ? 'bg-violet-100 text-violet-600' : 'bg-neutral-100 text-neutral-400'}`}>
                  {tab[0]}
                </div>
                {tab}
              </div>
            ))}
          </div>
          <div className="flex-1 canvas-grid relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker id="pm-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
                  <polygon points="0 0, 6 2.5, 0 5" fill="#CBD5E1" />
                </marker>
              </defs>
              <path d="M 180 52 C 210 52, 220 52, 260 52" stroke="#CBD5E1" strokeWidth="1.5" fill="none" markerEnd="url(#pm-arrow)" />
              <path d="M 220 80 C 220 100, 190 110, 190 140" stroke="#CBD5E1" strokeWidth="1.5" fill="none" markerEnd="url(#pm-arrow)" />
            </svg>
            {NODES.map((node) => (
              <div
                key={node.label}
                className={`absolute rounded-lg border p-2 w-[120px] bg-white shadow-sm ${node.color}`}
                style={{ left: node.x, top: node.y }}
              >
                <div className="text-[9px] font-semibold text-neutral-800">{node.label}</div>
                <div className="mt-1 space-y-0.5">
                  <div className="h-1 rounded bg-neutral-100 w-full" />
                  <div className="h-1 rounded bg-neutral-100 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
