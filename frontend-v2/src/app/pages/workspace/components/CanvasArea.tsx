import { ZoomIn, ZoomOut, Maximize2, Hand, MousePointer2 } from 'lucide-react'
import { ReactFlow, Background, ReactFlowProvider, useReactFlow, useOnSelectionChange } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useCanvasFlow } from '@/hooks/useCanvasFlow'
import { nodeTypes } from '@/app/components/canvas/nodes'
import CustomEdge from '@/app/components/canvas/nodes/CustomEdge'
import { CanvasInteractionProvider } from '@/app/components/canvas/CanvasInteractionContext'
import ComponentToolbar from '@/app/components/canvas/ComponentToolbar'

const edgeTypes = {
  editable: CustomEdge
}

function CanvasInner({ canvasId, canvasName }: { canvasId?: string, canvasName: string }) {
  const { getViewport } = useReactFlow();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      const selected = nodes.filter(n => n.selected);
      setSelectedNodeId(selected.length === 1 ? selected[0].id : null);
    }
  });

  const {
    nodes,
    edges,
    pendingEditNodeId,
    setPendingEditNodeId,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeDragStop,
    onNodesDelete,
    onEdgesDelete,
    loadCanvas,
    handleAddComponent,
    handleTextSave,
    handleColorChange,
    handleImageChange,
  } = useCanvasFlow(canvasId || null);

  // ref so toolbar callbacks always see latest viewport without re-render
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasId) {
      loadCanvas(canvasId);
    }
  }, [canvasId, loadCanvas]);

  // Compute canvas-center position in flow coordinates
  const getCenterPosition = useCallback(() => {
    const container = containerRef.current;
    const { x, y, zoom } = getViewport();
    const w = container ? container.clientWidth : 800;
    const h = container ? container.clientHeight : 600;
    return {
      x: (-x + w / 2) / zoom,
      y: (-y + h / 2) / zoom,
    };
  }, [getViewport]);

  const interactionValue = {
    pendingEditNodeId,
    clearPendingEditNodeId: () => setPendingEditNodeId(null),
    setEditingNodeId: (_: any) => {},
    onTextSave: handleTextSave,
    onColorChange: handleColorChange,
    onImageChange: handleImageChange,
  };

  return (
    <div ref={containerRef} className="flex-1 relative overflow-hidden canvas-area-container">
      {/* Canvas label */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="text-[11px] font-medium text-neutral-400 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-md border border-black/[0.06]">
          {canvasName}
        </span>
      </div>

      <CanvasInteractionProvider value={interactionValue}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
          nodeTypes={nodeTypes as any}
          edgeTypes={edgeTypes as any}
          fitView
          className="react-flow-wrapper"
        >
          <Background variant="dots" gap={24} size={2} color="#cfcfcf" />
        </ReactFlow>
      </CanvasInteractionProvider>

      {/* Legacy toolbar — bottom-center */}
      <div className="canvas-toolbar-slot">
        <ComponentToolbar
          onAddText={() => handleAddComponent('TEXT', getCenterPosition())}
          onAddImage={() => handleAddComponent('IMAGE', getCenterPosition())}
          onAddShape={(shape: string, color: string) =>
            handleAddComponent('NODE', getCenterPosition(), shape, color)
          }
          onShapeColorSelect={(color: string) => {
            if (selectedNodeId) {
              handleColorChange(selectedNodeId, color);
            }
          }}
        />
      </div>
    </div>
  );
}

export default function CanvasArea({ canvasId, canvasName }: { canvasId?: string, canvasName: string }) {
  return (
    <ReactFlowProvider>
      <CanvasInner canvasId={canvasId} canvasName={canvasName} />
    </ReactFlowProvider>
  );
}
