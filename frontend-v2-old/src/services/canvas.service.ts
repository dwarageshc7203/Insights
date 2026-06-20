import { fetchApi } from '../lib/api';

export interface Canvas {
  canvasId: number;
  canvasName: string;
  workSpaceId: number;
}

export const canvasService = {
  fetchCanvases: (workspaceId: number): Promise<Canvas[]> => 
    fetchApi(`/canvas/workspace/${workspaceId}`),
    
  createCanvas: (workspaceId: number, name: string): Promise<Canvas> => 
    fetchApi(`/canvas/workspace/${workspaceId}`, {
      method: 'POST',
      body: JSON.stringify({ canvasName: name })
    }),
    
  deleteCanvas: (canvasId: number): Promise<void> => 
    fetchApi(`/canvas/${canvasId}`, {
      method: 'DELETE'
    })
};
