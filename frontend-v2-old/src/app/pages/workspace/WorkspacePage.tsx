import { useState, useRef } from 'react'
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
import { useAuth } from '@/app/hooks/useAuth'
import { useWorkspaceStore } from '@/store/workspaceStore'
import { useCanvasStore } from '@/store/canvasStore'
import { useEffect } from 'react'
import type { Workspace, Tab, RenameTarget } from './workspaceTypes'
import { WORKSPACE_COLORS } from './workspaceTypes'



let idCounter = 200

export default function WorkspacePage() {
  const isMobile = useIsMobile()
  const searchRef = useRef<HTMLInputElement>(null)
  const { user } = useAuth()

  const {
    workspaces,
    activeWorkspaceId,
    setActiveWorkspace,
    loadWorkspaces,
    addWorkspace,
    removeWorkspace,
  } = useWorkspaceStore()

  const {
    canvasesByWorkspace,
    activeCanvasId,
    setActiveCanvas,
    loadCanvases,
    addCanvas,
    removeCanvas,
  } = useCanvasStore()

  useEffect(() => {
    if (user?.id) {
      loadWorkspaces(user.id)
    }
  }, [user, loadWorkspaces])

  useEffect(() => {
    if (activeWorkspaceId) {
      loadCanvases(activeWorkspaceId)
    }
  }, [activeWorkspaceId, loadCanvases])

  const [tabs, setTabs] = useState<Tab[]>([])
  const [activeTab, setActiveTab] = useState<number | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Modal state
  const [createWorkspaceOpen, setCreateWorkspaceOpen] = useState(false)
  const [createCanvasOpen, setCreateCanvasOpen] = useState(false)
  const [createCanvasWorkspaceId, setCreateCanvasWorkspaceId] = useState<number | null>(null)
  const [renameOpen, setRenameOpen] = useState(false)
  const [renameTarget, setRenameTarget] = useState<RenameTarget | null>(null)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)

  // Handlers
  const openCanvas = (id: number, name: string) => {
    setActiveCanvas(id)
    setActiveTab(id)
    if (!tabs.find((t) => t.id === id.toString())) setTabs((p) => [...p, { id: id.toString(), name }])
  }

  const closeTab = (id: string) => {
    const remaining = tabs.filter((t) => t.id !== id)
    setTabs(remaining)
    if (activeTab === parseInt(id)) {
      const next = remaining[remaining.length - 1]
      if (next) { 
        setActiveTab(parseInt(next.id))
        setActiveCanvas(parseInt(next.id)) 
      }
    }
  }

  const addNewTab = () => {
    // Unsupported right now without workspace ID context
  }

  const handleCreateWorkspace = async (name: string) => {
    if (user?.id) {
      await addWorkspace(user.id, name)
    }
  }

  const handleCreateCanvas = async (workspaceId: number, name: string) => {
    await addCanvas(workspaceId, name)
  }

  const handleDeleteWorkspace = async (id: number) => {
    await removeWorkspace(id)
  }

  const handleDeleteCanvas = async (workspaceId: number, canvasId: number) => {
    await removeCanvas(workspaceId, canvasId)
  }

  const handleRename = (id: string, type: 'workspace' | 'canvas', name: string) => {
    // Rename not implemented in backend API yet
  }

  const openRename = (type: 'workspace' | 'canvas', id: number, name: string) => {
    setRenameTarget({ type, id: id.toString(), name })
    setRenameOpen(true)
  }

  const openCreateCanvas = (workspaceId: number) => {
    setCreateCanvasWorkspaceId(workspaceId)
    setCreateCanvasOpen(true)
  }

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: 'n', ctrl: true, shift: false, handler: () => setCreateWorkspaceOpen(true) },
    { key: 'n', ctrl: true, shift: true, handler: () => activeWorkspaceId && openCreateCanvas(activeWorkspaceId) },
    { key: 'k', ctrl: true, shift: false, handler: () => searchRef.current?.focus() },
    { key: '?', handler: () => setShortcutsOpen(true) },
  ])

  const activeTabName = tabs.find((t) => t.id === activeTab?.toString())?.name ?? 'Canvas'
  const createCanvasWsName = workspaces.find((w) => w.workSpaceId === createCanvasWorkspaceId)?.workSpaceName ?? ''

  const sidebar = (
    <WorkspaceSidebar
      workspaces={workspaces}
      canvasesByWorkspace={canvasesByWorkspace}
      activeWorkspace={activeWorkspaceId}
      activeCanvas={activeCanvasId}
      collapsed={sidebarCollapsed}
      onSelectWorkspace={setActiveWorkspace}
      onSelectCanvas={(id, name) => { openCanvas(id, name); setDrawerOpen(false) }}
      onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
      onOpenCreateWorkspace={() => setCreateWorkspaceOpen(true)}
      onOpenCreateCanvas={openCreateCanvas}
      onOpenRename={openRename}
      onDeleteWorkspace={handleDeleteWorkspace}
      onDeleteCanvas={handleDeleteCanvas}
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

        {workspaces.length === 0 ? (
          <div className="flex-1 canvas-grid flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl mb-3" aria-hidden>✦</p>
              <p className="text-sm font-medium text-neutral-500 mb-1">Create your first workspace</p>
              <button
                onClick={() => setCreateWorkspaceOpen(true)}
                className="mt-4 px-4 py-2 bg-[#111] text-white rounded-lg text-xs font-medium hover:bg-[#1E3A8A] transition-colors cursor-pointer"
              >
                New Workspace
              </button>
            </div>
          </div>
        ) : tabs.length > 0 ? (
          <>
            <CanvasTabs
              tabs={tabs}
              activeTab={activeTab?.toString() || ''}
              onSelectTab={(id) => { setActiveTab(parseInt(id)); setActiveCanvas(parseInt(id)) }}
              onCloseTab={closeTab}
              onNewTab={addNewTab}
            />
            <CanvasArea canvasName={activeTabName} />
          </>
        ) : (
          <div className="flex-1 canvas-grid flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl mb-3" aria-hidden>✦</p>
              <p className="text-sm font-medium text-neutral-500 mb-1">Create your first canvas</p>
              <p className="text-xs text-neutral-400">Select a workspace from the sidebar and add a canvas</p>
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
