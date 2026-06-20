import { X, Plus } from 'lucide-react'

const TAB_COLORS: Record<string, { bg: string; text: string }> = {
  W: { bg: '#EDE9FE', text: '#6D28D9' },
  U: { bg: '#E0F2FE', text: '#0369A1' },
  B: { bg: '#FEF3C7', text: '#92400E' },
  A: { bg: '#FEE2E2', text: '#B91C1C' },
  S: { bg: '#D1FAE5', text: '#065F46' },
  C: { bg: '#FFEDD5', text: '#9A3412' },
  R: { bg: '#FCE7F3', text: '#9D174D' },
  P: { bg: '#EDE9FE', text: '#5B21B6' },
}

function getTabColor(name: string) {
  return TAB_COLORS[name[0]?.toUpperCase()] ?? { bg: '#F3F4F6', text: '#374151' }
}

type Tab = { id: string; name: string }

type Props = {
  tabs: Tab[]
  activeTab: string
  onSelectTab: (id: string) => void
  onCloseTab: (id: string) => void
  onNewTab: () => void
}

export default function CanvasTabs({ tabs, activeTab, onSelectTab, onCloseTab, onNewTab }: Props) {
  return (
    <div
      className="flex items-end gap-0 pl-2 pr-3 pt-2 bg-[#F9F9F9] border-b border-[#EAEAEA] overflow-x-auto scrollbar-hidden flex-shrink-0"
      role="tablist"
      aria-label="Open canvases"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        const colors = getTabColor(tab.name)
        return (
          <div
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectTab(tab.id)}
            className={[
              'flex items-center gap-1.5 px-2.5 py-2 rounded-t-lg text-xs flex-shrink-0 group cursor-pointer transition-colors select-none',
              isActive
                ? 'bg-white border border-b-white border-[#EAEAEA] -mb-px shadow-[0_-1px_4px_rgba(0,0,0,0.04)] text-[#111] z-10 relative'
                : 'text-[#999] hover:text-[#555] hover:bg-white/60',
            ].join(' ')}
          >
            {/* Circular letter avatar */}
            <div
              className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
              style={{ backgroundColor: colors.bg, color: colors.text }}
              aria-hidden
            >
              {tab.name[0]?.toUpperCase()}
            </div>

            <span className="max-w-[96px] truncate font-medium">{tab.name}</span>

            <button
              onClick={(e) => { e.stopPropagation(); onCloseTab(tab.id) }}
              className={[
                'w-3.5 h-3.5 flex items-center justify-center rounded hover:bg-black/[0.08] transition-colors flex-shrink-0 cursor-pointer',
                isActive
                  ? 'text-[#999] hover:text-[#333]'
                  : 'text-transparent group-hover:text-[#BBB]',
              ].join(' ')}
              aria-label={`Close ${tab.name}`}
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        )
      })}

      {/* + button sits immediately after the last tab */}
      <button
        onClick={onNewTab}
        className="flex items-center justify-center w-6 h-6 mb-1.5 ml-1 rounded-md text-[#BBB] hover:text-[#555] hover:bg-black/[0.05] transition-colors flex-shrink-0 cursor-pointer"
        aria-label="New canvas tab"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
