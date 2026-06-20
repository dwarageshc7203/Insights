export type Canvas = { canvasId: number; canvasName: string; workSpaceId: number; }

export type Workspace = {
  workSpaceId: number
  workSpaceName: string
  color?: string
}

export type Tab = { id: string; name: string }

export type RenameTarget = {
  type: 'workspace' | 'canvas'
  id: string
  name: string
}

export const WORKSPACE_COLORS = [
  '#7C3AED',
  '#0EA5E9',
  '#F97316',
  '#10B981',
  '#F43F5E',
  '#8B5CF6',
  '#06B6D4',
]
