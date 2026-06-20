import { create } from 'zustand';
import { Canvas, canvasService } from '../services/canvas.service';

interface CanvasState {
  canvasesByWorkspace: Record<number, Canvas[]>;
  activeCanvasId: number | null;
  loading: boolean;
  error: string | null;

  loadCanvases: (workspaceId: number) => Promise<void>;
  addCanvas: (workspaceId: number, name: string) => Promise<void>;
  removeCanvas: (workspaceId: number, id: number) => Promise<void>;
  setActiveCanvas: (id: number | null) => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  canvasesByWorkspace: {},
  activeCanvasId: null,
  loading: false,
  error: null,

  loadCanvases: async (workspaceId: number) => {
    set({ loading: true, error: null });
    try {
      const canvases = await canvasService.fetchCanvases(workspaceId);
      set((state) => ({
        canvasesByWorkspace: { ...state.canvasesByWorkspace, [workspaceId]: canvases },
        loading: false,
      }));
      if (canvases.length > 0 && !get().activeCanvasId) {
        set({ activeCanvasId: canvases[0].canvasId });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addCanvas: async (workspaceId: number, name: string) => {
    set({ loading: true, error: null });
    try {
      const newCanvas = await canvasService.createCanvas(workspaceId, name);
      set((state) => {
        const existing = state.canvasesByWorkspace[workspaceId] || [];
        return {
          canvasesByWorkspace: { ...state.canvasesByWorkspace, [workspaceId]: [...existing, newCanvas] },
          activeCanvasId: newCanvas.canvasId,
          loading: false,
        };
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  removeCanvas: async (workspaceId: number, id: number) => {
    set({ loading: true, error: null });
    try {
      await canvasService.deleteCanvas(id);
      set((state) => {
        const existing = state.canvasesByWorkspace[workspaceId] || [];
        const newCanvases = existing.filter((c) => c.canvasId !== id);
        return {
          canvasesByWorkspace: { ...state.canvasesByWorkspace, [workspaceId]: newCanvases },
          activeCanvasId: state.activeCanvasId === id 
            ? (newCanvases.length > 0 ? newCanvases[0].canvasId : null)
            : state.activeCanvasId,
          loading: false,
        };
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setActiveCanvas: (id: number | null) => {
    set({ activeCanvasId: id });
  },
}));
