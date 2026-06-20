import { apiClient } from '../api/client';
import { Canvas } from '../types/canvas';

export const canvasService = {
  getCanvases: async (workspaceId: number): Promise<Canvas[]> => {
    return apiClient.get<Canvas[]>(`/canvas/workspace/${workspaceId}`);
  },

  createCanvas: async (workspaceId: number, name: string): Promise<Canvas> => {
    return apiClient.post<Canvas>(`/canvas/workspace/${workspaceId}`, { canvasName: name });
  },

  deleteCanvas: async (canvasId: number): Promise<void> => {
    return apiClient.delete<void>(`/canvas/${canvasId}`);
  },

  loadCanvas: async (canvasId: number): Promise<{ components: any[], edges: any[] }> => {
    return apiClient.get<{ components: any[], edges: any[] }>(`/canvas/${canvasId}/load`);
  },
};
