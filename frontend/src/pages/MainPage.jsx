// MainPage.jsx
// The main application container that holds global state, wiring up the API, sidebar, tab bar, and canvas components.
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { supabase } from '../supabaseClient';
import { api } from '../services/api';

import Sidebar from '../components/sidebar/Sidebar';
import TopBar from '../components/common/TopBar';
import CanvasTabBar from '../components/canvas/CanvasTabBar';
import CanvasArea from '../components/canvas/CanvasArea';
import ComponentToolbar from '../components/canvas/ComponentToolbar';
import '../styles/tokens.css';
import './MainPage.css';

export default function MainPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // State
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [canvases, setCanvases] = useState([]);
  const [selectedCanvas, setSelectedCanvas] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Auth and init
  useEffect(() => {
    const initApp = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      const user = session?.user;
      
      if (!user) {
        navigate('/login');
        return;
      }
      setUser(user);
      
      // Ensure profile exists in backend
      await api.syncUser({
        userId: user.id,
        userName: user.user_metadata?.full_name || 'User',
        email: user.email
      });

      // Load workspaces
      const wsList = await api.getWorkspaces(user.id);
      setWorkspaces(wsList);
      if (wsList.length > 0) {
        handleSelectWorkspace(wsList[0]);
      } else {
        setLoading(false);
      }
    };
    initApp();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // Actions
  const handleSelectWorkspace = async (workspace) => {
    setSelectedWorkspace(workspace);
    const cvsList = await api.getCanvases(workspace.workSpaceId);
    setCanvases(cvsList);
    if (cvsList.length > 0) {
      await handleSelectCanvas(cvsList[0]);
    } else {
      setSelectedCanvas(null);
      setNodes([]);
      setEdges([]);
    }
    setLoading(false);
  };

  const handleSelectCanvas = async (canvas) => {
    setSelectedCanvas(canvas);
    const data = await api.loadCanvas(canvas.canvasId);
    setNodes(data.components.map(c => ({
      id: String(c.componentId),
      position: { x: c.positionX, y: c.positionY },
      data: { label: c.textContent || c.componentName },
      type: 'default'
    })));
    setEdges(data.edges.map(e => ({
      id: String(e.edgeId),
      source: String(e.sourceId),
      target: String(e.targetId)
    })));
  };

  const handleCreateWorkspace = async (name) => {
    if (!user) return;
    const newWs = await api.createWorkspace(user.id, name);
    setWorkspaces([...workspaces, newWs]);
    handleSelectWorkspace(newWs);
  };

  const handleDeleteWorkspace = async (workSpaceId) => {
    await api.deleteWorkspace(workSpaceId);
    setWorkspaces(workspaces.filter(w => w.workSpaceId !== workSpaceId));
    if (selectedWorkspace?.workSpaceId === workSpaceId) {
      setSelectedWorkspace(null);
      setCanvases([]);
      setSelectedCanvas(null);
      setNodes([]);
      setEdges([]);
    }
  };

  const handleCreateCanvas = async (name) => {
    if (!selectedWorkspace) return;
    const newCanvas = await api.createCanvas(selectedWorkspace.workSpaceId, name);
    setCanvases([...canvases, newCanvas]);
    handleSelectCanvas(newCanvas);
  };

  const handleDeleteCanvas = async (canvasId) => {
    await api.deleteCanvas(canvasId);
    setCanvases(canvases.filter(c => c.canvasId !== canvasId));
    if (selectedCanvas?.canvasId === canvasId) {
      setSelectedCanvas(null);
      setNodes([]);
      setEdges([]);
    }
  };

  // Canvas Actions
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(async (params) => {
    if (!selectedCanvas) return;
    // Set UI optimistically
    setEdges((eds) => addEdge(params, eds));
    // Persist
    await api.createEdge(selectedCanvas.canvasId, {
      edgeName: 'connection',
      color: '#000000',
      sourceId: params.source,
      targetId: params.target
    });
  }, [selectedCanvas]);

  const onNodeDragStop = async (event, node) => {
    await api.updateComponentPosition(parseInt(node.id), node.position.x, node.position.y);
  };

  const onNodesDelete = async (deletedNodes) => {
    for (const node of deletedNodes) {
      await api.deleteComponent(parseInt(node.id));
    }
  };

  const onEdgesDelete = async (deletedEdges) => {
    for (const edge of deletedEdges) {
      await api.deleteEdge(parseInt(edge.id));
    }
  };

  // Toolbar actions
  const handleAddComponent = async (type) => {
    if (!selectedCanvas) return;
    const compData = {
      componentName: type === 'TEXT' ? 'Text' : type === 'IMAGE' ? 'Image' : 'Shape',
      componentType: type,
      textContent: type === 'TEXT' ? 'New Text' : '',
      color: '#ffffff',
      positionX: 100,
      positionY: 100
    };
    const newComp = await api.createComponent(selectedCanvas.canvasId, compData);
    setNodes((nds) => [...nds, {
      id: String(newComp.componentId),
      position: { x: newComp.positionX, y: newComp.positionY },
      data: { label: newComp.textContent || newComp.componentName },
      type: 'default'
    }]);
  };

  if (loading) {
    return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Loading Workspaces...</div>;
  }

  return (
    <div className="main-layout">
      <TopBar />
      <div className="main-content">
        <Sidebar 
          workspaces={workspaces}
          selectedWorkspace={selectedWorkspace}
          onSelectWorkspace={handleSelectWorkspace}
          onCreateWorkspace={handleCreateWorkspace}
          onDeleteWorkspace={handleDeleteWorkspace}
        />
        <div className="canvas-wrapper">
          {selectedWorkspace && (
            <div className="canvas-inner">
              <CanvasTabBar 
                canvases={canvases}
                selectedCanvas={selectedCanvas}
                onSelectCanvas={handleSelectCanvas}
                onCreateCanvas={handleCreateCanvas}
                onDeleteCanvas={handleDeleteCanvas}
              />
              {selectedCanvas ? (
                <>
                  <CanvasArea 
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeDragStop={onNodeDragStop}
                    onNodesDelete={onNodesDelete}
                    onEdgesDelete={onEdgesDelete}
                  />
                  <ComponentToolbar 
                    onAddText={() => handleAddComponent('TEXT')}
                    onAddImage={() => handleAddComponent('IMAGE')}
                    onAddShape={() => handleAddComponent('NODE')}
                  />
                </>
              ) : (
                <div className="empty-canvas">Select or create a canvas to get started</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
