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
import { mapComponentToNode } from '../components/canvas/nodes';
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
  const [pendingEditNodeId, setPendingEditNodeId] = useState(null);

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
    setNodes(data.components.map(mapComponentToNode));
    setEdges(data.edges.map(e => ({
      id: String(e.edgeId),
      source: String(e.sourceId),
      target: String(e.targetId),
      selectable: true,
      focusable: true,
    })));
    setPendingEditNodeId(null);
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
      async (changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds));

        for (const change of changes) {
          if (change.type === 'dimensions' && change.dimensions) {
            try {
              await api.updateComponentSize(
                  parseInt(change.id, 10),
                  change.dimensions.width,
                  change.dimensions.height
              );
            } catch (err) {
              console.error(err);
            }
          }
        }
      },
      []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(async (params) => {
    if (!selectedCanvas) return;
    // Set UI optimistically
    setEdges((eds) => addEdge({ ...params, selectable: true, focusable: true }, eds));
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

  const handleTextSave = useCallback(async (nodeId, textContent) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, textContent, label: textContent } }
          : n
      )
    );
    try {
      await api.updateComponentTextContent(parseInt(nodeId, 10), textContent);
    } catch (err) {
      console.error('Failed to save text content:', err);
    }
  }, []);

  const handleColorChange = useCallback(
      async (nodeId, color) => {
        setNodes((nds) =>
            nds.map((n) =>
                n.id === nodeId
                    ? { ...n, data: { ...n.data, color } }
                    : n
            )
        )

        try {
          await api.updateComponentColor(
              parseInt(nodeId, 10),
              color
          )
        } catch (err) {
          console.error(err)
        }
      },
      []
  );

  const handleImageChange = useCallback(
      async (nodeId, imgUrl) => {
        setNodes((nds) =>
            nds.map((n) =>
                n.id === nodeId
                    ? { ...n, data: { ...n.data, imgUrl } }
                    : n
            )
        )

        try {
          await api.updateComponentImage(
              parseInt(nodeId, 10),
              imgUrl
          )
        } catch (err) {
          console.error(err)
        }
      },
      []
  );

  const handleAddComponent = async (type, position = null) => {
    if (!selectedCanvas) return;
    const offset = nodes.length * 30;
    const positionX = position?.x ?? 100 + offset;
    const positionY = position?.y ?? 100 + offset;
    const compData = {
      componentName: type === 'TEXT' ? 'Text' : type === 'IMAGE' ? 'Image' : 'Shape',
      componentType: type,
      textContent: type === 'TEXT' ? 'New Text' : '',
      color: type === 'NODE' ? '#e2f048' : '#ffffff',
      positionX,
      positionY,
    };
    const newComp = await api.createComponent(selectedCanvas.canvasId, compData);
    const newNode = { ...mapComponentToNode(newComp), selected: true };
    setNodes((nds) => [
      ...nds.map((n) => ({ ...n, selected: false })),
      newNode,
    ]);
    setEdges((eds) => eds.map((e) => ({ ...e, selected: false })));
    if (type === 'TEXT') {
      setPendingEditNodeId(newNode.id);
    }
  };

  const handleCreateTextAt = useCallback(
    (position) => handleAddComponent('TEXT', position),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCanvas, nodes.length]
  );

  const handleNodeEditRequest = useCallback((nodeId) => {
    setPendingEditNodeId(nodeId);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        selected: n.id === nodeId,
      }))
    );
    setEdges((eds) => eds.map((e) => ({ ...e, selected: false })));
  }, []);

  const handleClearPendingEdit = useCallback(() => {
    setPendingEditNodeId(null);
  }, []);

  if (loading) {
    return (
      <div className="main-layout">
        <TopBar user={user} workspaceName={selectedWorkspace?.workSpaceName} />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading Workspaces...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-layout">
      <TopBar user={user} workspaceName={selectedWorkspace?.workSpaceName} />
      <div className="main-content">
        <Sidebar 
          workspaces={workspaces}
          selectedWorkspace={selectedWorkspace}
          canvases={canvases}
          selectedCanvas={selectedCanvas}
          onSelectCanvas={handleSelectCanvas}
          onSelectWorkspace={handleSelectWorkspace}
          onCreateWorkspace={handleCreateWorkspace}
          onDeleteWorkspace={handleDeleteWorkspace}
        />
        <div className="canvas-wrapper">
          {!selectedWorkspace ? (
            <div className="canvas-inner canvas-inner--standalone">
              <div className="canvas-empty-state">
                <div className="canvas-empty-state-visual" aria-hidden="true" />
                <h2 className="canvas-empty-state-title">No workspace selected</h2>
                <p className="canvas-empty-state-description">
                  Create or select a workspace from the sidebar to begin
                </p>
              </div>
            </div>
          ) : (
            <div className="canvas-inner">
              <CanvasTabBar
                canvases={canvases}
                selectedCanvas={selectedCanvas}
                onSelectCanvas={handleSelectCanvas}
                onCreateCanvas={handleCreateCanvas}
                onDeleteCanvas={handleDeleteCanvas}
              />
              <div className="canvas-body">
                {selectedCanvas ? (
                  <CanvasArea
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeDragStop={onNodeDragStop}
                    onNodesDelete={onNodesDelete}
                    onEdgesDelete={onEdgesDelete}
                    onTextSave={handleTextSave}
                    onColorChange={handleColorChange}
                    onImageChange={handleImageChange}
                    onPaneCreateText={handleCreateTextAt}
                    onNodeEditRequest={handleNodeEditRequest}
                    pendingEditNodeId={pendingEditNodeId}
                    onClearPendingEdit={handleClearPendingEdit}
                    toolbar={
                      <ComponentToolbar
                        onAddText={() => handleAddComponent('TEXT')}
                        onAddImage={() => handleAddComponent('IMAGE')}
                        onAddShape={() => handleAddComponent('NODE')}
                      />
                    }
                  />
                ) : (
                  <div className="canvas-empty-state">
                    <div className="canvas-empty-state-visual" aria-hidden="true" />
                    <h2 className="canvas-empty-state-title">No canvas open</h2>
                    <p className="canvas-empty-state-description">
                      Select a canvas from the tabs above or create a new one with +
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
