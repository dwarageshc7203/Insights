import { apiClient } from '../api/client';
import { ComponentData } from '../types/component';

export const componentService = {
  createComponent: async (canvasId: number, componentData: Partial<ComponentData>): Promise<ComponentData> => {
    return apiClient.post<ComponentData>(`/component/canvas/${canvasId}`, componentData);
  },

  updatePosition: async (componentId: number, positionX: number, positionY: number): Promise<ComponentData> => {
    return apiClient.patch<ComponentData>(`/component/${componentId}/position`, { positionX, positionY });
  },

  updateTextContent: async (componentId: number, textContent: string): Promise<ComponentData> => {
    return apiClient.patch<ComponentData>(`/component/${componentId}/text`, { textContent });
  },

  updateSize: async (componentId: number, width: number, height: number): Promise<ComponentData> => {
    return apiClient.patch<ComponentData>(`/component/${componentId}/size`, { width, height });
  },

  updateColor: async (componentId: number, color: string): Promise<ComponentData> => {
    return apiClient.patch<ComponentData>(`/component/${componentId}/color`, { color });
  },

  updateImage: async (componentId: number, imgUrl: string): Promise<ComponentData> => {
    return apiClient.patch<ComponentData>(`/component/${componentId}/image`, { imgUrl });
  },

  deleteComponent: async (componentId: number): Promise<void> => {
    return apiClient.delete<void>(`/component/${componentId}`);
  },
};
