import { useState } from 'react'
import { Search, Plus, ChevronRight, FileText, HelpCircle, LogOut, PanelLeft, MoreHorizontal, Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import * as Tooltip from '@radix-ui/react-tooltip'
import InsightsLogo from '@/app/components/ui/InsightsLogo'
import type { Workspace } from '../workspaceTypes'
import { useAuth } from '@/hooks/useAuth'

type Props = {
  workspaces: Workspace[]
  activeWorkspace: string
  activeCanvas: string
  collapsed: boolean
  onSelectWorkspace: (id: string) => void
  onSelectCanvas: (id: string, name: string) => void
  onToggleCollapse: () => void
  onOpenCreateWorkspace: () => void
  onOpenCreateCanvas: (workspaceId: string) => void
  onRenameWorkspace?: (id: string, newName: string) => void
  onRenameCanvas?: (wsId: string, canvasId: string, newName: string) => void
  onDeleteWorkspace?: (id: string) => void
  onDeleteCanvas?: (workspaceId: string, canvasId: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  onFocusSearch: () => void
  searchRef: React.RefObject<HTMLInputElement>
}

function SidebarTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip.Root delayDuration={300}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="right"
          sideOffset={8}
          className="px-2.5 py-1.5 bg-[#1F2937] text-white text-xs font-medium rounded-lg shadow-lg z-50 select-none"
        >
          {label}
          <Tooltip.Arrow className="fill-[#1F2937]" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}

export default function WorkspaceSidebar({
  workspaces, activeWorkspace, activeCanvas, collapsed,
  onSelectWorkspace, onSelectCanvas, onToggleCollapse,
  onOpenCreateWorkspace, onOpenCreateCanvas, onRenameWorkspace, onRenameCanvas,
  onDeleteWorkspace, onDeleteCanvas,
  searchQuery, onSearchChange, searchRef,
}: Props) {
  const { user, signOut } = useAuth()
  const displayName = user?.user_metadata?.full_name || user?.email || 'User'
  const initials = displayName.slice(0, 2).toUpperCase()
  const [expanded, setExpanded] = useState<string[]>(['ws1'])

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const [editingWorkspace, setEditingWorkspace] = useState<string | null>(null)
  const [editingCanvas, setEditingCanvas] = useState<string | null>(null)
  const [renameDraft, setRenameDraft] = useState('')

  const handleWorkspaceRenameSubmit = (wsId: string) => {
    if (renameDraft.trim() && onRenameWorkspace) {
      onRenameWorkspace(wsId, renameDraft.trim())
    }
    setEditingWorkspace(null)
  }

  const handleCanvasRenameSubmit = (wsId: string, canvasId: string) => {
    if (renameDraft.trim() && onRenameCanvas) {
      onRenameCanvas(wsId, canvasId, renameDraft.trim())
    }
    setEditingCanvas(null)
  }

  const filtered = workspaces.filter(
    (ws) =>
      ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ws.canvases.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <Tooltip.Provider>
      <motion.aside
        animate={{ width: collapsed ? 60 : 256 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#1F2937] flex flex-col h-full flex-shrink-0 border-r border-white/[0.06] overflow-hidden"
        aria-label="Workspace sidebar"
      >
        {/* Header */}
        <div className="px-3 pt-4 pb-2 flex-shrink-0">
          {collapsed ? (
            <div className="flex flex-col items-center gap-2">
              <SidebarTooltip label="Insights">
                <Link to="/">
                  <InsightsLogo size={28} />
                </Link>
              </SidebarTooltip>
              <SidebarTooltip label="Expand sidebar">
                <button
                  onClick={onToggleCollapse}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-colors cursor-pointer"
                  aria-label="Expand sidebar"
                >
                  <PanelLeft className="w-3.5 h-3.5" />
                </button>
              </SidebarTooltip>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <Link to="/" className="flex items-center gap-2 group">
                  <InsightsLogo size={22} />
                  <span className="text-sm font-semibold text-white">Insights</span>
                </Link>
                <button
                  onClick={onToggleCollapse}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-colors cursor-pointer"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeft className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-2 bg-white/[0.05] rounded-lg border border-white/[0.04] hover:bg-white/[0.08] transition-colors">
                <Search className="w-3.5 h-3.5 text-white/25 flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent text-xs text-white/60 placeholder:text-white/25 outline-none flex-1 min-w-0"
                  aria-label="Search workspaces and canvases"
                />
              </div>
            </>
          )}
        </div>

        {/* New workspace */}
        {!collapsed && (
          <div className="px-3 pb-2 flex-shrink-0">
            <button
              onClick={onOpenCreateWorkspace}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-white/35 hover:text-white/60 hover:bg-white/[0.04] rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              New workspace
            </button>
          </div>
        )}

        <div className="w-full h-px bg-white/[0.06] mb-2 flex-shrink-0" />

        {/* Workspace list */}
        <nav className="flex-1 overflow-y-auto px-2 scrollbar-hidden" aria-label="Workspaces">
          {!collapsed && (
            <p className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.16em] px-2 mb-2">
              Workspaces
            </p>
          )}
          {filtered.map((ws) => {
            const isActive = activeWorkspace === ws.id
            const isExpanded = expanded.includes(ws.id)

            if (collapsed) {
              return (
                <SidebarTooltip key={ws.id} label={ws.name}>
                  <button
                    onClick={() => { onSelectWorkspace(ws.id); toggleExpanded(ws.id) }}
                    className={`w-full flex items-center justify-center py-2 rounded-lg transition-colors cursor-pointer mb-0.5 ${isActive ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'}`}
                    aria-label={ws.name}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold"
                      style={{ backgroundColor: ws.color + '25', color: ws.color }}
                    >
                      {ws.name[0]}
                    </div>
                  </button>
                </SidebarTooltip>
              )
            }

            return (
              <div key={ws.id} className="mb-0.5">
                <div className={`flex items-center rounded-lg group ${isActive ? 'border-l-2 bg-white/[0.06]' : ''}`} style={isActive ? { borderLeftColor: `${ws.color}90` } : {}}>
                  <button
                    onClick={() => { onSelectWorkspace(ws.id); toggleExpanded(ws.id) }}
                    className={`flex-1 flex items-center gap-2.5 px-2 py-2 text-sm transition-colors cursor-pointer ${
                      isActive ? 'pl-1.5 text-white' : 'text-white/45 hover:bg-white/[0.04] hover:text-white/75 rounded-lg'
                    }`}
                    aria-expanded={isExpanded}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                      style={{ backgroundColor: ws.color + '25', color: ws.color }}
                    >
                      {ws.name[0]}
                    </div>
                    {editingWorkspace === ws.id ? (
                      <input
                        autoFocus
                        value={renameDraft}
                        onChange={(e) => setRenameDraft(e.target.value)}
                        onBlur={() => handleWorkspaceRenameSubmit(ws.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleWorkspaceRenameSubmit(ws.id)
                          if (e.key === 'Escape') setEditingWorkspace(null)
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-transparent text-left text-[13px] font-semibold truncate outline-none text-white border-b border-white/20"
                      />
                    ) : (
                      <span 
                        className="flex-1 text-left text-[13px] font-semibold truncate"
                        onDoubleClick={(e) => {
                          e.stopPropagation()
                          setEditingWorkspace(ws.id)
                          setRenameDraft(ws.name)
                        }}
                      >
                        {ws.name}
                      </span>
                    )}
                    <ChevronRight className={`w-3 h-3 flex-shrink-0 transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''} opacity-30`} />
                  </button>
                  <div className="opacity-0 group-hover:opacity-100 flex items-center mr-1">
                    {onDeleteWorkspace && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onDeleteWorkspace(ws.id) }}
                        className="w-6 h-6 flex items-center justify-center rounded text-white/25 hover:text-red-400 hover:bg-white/[0.06] transition-all cursor-pointer"
                        aria-label={`Delete ${ws.name}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="pl-4 mt-0.5 mb-1.5 ml-2 border-l border-white/[0.07]">
                    {ws.canvases.map((canvas) => {
                      const isCanvasActive = activeCanvas === canvas.id
                      return (
                        <div key={canvas.id} className="flex items-center group/canvas">
                          <button
                            onClick={() => onSelectCanvas(canvas.id, canvas.name)}
                            className={`flex-1 flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] transition-colors cursor-pointer ${
                              isCanvasActive
                                ? 'bg-white/[0.08] text-white/90'
                                : 'text-white/30 hover:bg-white/[0.04] hover:text-white/55'
                            }`}
                            aria-current={isCanvasActive ? 'true' : undefined}
                          >
                            <FileText className="w-3 h-3 flex-shrink-0 opacity-50" aria-hidden />
                            {editingCanvas === canvas.id ? (
                              <input
                                autoFocus
                                value={renameDraft}
                                onChange={(e) => setRenameDraft(e.target.value)}
                                onBlur={() => handleCanvasRenameSubmit(ws.id, canvas.id)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleCanvasRenameSubmit(ws.id, canvas.id)
                                  if (e.key === 'Escape') setEditingCanvas(null)
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-transparent truncate outline-none border-b border-white/20 w-full"
                              />
                            ) : (
                              <span 
                                className="truncate"
                                onDoubleClick={(e) => {
                                  e.stopPropagation()
                                  setEditingCanvas(canvas.id)
                                  setRenameDraft(canvas.name)
                                }}
                              >
                                {canvas.name}
                              </span>
                            )}
                          </button>
                          <div className="opacity-0 group-hover/canvas:opacity-100 flex items-center mr-1">
                            {onDeleteCanvas && (
                              <button
                                onClick={(e) => { e.stopPropagation(); onDeleteCanvas(ws.id, canvas.id) }}
                                className="w-5 h-5 flex items-center justify-center rounded text-white/25 hover:text-red-400 hover:bg-white/[0.04] transition-all cursor-pointer"
                                aria-label={`Delete ${canvas.name}`}
                              >
                                <Trash2 className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                    <button
                      onClick={() => onOpenCreateCanvas(ws.id)}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] text-white/20 hover:text-white/45 hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" aria-hidden />
                      New canvas
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] p-2 flex-shrink-0">
          {collapsed ? (
            <>
              <SidebarTooltip label="Help & Support">
                <button className="w-full flex items-center justify-center py-2 rounded-lg text-white/25 hover:text-white/55 hover:bg-white/[0.04] transition-colors cursor-pointer">
                  <HelpCircle className="w-4 h-4" />
                </button>
              </SidebarTooltip>
              <SidebarTooltip label={displayName}>
                <button className="w-full flex items-center justify-center py-2 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-violet-500/25 border border-violet-400/25 flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-violet-300">{initials}</span>
                  </div>
                </button>
              </SidebarTooltip>
              <SidebarTooltip label="Sign out">
                <button onClick={() => signOut()} className="w-full flex items-center justify-center py-2 rounded-lg text-white/25 hover:text-red-400 hover:bg-white/[0.04] transition-colors cursor-pointer" aria-label="Sign out">
                  <LogOut className="w-4 h-4" />
                </button>
              </SidebarTooltip>
            </>
          ) : (
            <>
              <button className="w-full flex items-center gap-2.5 px-2 py-2 text-xs text-white/35 hover:text-white/60 hover:bg-white/[0.04] rounded-lg transition-colors cursor-pointer">
                <HelpCircle className="w-3.5 h-3.5" aria-hidden />
                Help & Support
              </button>
              <div className="flex items-center gap-2.5 px-2 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group">
                <div className="w-6 h-6 rounded-full bg-violet-500/25 border border-violet-400/25 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-semibold text-violet-300">{initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white/60 truncate">{displayName}</p>
                  <p className="text-[10px] text-white/25 truncate">{user?.email || ''}</p>
                </div>
                <button onClick={() => signOut()} className="opacity-0 group-hover:opacity-100 p-1 rounded text-white/25 hover:text-red-400 transition-all cursor-pointer" aria-label="Sign out" title="Sign out">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </motion.aside>
    </Tooltip.Provider>
  )
}
