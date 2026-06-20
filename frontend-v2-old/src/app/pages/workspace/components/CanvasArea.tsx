import { ZoomIn, ZoomOut, Maximize2, Hand, MousePointer2 } from 'lucide-react'

type CanvasNode = {
  id: string
  x: number
  y: number
  label: string
  sublabel?: string
  accent: string
  tags?: string[]
}

type CanvasConnection = {
  from: [number, number]
  to: [number, number]
  path: string
}

const NODES: CanvasNode[] = []

const NODE_WIDTH = 200
const NODE_HEIGHT = 96

const CONNECTIONS: CanvasConnection[] = []

export default function CanvasArea({ canvasName }: { canvasName: string }) {
  return (
    <div className="flex-1 relative canvas-grid overflow-hidden">
      {/* Canvas label */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[11px] font-medium text-neutral-400 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-md border border-black/[0.06]">
          {canvasName}
        </span>
      </div>



      {/* Canvas content */}
      <div className="absolute" style={{ left: 48, top: 48 }}>
        {/* SVG connections */}
        <svg
          className="absolute pointer-events-none"
          style={{ left: 0, top: 0, width: 900, height: 500, overflow: 'visible' }}
        >
          <defs>
            <marker id="ca-arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#D1D5DB" />
            </marker>
          </defs>
          {CONNECTIONS.map((conn, i) => (
            <path
              key={i}
              d={conn.path}
              stroke="#D1D5DB"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="0"
              markerEnd="url(#ca-arrowhead)"
            />
          ))}
        </svg>

        {/* Nodes */}
        {NODES.map((node) => (
          <div
            key={node.id}
            className="absolute bg-white rounded-xl border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer group"
            style={{ left: node.x, top: node.y, width: NODE_WIDTH }}
          >
            <div className="h-[3px] rounded-t-xl" style={{ backgroundColor: node.accent }} />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-xs font-semibold text-neutral-800 leading-tight">{node.label}</p>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5 opacity-60"
                  style={{ backgroundColor: node.accent }}
                />
              </div>
              <p className="text-[10px] text-neutral-400 leading-relaxed">{node.sublabel}</p>
              {node.tags && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {node.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: node.accent + '15', color: node.accent }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* Connection handles */}
            <div className="absolute inset-y-0 -right-1.5 flex items-center">
              <div className="w-3 h-3 rounded-full bg-white border-2 border-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute inset-y-0 -left-1.5 flex items-center">
              <div className="w-3 h-3 rounded-full bg-white border-2 border-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-white border border-black/[0.08] rounded-xl shadow-md px-2 py-1.5">
        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer">
          <MousePointer2 className="w-3.5 h-3.5" />
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer">
          <Hand className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-4 bg-neutral-200 mx-1" />
        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer">
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="text-[11px] font-medium text-neutral-500 w-10 text-center">100%</span>
        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer">
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-4 bg-neutral-200 mx-1" />
        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer">
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
