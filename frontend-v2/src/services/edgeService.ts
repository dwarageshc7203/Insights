import { apiClient } from '../api/client';
import { EdgeData } from '../types/edge';

export const edgeService = {
  createEdge: async (canvasId: number, edgeData: Partial<EdgeData>): Promise<EdgeData> => {
    return apiClient.post<EdgeData>(`/edge/canvas/${canvasId}`, edgeData);
  },

  updateLabel: async (edgeId: number, edgeName: string): Promise<EdgeData> => {
    return apiClient.patch<EdgeData>(`/edge/${edgeId}/label`, { edgeName });
  },

  deleteEdge: async (edgeId: number): Promise<void> => {
    return apiClient.delete<void>(`/edge/${edgeId}`);
  },
};
