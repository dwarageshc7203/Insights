import { create } from 'zustand';
import { Workspace, workspaceService } from '../services/workspace.service';

interface WorkspaceState {
  workspaces: Workspace[];
  activeWorkspaceId: number | null;
  loading: boolean;
  error: string | null;

  loadWorkspaces: (userId: string) => Promise<void>;
  addWorkspace: (userId: string, name: string) => Promise<void>;
  removeWorkspace: (id: number) => Promise<void>;
  setActiveWorkspace: (id: number | null) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  activeWorkspaceId: null,
  loading: false,
  error: null,

  loadWorkspaces: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const workspaces = await workspaceService.fetchWorkspaces(userId);
      set({ workspaces, loading: false });
      if (workspaces.length > 0 && !get().activeWorkspaceId) {
        set({ activeWorkspaceId: workspaces[0].workSpaceId });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addWorkspace: async (userId: string, name: string) => {
    set({ loading: true, error: null });
    try {
      const newWorkspace = await workspaceService.createWorkspace(userId, name);
      set((state) => ({
        workspaces: [...state.workspaces, newWorkspace],
        activeWorkspaceId: newWorkspace.workSpaceId,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  removeWorkspace: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await workspaceService.deleteWorkspace(id);
      set((state) => {
        const newWorkspaces = state.workspaces.filter((w) => w.workSpaceId !== id);
        return {
          workspaces: newWorkspaces,
          activeWorkspaceId: state.activeWorkspaceId === id 
            ? (newWorkspaces.length > 0 ? newWorkspaces[0].workSpaceId : null)
            : state.activeWorkspaceId,
          loading: false,
        };
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setActiveWorkspace: (id: number | null) => {
    set({ activeWorkspaceId: id });
  },
}));
