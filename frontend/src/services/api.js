import { supabase } from '../supabaseClient'

const BASE_URL = 'http://localhost:8080'

const getHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token}`
  }
}

export const api = {
  syncUser: async (userData) => {
    const headers = await getHeaders()
    const res = await fetch(`${BASE_URL}/auth/sync`, {
      method: 'POST', headers, body: JSON.stringify(userData)
    })
    return res.json()
  },
  getWorkspaces: async (userId) => {
    const headers = await getHeaders()
    const res = await fetch(`${BASE_URL}/workspace/user/${userId}`, { headers })
    return res.json()
  },
  createWorkspace: async (userId, name) => {
    const headers = await getHeaders()
    const res = await fetch(`${BASE_URL}/workspace/user/${userId}`, {
      method: 'POST', headers, body: JSON.stringify({ workSpaceName: name })
    })
    return res.json()
  },
  deleteWorkspace: async (workSpaceId) => {
    const headers = await getHeaders()
    await fetch(`${BASE_URL}/workspace/${workSpaceId}`, {
      method: 'DELETE', headers
    })
  },
  getCanvases: async (workSpaceId) => {
    const headers = await getHeaders()
    const res = await fetch(`${BASE_URL}/canvas/workspace/${workSpaceId}`, { headers })
    return res.json()
  },
  createCanvas: async (workSpaceId, name) => {
    const headers = await getHeaders()
    const res = await fetch(`${BASE_URL}/canvas/workspace/${workSpaceId}`, {
      method: 'POST', headers, body: JSON.stringify({ canvasName: name })
    })
    return res.json()
  },
  loadCanvas: async (canvasId) => {
    const headers = await getHeaders()
    const res = await fetch(`${BASE_URL}/canvas/${canvasId}/load`, { headers })
    return res.json()
  },
  deleteCanvas: async (canvasId) => {
    const headers = await getHeaders()
    await fetch(`${BASE_URL}/canvas/${canvasId}`, {
      method: 'DELETE', headers
    })
  },
  createComponent: async (canvasId, componentData) => {
    const headers = await getHeaders()
    const res = await fetch(`${BASE_URL}/component/canvas/${canvasId}`, {
      method: 'POST', headers, body: JSON.stringify(componentData)
    })
    return res.json()
  },
  updateComponentPosition: async (componentId, positionX, positionY) => {
    const headers = await getHeaders()
    const res = await fetch(`${BASE_URL}/component/${componentId}/position`, {
      method: 'PATCH', headers,
      body: JSON.stringify({ positionX, positionY })
    })
    return res.json()
  },
  updateComponentTextContent: async (componentId, textContent) => {
    const headers = await getHeaders()
    const res = await fetch(`${BASE_URL}/component/${componentId}/text`, {
      method: 'PATCH', headers,
      body: JSON.stringify({ textContent })
    })
    if (!res.ok) {
      throw new Error(`Failed to update text: ${res.status}`)
    }
    return res.json()
  },
  deleteComponent: async (componentId) => {
    const headers = await getHeaders()
    await fetch(`${BASE_URL}/component/${componentId}`, {
      method: 'DELETE', headers
    })
  },
  createEdge: async (canvasId, edgeData) => {
    const headers = await getHeaders()
    const res = await fetch(`${BASE_URL}/edge/canvas/${canvasId}`, {
      method: 'POST', headers, body: JSON.stringify(edgeData)
    })
    return res.json()
  },
  deleteEdge: async (edgeId) => {
    const headers = await getHeaders()
    await fetch(`${BASE_URL}/edge/${edgeId}`, {
      method: 'DELETE', headers
    })
  },
  updateComponentSize: async (componentId, width, height) => {
    const headers = await getHeaders();

    const res = await fetch(
        `${BASE_URL}/component/${componentId}/size`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            width,
            height,
          }),
        }
    );

    return res.json();
  },

  updateComponentColor: async (componentId, color) => {
    const headers = await getHeaders();

    const res = await fetch(
        `${BASE_URL}/component/${componentId}/color`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            color,
          }),
        }
    );

    return res.json();
  },

  updateComponentImage: async (componentId, imgUrl) => {
    const headers = await getHeaders();

    const res = await fetch(
        `${BASE_URL}/component/${componentId}/image`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            imgUrl,
          }),
        }
    );

    return res.json();
  },


}
