import { fetchApi } from '../lib/api';

export interface Workspace {
  workSpaceId: number;
  workSpaceName: string;
  userId: string;
  createdAt: string;
}

export const workspaceService = {
  fetchWorkspaces: (userId: string): Promise<Workspace[]> => 
    fetchApi(`/workspace/user/${userId}`),
    
  createWorkspace: (userId: string, name: string): Promise<Workspace> => 
    fetchApi(`/workspace/user/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ workSpaceName: name })
    }),
    
  deleteWorkspace: (workspaceId: number): Promise<void> => 
    fetchApi(`/workspace/${workspaceId}`, {
      method: 'DELETE'
    })
};
