// MainPage.jsx
// The main application container that holds global state, wiring up the API, sidebar, tab bar, and canvas components.
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { applyNodeChanges, applyEdgeChanges, addEdge, MarkerType } from '@xyflow/react';
import { supabase } from '../supabaseClient';
import { api } from '../services/api';

import Sidebar from '../components/sidebar/Sidebar';
import AiSidebar from '../components/canvas/ai/AiSidebar';
import { extractGraphData } from '../services/graphExtractor';
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
  const [isAiOpen, setIsAiOpen] = useState(() => sessionStorage.getItem('aiSidebarOpen') === 'true');
  const [pendingEditNodeId, setPendingEditNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Auth and init
  useEffect(() => {
    sessionStorage.setItem('aiSidebarOpen', isAiOpen);
  }, [isAiOpen]);

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
    console.log("LOADED COMPONENTS", data.components);
    const mapped = data.components.map(mapComponentToNode);

    console.log(
        "FINAL NODES",
        mapped.map(n => ({
          id: n.id,
          type: n.type
        }))
    );

    setNodes(mapped);
    setNodes(data.components.map(mapComponentToNode));
    setEdges(data.edges.map(e => ({
      id: String(e.edgeId),
      source: String(e.sourceId),
      target: String(e.targetId),
      selectable: true,
      focusable: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      label: e.edgeName || '',
      labelStyle: { fontSize: 12, fill: '#333' },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
      labelShow: true,
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
        console.log('Node changes:', changes);
        setNodes((nds) => applyNodeChanges(changes, nds));

        for (const change of changes) {
          if (change.type === 'dimensions' && change.dimensions && !change.resizing) {
            console.log('Dimension change for node:', change.id, change.dimensions);
            try {
              const response = await api.updateComponentSize(
                  parseInt(change.id, 10),
                  Math.round(change.dimensions.width),
                  Math.round(change.dimensions.height)
              );
              console.log('Size updated successfully for node:', change.id, response);
              // Update local state with API response to ensure consistency
              setNodes((nds) =>
                nds.map((n) =>
                  n.id === change.id
                    ? {
                        ...n,
                        data: { ...n.data, width: response.width, height: response.height },
                        style: { ...n.style, width: response.width, height: response.height }
                      }
                    : n
                )
              );
            } catch (err) {
              console.error('Failed to update size for node:', change.id, err);
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
    const tempId = `temp-${Date.now()}`;
    // Set UI optimistically
    setEdges((eds) => addEdge({ ...params, id: tempId, selectable: true, focusable: true, markerEnd: { type: MarkerType.ArrowClosed }, label: '', labelStyle: { fontSize: 12, fill: '#333' }, labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 }, labelShow: true }, eds));
    // Persist
    try {
      const edge = await api.createEdge(selectedCanvas.canvasId, {
        edgeName: 'connection',
        color: '#000000',
        sourceId: parseInt(params.source, 10),
        targetId: parseInt(params.target, 10)
      });
      console.log('Edge created successfully:', edge);
      // Update the edge ID with the one from the backend
      setEdges((eds) =>
        eds.map((e) =>
          e.id === tempId ? { ...e, id: String(edge.edgeId) } : e
        )
      );
    } catch (error) {
      console.error('Failed to create edge:', error);
      // Remove the optimistically added edge if creation failed
      setEdges((eds) => eds.filter(e => e.id !== tempId));
    }
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

  const handleAddComponent = async (type, position = null, shapeType = null, color = null) => {
    if (!selectedCanvas) return;
    const offset = nodes.length * 30;
    const positionX = position?.x ?? 100 + offset;
    const positionY = position?.y ?? 100 + offset;
    const compData = {
      componentName: type === 'TEXT' ? 'Text' : type === 'IMAGE' ? 'Image' : 'Shape',
      type: type,
      textContent: type === 'TEXT' ? 'New Text' : '',
      color:
          type === 'NODE'
              ? color || '#39FF14'
              : '#ffffff',
      positionX,
      positionY,
      ...(type === 'NODE' && shapeType ? { shapeType } : {}),
    };
    const newComp = await api.createComponent(selectedCanvas.canvasId, compData);
    console.log("CREATED COMPONENT", newComp);
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

  const handleDropImage = async (position, imgUrl) => {
    if (!selectedCanvas) return;
    const compData = {
      componentName: 'Image',
      type: 'IMAGE',
      textContent: '',
      color: '#ffffff',
      positionX: position.x,
      positionY: position.y,
    };
    
    // Create the component first
    const newComp = await api.createComponent(selectedCanvas.canvasId, compData);
    
    // Then upload the image
    try {
      await api.updateComponentImage(newComp.componentId, imgUrl);
    } catch (err) {
      console.error('Failed to update image after drop:', err);
    }
    
    // Optimistically update the UI
    newComp.imgUrl = imgUrl;
    
    const newNode = { ...mapComponentToNode(newComp), selected: true };
    setNodes((nds) => [
      ...nds.map((n) => ({ ...n, selected: false })),
      newNode,
    ]);
    setEdges((eds) => eds.map((e) => ({ ...e, selected: false })));
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

  const handleEdgeLabelChange = useCallback(async (edgeId, newLabel) => {
    console.log('Edge label changed:', edgeId, newLabel);
    // Update local state optimistically
    setEdges((eds) => {
      const updatedEdges = eds.map((e) =>
        e.id === edgeId
          ? { ...e, label: newLabel }
          : e
      );
      return updatedEdges;
    });
    // Persist the label change
    try {
      const response = await api.updateEdgeLabel(parseInt(edgeId, 10), newLabel);
      console.log('Edge label updated successfully:', response);
      // Update local state with API response
      setEdges((eds) => {
        const updatedEdges = eds.map((e) =>
          e.id === edgeId
            ? { ...e, label: response.edgeName || newLabel }
            : e
        );
        return updatedEdges;
      });
    } catch (err) {
      console.error('Failed to update edge label:', err);
    }
  }, []);
const handleShapePaletteClick = useCallback(
      async (color) => {
        console.log('PALETTE RECEIVED', color);

        if (selectedNodeId) {
          await handleColorChange(selectedNodeId, color);
          return;
        }

        await handleAddComponent(
            'NODE',
            null,
            'square',
            color
        );
      },
      [
        selectedNodeId,
        handleColorChange
      ]
  );
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
                      onTextSave={handleTextSave}
                      onColorChange={handleColorChange}
                      onImageChange={handleImageChange}
                      onPaneCreateText={handleCreateTextAt}
                      onNodeEditRequest={handleNodeEditRequest}
                      pendingEditNodeId={pendingEditNodeId}
                      onClearPendingEdit={handleClearPendingEdit}
                      onPaneDropImage={handleDropImage}
                      onEdgeLabelChange={handleEdgeLabelChange}
                      toolbar={
                        <ComponentToolbar
                          onAddText={() => handleAddComponent('TEXT')}
                          onAddImage={() => handleAddComponent('IMAGE')}
                          onAddShape={(shape, color) =>
                            handleAddComponent('NODE', null, shape, color)
                          }
                          onShapeColorSelect={handleShapePaletteClick}
                        />
                      }
                      selectedNodeId={selectedNodeId}
                      onSelectedNodeChange={setSelectedNodeId}
                    />
                    {/* AI Trigger Button */}
                    <button className="ai-trigger-button" onClick={() => setIsAiOpen(true)} title="Open AI Analysis">
                      🤖
                    </button>
                    {/* AI Sidebar */}
                    <AiSidebar
                      isOpen={isAiOpen}
                      onClose={() => setIsAiOpen(false)}
                      graphData={extractGraphData(nodes, edges)}
                    />
                  </>
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
