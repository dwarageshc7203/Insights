import { apiClient } from '../api/client';
import { Workspace } from '../types/workspace';

export const workspaceService = {
  getWorkspaces: async (userId: string): Promise<Workspace[]> => {
    return apiClient.get<Workspace[]>(`/workspace/user/${userId}`);
  },

  createWorkspace: async (userId: string, name: string): Promise<Workspace> => {
    return apiClient.post<Workspace>(`/workspace/user/${userId}`, { workSpaceName: name });
  },

  deleteWorkspace: async (workspaceId: number): Promise<void> => {
    return apiClient.delete<void>(`/workspace/${workspaceId}`);
  },
};
