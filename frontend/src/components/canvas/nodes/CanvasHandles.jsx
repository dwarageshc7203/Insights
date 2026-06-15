import { Handle, Position } from '@xyflow/react';

const HANDLE_POSITIONS = [
  Position.Top,
  Position.Right,
  Position.Bottom,
  Position.Left,
];

export default function CanvasHandles() {
  return (
      <>
        {HANDLE_POSITIONS.map((position) => (
            <Handle
                key={`source-${position}`}
                id={`source-${position}`}
                type="source"
                position={position}
                className="canvas-handle"
            />
        ))}
        {HANDLE_POSITIONS.map((position) => (
            <Handle
                key={`target-${position}`}
                id={`target-${position}`}
                type="target"
                position={position}
                className="canvas-handle"
            />
        ))}
      </>
  );
}
