// CanvasArea.jsx
// Integrates React Flow to provide an interactive canvas with nodes and edges.
import React from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './CanvasArea.css';

export default function CanvasArea({ 
  nodes, 
  edges, 
  onNodesChange, 
  onEdgesChange, 
  onConnect, 
  onNodeDragStop, 
  onNodesDelete, 
  onEdgesDelete 
}) {
  return (
    <div className="canvas-area-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        fitView
      >
        <Background variant="dots" gap={20} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
