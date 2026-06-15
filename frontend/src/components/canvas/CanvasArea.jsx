// CanvasArea.jsx
// Integrates React Flow to provide an interactive canvas with nodes and edges.
import React, { useRef, useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  ConnectionMode,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './nodes';
import { CanvasInteractionProvider } from './CanvasInteractionContext';
import './nodes/nodes.css';
import './CanvasArea.css';

function CanvasFlow({
                      nodes,
                      edges,
                      onNodesChange,
                      onEdgesChange,
                      onConnect,
                      onNodeDragStop,
                      onNodesDelete,
                      onEdgesDelete,
                      onNodeDoubleClick,
                      onPaneCreateText,
                      editingNodeId,
                      onNodeClick,
                      onPaneDeselect,
                      onPaneDropImage,
                    }) {
  const { screenToFlowPosition } = useReactFlow();
  const lastPaneClick = useRef(null);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDrop = useCallback(async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const reader = new FileReader();
    reader.onload = () => {
      onPaneDropImage(position, reader.result);
    };
    reader.readAsDataURL(file);
  }, [screenToFlowPosition, onPaneDropImage]);

  const handlePaneClick = useCallback(
      (event) => {
        onPaneDeselect?.();

        const now = Date.now();
        const { clientX, clientY } = event;

        if (
            lastPaneClick.current &&
            now - lastPaneClick.current.time < 350 &&
            Math.abs(clientX - lastPaneClick.current.x) < 10 &&
            Math.abs(clientY - lastPaneClick.current.y) < 10
        ) {
          const position = screenToFlowPosition({
            x: clientX,
            y: clientY,
          });

          onPaneCreateText(position);
          lastPaneClick.current = null;
          return;
        }

        lastPaneClick.current = {
          time: now,
          x: clientX,
          y: clientY,
        };
      },
      [screenToFlowPosition, onPaneCreateText, onPaneDeselect]
  );

  return (
      <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
          onNodeDoubleClick={onNodeDoubleClick}
          onNodeClick={onNodeClick}
          onPaneClick={handlePaneClick}
          zoomOnDoubleClick={false}
          panOnDrag
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          nodesDraggable={!editingNodeId}
          nodesConnectable={!editingNodeId}
          elementsSelectable
          edgesFocusable
          deleteKeyCode={editingNodeId ? null : ['Backspace', 'Delete']}
          defaultEdgeOptions={{ selectable: true, focusable: true }}
          selectionOnDrag={false}
          fitView
      >
      <Background variant="dots" gap={24} size={2} color="#cfcfcf" />
      <Controls
        position="top-right"
        className="canvas-controls"
        showInteractive={false}
      />
    </ReactFlow>
  );
}

export default function CanvasArea({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeDragStop,
  onNodesDelete,
  onEdgesDelete,
  onTextSave,
  onPaneCreateText,
  onNodeEditRequest,
  pendingEditNodeId,
  onClearPendingEdit,
  toolbar,
    selectedNodeId,
    onSelectedNodeChange,
    onPaneDropImage,
    onImageChange,
}) {
  const [editingNodeId, setEditingNodeId] = useState(null);
  // const [selectedNodeId, setSelectedNodeId] = useState(null);
  const isEmpty = nodes.length === 0;

  const handleNodeDoubleClick = useCallback(
    (event, node) => {
      event.stopPropagation();
      if (node.type === 'text') {
        onNodeEditRequest(node.id);
      }
    },
    [onNodeEditRequest],
  );
  const handleNodeClick = useCallback((event, node) => {
    event.stopPropagation();
      onSelectedNodeChange(node.id);
  }, []);

  // Compute per‑node draggable flag based on selection
  const nodesForFlow = nodes.map(n => ({
    ...n,
    draggable: n.id === selectedNodeId,
    resizable: n.id === selectedNodeId,
    selected: n.id === selectedNodeId,
  }));

  // Migrate edge handle IDs from old format to new format
  const edgesForFlow = edges.map(edge => {
    const migrateHandleId = (handleId, type) => {
      if (!handleId) return null;
      // If already in new format, return as-is
      if (handleId.startsWith('source-') || handleId.startsWith('target-')) {
        return handleId;
      }
      // Migrate old format (e.g., "top") to new format (e.g., "source-top" or "target-top")
      return `${type}-${handleId}`;
    };

    return {
      ...edge,
      sourceHandle: migrateHandleId(edge.sourceHandle, 'source') || 'source-right',
      targetHandle: migrateHandleId(edge.targetHandle, 'target') || 'target-left',
    };
  });

  const interactionValue = {
    pendingEditNodeId,
    clearPendingEditNodeId: onClearPendingEdit,
    setEditingNodeId,
    onTextSave,
    onImageChange,
  };

  return (
    <div className="canvas-area-container">
      <CanvasInteractionProvider value={interactionValue}>
        <ReactFlowProvider>
          <CanvasFlow
            nodes={nodesForFlow}
            edges={edgesForFlow}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDragStop={onNodeDragStop}
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
            onNodeDoubleClick={handleNodeDoubleClick}
            onPaneCreateText={onPaneCreateText}
            editingNodeId={editingNodeId}
            onNodeClick={handleNodeClick}
            onPaneDeselect={() => onSelectedNodeChange(null)}
            onPaneDropImage={onPaneDropImage}
          />
        </ReactFlowProvider>
      </CanvasInteractionProvider>

      {isEmpty && (
        <div className="canvas-empty-overlay">
          <div className="canvas-empty-overlay-visual" aria-hidden="true" />
          <p className="canvas-empty-overlay-title">Start building your canvas</p>
          <p className="canvas-empty-overlay-description">
            Double-click anywhere to add text, or use the toolbar below
          </p>
        </div>
      )}

      {toolbar && (
        <div className="canvas-toolbar-slot">
          {toolbar}
        </div>
      )}
    </div>
  );
}
