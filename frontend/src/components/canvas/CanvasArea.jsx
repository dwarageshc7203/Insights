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
}) {
  const { screenToFlowPosition } = useReactFlow();
  const lastPaneClick = useRef(null);

  const handlePaneClick = useCallback(
    (event) => {
      const now = Date.now();
      const { clientX, clientY } = event;

      if (
        lastPaneClick.current &&
        now - lastPaneClick.current.time < 350 &&
        Math.abs(clientX - lastPaneClick.current.x) < 10 &&
        Math.abs(clientY - lastPaneClick.current.y) < 10
      ) {
        const position = screenToFlowPosition({ x: clientX, y: clientY });
        onPaneCreateText(position);
        lastPaneClick.current = null;
        return;
      }

      lastPaneClick.current = { time: now, x: clientX, y: clientY };
    },
    [screenToFlowPosition, onPaneCreateText],
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
      onPaneClick={handlePaneClick}
      zoomOnDoubleClick={false}
      panOnDrag
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
}) {
  const [editingNodeId, setEditingNodeId] = useState(null);
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

  const interactionValue = {
    pendingEditNodeId,
    clearPendingEditNodeId: onClearPendingEdit,
    setEditingNodeId,
    onTextSave,
  };

  return (
    <div className="canvas-area-container">
      <CanvasInteractionProvider value={interactionValue}>
        <ReactFlowProvider>
          <CanvasFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDragStop={onNodeDragStop}
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
            onNodeDoubleClick={handleNodeDoubleClick}
            onPaneCreateText={onPaneCreateText}
            editingNodeId={editingNodeId}
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
