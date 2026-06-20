/**
 * api.ts
 * Central API service — mirrors the Spring Boot backend endpoints.
 * Automatically attaches the Supabase JWT as a Bearer token on every request.
 */
import { supabase } from './supabaseClient'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

// ─── helpers ────────────────────────────────────────────────────────────────

async function getHeaders(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession()
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token ?? ''}`,
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = await getHeaders()
  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers: { ...headers, ...(init?.headers ?? {}) } })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { message?: string }).message ?? `Request failed: ${res.status} ${path}`)
  }
  return res.json() as Promise<T>
}

// ─── types (mirror backend DTOs) ────────────────────────────────────────────

export interface UserResponse {
  userId: string
  userName: string
  email: string
}

export interface WorkSpaceResponse {
  workSpaceId: string
  workSpaceName: string
  userId: string
}

export interface CanvasResponse {
  canvasId: string
  canvasName: string
  workSpaceId: string
}

export interface ComponentResponse {
  componentId: number
  componentName: string
  type: 'TEXT' | 'IMAGE' | 'NODE'
  textContent: string
  color: string
  positionX: number
  positionY: number
  width: number
  height: number
  shapeType: string | null
  imgUrl: string | null
}

export interface EdgeResponse {
  edgeId: number
  edgeName: string
  color: string
  sourceId: number
  targetId: number
}

export interface CanvasDetailsResponse {
  canvas: CanvasResponse
  components: ComponentResponse[]
  edges: EdgeResponse[]
}

// ─── API methods ─────────────────────────────────────────────────────────────

export const api = {
  // Auth
  syncUser: (userData: { userId: string; userName: string; email: string }) =>
      request<UserResponse>('/auth/sync', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),

  // Workspaces
  getWorkspaces: (userId: string) =>
      request<WorkSpaceResponse[]>(`/workspace/user/${userId}`),

  createWorkspace: (userId: string, name: string) =>
      request<WorkSpaceResponse>(`/workspace/user/${userId}`, {
        method: 'POST',
        body: JSON.stringify({ workSpaceName: name }),
      }),

  renameWorkspace: (workSpaceId: string, name: string) =>
      request<WorkSpaceResponse>(`/workspace/${workSpaceId}`, {
        method: 'PATCH',
        body: JSON.stringify({ workSpaceName: name }),
      }),

  deleteWorkspace: (workSpaceId: string) =>
      request<void>(`/workspace/${workSpaceId}`, { method: 'DELETE' }),

  // Canvases
  getCanvases: (workSpaceId: string) =>
      request<CanvasResponse[]>(`/canvas/workspace/${workSpaceId}`),

  createCanvas: (workSpaceId: string, name: string) =>
      request<CanvasResponse>(`/canvas/workspace/${workSpaceId}`, {
        method: 'POST',
        body: JSON.stringify({ canvasName: name }),
      }),

  loadCanvas: (canvasId: string) =>
      request<CanvasDetailsResponse>(`/canvas/${canvasId}/load`),

  renameCanvas: (canvasId: string, name: string) =>
      request<CanvasResponse>(`/canvas/${canvasId}`, {
        method: 'PATCH',
        body: JSON.stringify({ canvasName: name }),
      }),

  deleteCanvas: (canvasId: string) =>
      request<void>(`/canvas/${canvasId}`, { method: 'DELETE' }),

  // Components
  createComponent: (canvasId: string, data: Partial<ComponentResponse>) =>
      request<ComponentResponse>(`/component/canvas/${canvasId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),

  updateComponentPosition: (componentId: number, positionX: number, positionY: number) =>
      request<ComponentResponse>(`/component/${componentId}/position`, {
        method: 'PATCH',
        body: JSON.stringify({ positionX, positionY }),
      }),

  updateComponentSize: (componentId: number, width: number, height: number) =>
      request<ComponentResponse>(`/component/${componentId}/size`, {
        method: 'PATCH',
        body: JSON.stringify({ width, height }),
      }),

  updateComponentText: (componentId: number, textContent: string) =>
      request<ComponentResponse>(`/component/${componentId}/text`, {
        method: 'PATCH',
        body: JSON.stringify({ textContent }),
      }),

  updateComponentColor: (componentId: number, color: string) =>
      request<ComponentResponse>(`/component/${componentId}/color`, {
        method: 'PATCH',
        body: JSON.stringify({ color }),
      }),

  updateComponentImage: (componentId: number, imgUrl: string) =>
      request<ComponentResponse>(`/component/${componentId}/image`, {
        method: 'PATCH',
        body: JSON.stringify({ imgUrl }),
      }),

  deleteComponent: (componentId: number) =>
      request<void>(`/component/${componentId}`, { method: 'DELETE' }),

  // Edges
  createEdge: (canvasId: string, data: { edgeName: string; color: string; sourceId: number; targetId: number }) =>
      request<EdgeResponse>(`/edge/canvas/${canvasId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),

  updateEdgeLabel: (edgeId: number, edgeName: string) =>
      request<EdgeResponse>(`/edge/${edgeId}/label`, {
        method: 'PATCH',
        body: JSON.stringify({ edgeName }),
      }),

  deleteEdge: (edgeId: number) =>
      request<void>(`/edge/${edgeId}`, { method: 'DELETE' }),

  // AI
  analyzeCanvas: (payload: unknown) =>
      fetch('/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then((r) => r.json()),
}