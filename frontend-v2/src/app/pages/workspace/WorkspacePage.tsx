import { useState, useRef, useEffect } from 'react'
import { Menu } from 'lucide-react'
import WorkspaceSidebar from './components/WorkspaceSidebar'
import CanvasTabs from './components/CanvasTabs'
import CanvasArea from './components/CanvasArea'
import CreateWorkspaceModal from './components/modals/CreateWorkspaceModal'
import CreateCanvasModal from './components/modals/CreateCanvasModal'
import RenameModal from './components/modals/RenameModal'
import ShortcutHelpModal from './components/modals/ShortcutHelpModal'
import { useKeyboardShortcuts } from '@/app/hooks/useKeyboardShortcuts'
import { useIsMobile } from '@/app/components/ui/use-mobile'
import type { Tab, RenameTarget } from './workspaceTypes'
import { useWorkspace } from '@/hooks/useWorkspace'

let idCounter = 200

export default function WorkspacePage() {
  const isMobile = useIsMobile()
  const searchRef = useRef<HTMLInputElement>(null)

  const { workspaces, isLoading, createWorkspace, deleteWorkspace, createCanvas } = useWorkspace()

  const [activeWorkspace, setActiveWorkspace] = useState('')
  const [activeCanvas, setActiveCanvas] = useState('')
  const [tabs, setTabs] = useState<Tab[]>([])
  const [activeTab, setActiveTab] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Modal state
  const [createWorkspaceOpen, setCreateWorkspaceOpen] = useState(false)
  const [createCanvasOpen, setCreateCanvasOpen] = useState(false)
  const [createCanvasWorkspaceId, setCreateCanvasWorkspaceId] = useState<string | null>(null)
  const [renameOpen, setRenameOpen] = useState(false)
  const [renameTarget, setRenameTarget] = useState<RenameTarget | null>(null)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)

  useEffect(() => {
    if (workspaces.length > 0 && !activeWorkspace) {
      const firstWs = workspaces[0]
      setActiveWorkspace(firstWs.id)
      if (firstWs.canvases.length > 0 && !activeCanvas) {
        const firstCanvas = firstWs.canvases[0]
        setActiveCanvas(firstCanvas.id)
        setActiveTab(firstCanvas.id)
        setTabs(p => {
          if (!p.find(t => t.id === firstCanvas.id)) return [...p, firstCanvas]
          return p
        })
      }
    }
  }, [workspaces, activeWorkspace, activeCanvas])

  // Handlers
  const openCanvas = (id: string, name: string) => {
    setActiveCanvas(id)
    setActiveTab(id)
    if (!tabs.find((t) => t.id === id)) setTabs((p) => [...p, { id, name }])
  }

  const closeTab = (id: string) => {
    const remaining = tabs.filter((t) => t.id !== id)
    setTabs(remaining)
    if (activeTab === id) {
      const next = remaining[remaining.length - 1]
      if (next) { setActiveTab(next.id); setActiveCanvas(next.id) }
      else { setActiveTab(''); setActiveCanvas('') }
    }
  }

  const addNewTab = () => {
    const id = `new-${++idCounter}`
    const name = `Untitled ${idCounter - 199}`
    setTabs((p) => [...p, { id, name }])
    setActiveTab(id)
    setActiveCanvas(id)
  }

  const handleCreateWorkspace = async (name: string) => {
    try {
      const ws = await createWorkspace(name)
      if (ws) setActiveWorkspace(ws.id)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreateCanvas = async (workspaceId: string, name: string) => {
    try {
      const newCanvas = await createCanvas(workspaceId, name)
      if (newCanvas) openCanvas(newCanvas.canvasId, newCanvas.canvasName)
    } catch (err) {
      console.error(err)
    }
  }

  const handleRename = async (id: string, type: 'workspace' | 'canvas', name: string) => {
    // TODO: Connect to backend rename API if needed
    console.log('Rename not yet fully hooked to backend:', type, id, name)
  }

  const openRename = (type: 'workspace' | 'canvas', id: string, name: string) => {
    setRenameTarget({ type, id, name })
    setRenameOpen(true)
  }

  const openCreateCanvas = (workspaceId: string) => {
    setCreateCanvasWorkspaceId(workspaceId)
    setCreateCanvasOpen(true)
  }

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: 'n', ctrl: true, shift: false, handler: () => setCreateWorkspaceOpen(true) },
    { key: 'n', ctrl: true, shift: true, handler: () => openCreateCanvas(activeWorkspace) },
    { key: 'k', ctrl: true, shift: false, handler: () => searchRef.current?.focus() },
    { key: '?', handler: () => setShortcutsOpen(true) },
  ])

  const activeTabName = tabs.find((t) => t.id === activeTab)?.name ?? 'Canvas'
  const createCanvasWsName = workspaces.find((w) => w.id === createCanvasWorkspaceId)?.name ?? ''

  const sidebar = (
    <WorkspaceSidebar
      workspaces={workspaces}
      activeWorkspace={activeWorkspace}
      activeCanvas={activeCanvas}
      collapsed={sidebarCollapsed}
      onSelectWorkspace={setActiveWorkspace}
      onSelectCanvas={(id, name) => { openCanvas(id, name); setDrawerOpen(false) }}
      onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
      onOpenCreateWorkspace={() => setCreateWorkspaceOpen(true)}
      onOpenCreateCanvas={openCreateCanvas}
      onOpenRename={openRename}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onFocusSearch={() => searchRef.current?.focus()}
      searchRef={searchRef}
    />
  )

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Desktop sidebar */}
      {!isMobile && sidebar}

      {/* Mobile drawer */}
      {isMobile && drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <div className="fixed left-0 top-0 h-full z-50 shadow-2xl">{sidebar}</div>
        </>
      )}

      {/* Main canvas area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {isMobile && (
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-neutral-200 bg-white flex-shrink-0">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-1 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-semibold text-sm text-neutral-900">Insights</span>
          </div>
        )}

        {tabs.length > 0 ? (
          <>
            <CanvasTabs
              tabs={tabs}
              activeTab={activeTab}
              onSelectTab={(id) => { setActiveTab(id); setActiveCanvas(id) }}
              onCloseTab={closeTab}
              onNewTab={addNewTab}
            />
            <CanvasArea canvasId={activeTab} canvasName={activeTabName} />
          </>
        ) : (
          <div className="flex-1 canvas-grid flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl mb-3" aria-hidden>✦</p>
              <p className="text-sm font-medium text-neutral-500 mb-1">No canvas open</p>
              <p className="text-xs text-neutral-400">Select a canvas from the sidebar</p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateWorkspaceModal
        open={createWorkspaceOpen}
        onClose={() => setCreateWorkspaceOpen(false)}
        onCreate={handleCreateWorkspace}
      />
      <CreateCanvasModal
        open={createCanvasOpen}
        onClose={() => setCreateCanvasOpen(false)}
        workspaceId={createCanvasWorkspaceId}
        workspaceName={createCanvasWsName}
        onCreate={handleCreateCanvas}
      />
      <RenameModal
        open={renameOpen}
        onClose={() => setRenameOpen(false)}
        target={renameTarget}
        onRename={handleRename}
      />
      <ShortcutHelpModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  )
}
