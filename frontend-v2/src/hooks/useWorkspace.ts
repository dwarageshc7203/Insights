import { useState, useEffect, useCallback } from 'react';
import { Workspace } from '../types/workspace';
import { Workspace as UIWorkspace, WORKSPACE_COLORS } from '../app/pages/workspace/workspaceTypes';
import { workspaceService } from '../services/workspaceService';
import { canvasService } from '../services/canvasService';
import { useAuth } from './useAuth';

export function useWorkspace() {
  const { user } = useAuth();
  const [workspaces, setWorkspaces] = useState<UIWorkspace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWorkspaces = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await workspaceService.getWorkspaces(user.id);
      
      const workspacesWithCanvases: UIWorkspace[] = await Promise.all(
        data.map(async (ws, index) => {
          const canvases = await canvasService.getCanvases(ws.workSpaceId);
          return {
            id: String(ws.workSpaceId),
            name: ws.workSpaceName,
            color: WORKSPACE_COLORS[index % WORKSPACE_COLORS.length],
            canvases: canvases.map(c => ({ id: String(c.canvasId), name: c.canvasName })),
          };
        })
      );
      
      setWorkspaces(workspacesWithCanvases);
    } catch (err: any) {
      setError(err.message || 'Failed to load workspaces');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadWorkspaces();
  }, [loadWorkspaces]);

  const createWorkspace = async (name: string) => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const newWs = await workspaceService.createWorkspace(user.id, name);
      const uiWs: UIWorkspace = {
        id: String(newWs.workSpaceId),
        name: newWs.workSpaceName,
        color: WORKSPACE_COLORS[workspaces.length % WORKSPACE_COLORS.length],
        canvases: [],
      };
      setWorkspaces((prev) => [...prev, uiWs]);
      return uiWs;
    } catch (err: any) {
      setError(err.message || 'Failed to create workspace');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWorkspace = async (workspaceId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await workspaceService.deleteWorkspace(Number(workspaceId));
      setWorkspaces((prev) => prev.filter(w => w.id !== workspaceId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete workspace');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createCanvas = async (workspaceId: string, name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newCanvas = await canvasService.createCanvas(Number(workspaceId), name);
      setWorkspaces((prev) =>
        prev.map((ws) =>
          ws.id === workspaceId
            ? { ...ws, canvases: [...ws.canvases, { id: String(newCanvas.canvasId), name: newCanvas.canvasName }] }
            : ws
        )
      );
      return newCanvas;
    } catch (err: any) {
      setError(err.message || 'Failed to create canvas');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    workspaces,
    isLoading,
    error,
    createWorkspace,
    deleteWorkspace,
    createCanvas,
    refreshWorkspaces: loadWorkspaces,
  };
}
