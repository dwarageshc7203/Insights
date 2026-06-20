import { ArrowRight } from 'lucide-react'

type NodeProps = {
  x: number; y: number; w: number; h: number
  title: string; sub: string
  accent?: string
  dark?: boolean
}

function CanvasNode({ x, y, w, h, title, sub, accent, dark }: NodeProps) {
  if (dark) {
    return (
      <g filter="url(#cshadow)">
        <rect x={x} y={y} width={w} height={h} rx="12" fill="#111" />
        <text x={x + 18} y={y + 24} fontFamily="Inter" fontSize="11" fontWeight="600" fill="white">{title}</text>
        <text x={x + 18} y={y + 43} fontFamily="Inter" fontSize="9.5" fill="rgba(255,255,255,0.5)">{sub}</text>
      </g>
    )
  }
  return (
    <g filter="url(#cshadow)">
      <rect x={x} y={y} width={w} height={h} rx="12" fill="white" stroke={accent ?? '#EAEAEA'} strokeWidth={accent ? 1.5 : 1} />
      {accent && <rect x={x} y={y} width={5} height={h} rx="2.5" fill={accent} />}
      <text x={x + (accent ? 19 : 18)} y={y + 26} fontFamily="Inter" fontSize="11" fontWeight="600" fill={accent ?? '#111'}>{title}</text>
      <text x={x + (accent ? 19 : 18)} y={y + 44} fontFamily="Inter" fontSize="9.5" fill="#999">{sub}</text>
    </g>
  )
}

type LineProps = { x1: number; y1: number; x2: number; y2: number; green?: boolean }

function Edge({ x1, y1, x2, y2, green }: LineProps) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={green ? '#22C55E' : '#CACAD4'}
      strokeWidth="1.2"
      strokeDasharray={green ? '4 3' : undefined}
      markerEnd={green ? 'url(#arr-g)' : 'url(#arr)'}
    />
  )
}

export default function DemoCanvas() {
  return (
    <div className="relative rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] overflow-hidden" style={{ height: 480 }}>
      {/* Dot grid */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden>
        <defs>
          <pattern id="demogrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#D1D5DB" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#demogrid)" />
      </svg>

      {/* Canvas content */}
      <svg viewBox="0 0 900 480" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-label="Canvas preview with connected nodes">
        <defs>
          <marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#CACAD4" />
          </marker>
          <marker id="arr-g" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#22C55E" />
          </marker>
          <filter id="cshadow">
            <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#00000008" />
          </filter>
        </defs>

        {/* Edges */}
        <Edge x1={175} y1={95} x2={330} y2={95} />
        <Edge x1={175} y1={112} x2={100} y2={195} green />
        <Edge x1={408} y1={112} x2={408} y2={190} />
        <Edge x1={486} y1={112} x2={572} y2={190} />
        <Edge x1={486} y1={258} x2={486} y2={322} />
        <Edge x1={408} y1={328} x2={510} y2={366} green />
        <Edge x1={630} y1={258} x2={672} y2={322} />
        <Edge x1={796} y1={100} x2={796} y2={172} />

        {/* Nodes */}
        <CanvasNode x={55}  y={62}  w={170} h={66} title="Product Vision"    sub="Q3 2024 · Active"        accent="#22C55E" />
        <CanvasNode x={330} y={62}  w={158} h={66} title="Feature Planning"  sub="8 items mapped" />
        <CanvasNode x={36}  y={195} w={148} h={62} title="Research Notes"    sub="User interviews · 12" />
        <CanvasNode x={330} y={195} w={148} h={62} title="Key Insights"      sub="7 patterns found" />
        <CanvasNode x={542} y={195} w={148} h={62} title="Competitive Intel" sub="14 competitors" />
        <CanvasNode x={718} y={172} w={156} h={62} title="Architecture"      sub="System design map" />
        <CanvasNode x={652} y={322} w={148} h={62} title="Go-to-Market"      sub="Launch · Aug 2024" />
        <CanvasNode x={514} y={394} w={148} h={60} title="Growth Strategy"   sub="3 channels · Active" dark />

        {/* Sprint Backlog with progress */}
        <g filter="url(#cshadow)">
          <rect x={408} y={322} width={156} height={62} rx="12" fill="white" stroke="#EAEAEA" />
          <text x={426} y={346} fontFamily="Inter" fontSize="11" fontWeight="600" fill="#111">Sprint Backlog</text>
          <rect x={426} y={356} width={96} height={3} rx="1.5" fill="#EAEAEA" />
          <rect x={426} y={356} width={62} height={3} rx="1.5" fill="#22C55E" />
          <text x={426} y={375} fontFamily="Inter" fontSize="9" fill="#999">65% · 12 tasks</text>
        </g>

        {/* Zoom indicator */}
        <g>
          <rect x={364} y={438} width={172} height={30} rx="9" fill="white" stroke="#EAEAEA" strokeWidth="1" />
          <text x={396} y={457} fontFamily="Inter" fontSize="9" fill="#999">100%</text>
          <text x={432} y={457} fontFamily="Inter" fontSize="10" fill="#CACAD4">∞</text>
        </g>

        {/* AI Summary pill */}
        <g>
          <rect x={774} y={432} width={112} height={32} rx="16" fill="#111" />
          <circle cx={793} cy={448} r={5} fill="#22C55E" />
          <text x={804} y={452} fontFamily="Inter" fontSize="10" fontWeight="500" fill="white">AI Summary</text>
        </g>
      </svg>

      {/* Demo button overlay */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-white/90 border border-[#EAEAEA] backdrop-blur-sm rounded-xl px-3.5 py-2 shadow-sm">
        <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center shrink-0" aria-hidden>
          <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[7px] border-l-white ml-0.5" />
        </div>
        <span className="text-xs font-medium text-[#111]">Watch 2-min demo</span>
        <ArrowRight size={11} className="text-[#666]" aria-hidden />
      </div>
    </div>
  )
}
