import { useState, useCallback } from 'react';
import { Node, Edge, applyNodeChanges, applyEdgeChanges, addEdge, Connection, NodeChange, EdgeChange } from '@xyflow/react';
import { canvasService } from '../services/canvasService';
import { componentService } from '../services/componentService';
import { edgeService } from '../services/edgeService';
import { mapComponentToNode, mapEdgeToFlowEdge } from '../utils/nodeMapper';

export function useCanvasFlow(canvasId: string | null) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [pendingEditNodeId, setPendingEditNodeId] = useState<string | null>(null);

  const loadCanvas = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await canvasService.loadCanvas(Number(id));
      setNodes(data.components.map(mapComponentToNode));
      setEdges(data.edges.map(mapEdgeToFlowEdge));
      setPendingEditNodeId(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load canvas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onNodesChange = useCallback(async (changes: NodeChange[]) => {
    setNodes((nds) => {
      let nextNodes = applyNodeChanges(changes, nds);
      // Immediately reflect resize dimension changes in node data & style
      changes.forEach(change => {
        if (change.type === 'dimensions' && change.dimensions) {
          nextNodes = nextNodes.map(n => 
            n.id === change.id 
              ? {
                  ...n,
                  data: { ...n.data, width: change.dimensions.width, height: change.dimensions.height },
                  style: { ...n.style, width: change.dimensions.width, height: change.dimensions.height }
                } 
              : n
          );
        }
      });
      return nextNodes;
    });

    for (const change of changes) {
      if (change.type === 'dimensions' && change.dimensions && !change.resizing) {
        try {
          await componentService.updateSize(
            Number(change.id),
            Math.round(change.dimensions.width),
            Math.round(change.dimensions.height)
          );
        } catch (err) {
          console.error('Failed to update size', err);
        }
      }
    }
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback(async (params: Connection) => {
    if (!canvasId || !params.source || !params.target) return;
    const tempId = `temp-${Date.now()}`;
    const newEdge = { 
      ...params, 
      id: tempId, 
      type: 'editable',
      selectable: true, 
      focusable: true, 
      markerEnd: { type: 'arrowclosed' as any }, 
      label: '', 
      labelStyle: { fontSize: 12, fill: '#333' }, 
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 }, 
      labelShow: true 
    };
    
    setEdges((eds) => addEdge(newEdge, eds));
    
    try {
      const edge = await edgeService.createEdge(Number(canvasId), {
        edgeName: 'connection',
        sourceId: params.source,
        targetId: params.target
      });
      
      setEdges((eds) =>
        eds.map((e) =>
          e.id === tempId ? { ...e, id: String(edge.edgeId) } : e
        )
      );
    } catch (error) {
      console.error('Failed to create edge:', error);
      setEdges((eds) => eds.filter(e => e.id !== tempId));
    }
  }, [canvasId]);

  const onNodeDragStop = useCallback(async (event: any, node: Node) => {
    try {
      await componentService.updatePosition(Number(node.id), node.position.x, node.position.y);
    } catch (err) {
      console.error('Failed to update position', err);
    }
  }, []);

  const onNodesDelete = useCallback(async (deletedNodes: Node[]) => {
    for (const node of deletedNodes) {
      try {
        await componentService.deleteComponent(Number(node.id));
      } catch (err) {
        console.error('Failed to delete component', err);
      }
    }
  }, []);

  const onEdgesDelete = useCallback(async (deletedEdges: Edge[]) => {
    for (const edge of deletedEdges) {
      try {
        await edgeService.deleteEdge(Number(edge.id));
      } catch (err) {
        console.error('Failed to delete edge', err);
      }
    }
  }, []);

  const handleAddComponent = async (type: string, position: { x: number, y: number } | null = null, shapeType: string | null = null, color: string | null = null) => {
    if (!canvasId) return;
    const offset = nodes.length * 30;
    const positionX = position?.x ?? 100 + offset;
    const positionY = position?.y ?? 100 + offset;
    
    const compData = {
      componentName: type === 'TEXT' ? 'Text' : type === 'IMAGE' ? 'Image' : 'Shape',
      type: type,
      textContent: type === 'TEXT' ? 'New Text' : '',
      color: type === 'NODE' ? color || '#39FF14' : '#ffffff',
      positionX,
      positionY,
      ...(type === 'NODE' && shapeType ? { shapeType } : {}),
    };
    
    try {
      const newComp = await componentService.createComponent(Number(canvasId), compData);
      const newNode = { ...mapComponentToNode(newComp), selected: true };
      
      setNodes((nds) => [
        ...nds.map((n) => ({ ...n, selected: false })),
        newNode as Node,
      ]);
      setEdges((eds) => eds.map((e) => ({ ...e, selected: false })));
      
      if (type === 'TEXT') {
        setPendingEditNodeId(newNode.id);
      }
    } catch (err) {
      console.error('Failed to add component', err);
    }
  };

  const handleTextSave = useCallback(async (nodeId: string, textContent: string) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, textContent, label: textContent } }
          : n
      )
    );
    try {
      await componentService.updateTextContent(Number(nodeId), textContent);
    } catch (err) {
      console.error('Failed to save text content:', err);
    }
  }, []);

  const handleColorChange = useCallback(async (nodeId: string, color: string) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, color } }
          : n
      )
    );
    try {
      await componentService.updateColor(Number(nodeId), color);
    } catch (err) {
      console.error('Failed to change color', err);
    }
  }, []);

  const handleImageChange = useCallback(async (nodeId: string, imgUrl: string) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, imgUrl } }
          : n
      )
    );
    try {
      await componentService.updateImage(Number(nodeId), imgUrl);
    } catch (err) {
      console.error('Failed to change image', err);
    }
  }, []);

  const handleEdgeLabelChange = useCallback(async (edgeId: string, newLabel: string) => {
    setEdges((eds) =>
      eds.map((e) =>
        e.id === edgeId
          ? { ...e, label: newLabel }
          : e
      )
    );
    try {
      const response = await edgeService.updateLabel(Number(edgeId), newLabel);
      setEdges((eds) =>
        eds.map((e) =>
          e.id === edgeId
            ? { ...e, label: response.edgeName || newLabel }
            : e
        )
      );
    } catch (err) {
      console.error('Failed to update edge label', err);
    }
  }, []);

  return {
    nodes,
    edges,
    isLoading,
    error,
    selectedNodeId,
    pendingEditNodeId,
    setSelectedNodeId,
    setPendingEditNodeId,
    loadCanvas,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeDragStop,
    onNodesDelete,
    onEdgesDelete,
    handleAddComponent,
    handleTextSave,
    handleColorChange,
    handleImageChange,
    handleEdgeLabelChange,
  };
}
