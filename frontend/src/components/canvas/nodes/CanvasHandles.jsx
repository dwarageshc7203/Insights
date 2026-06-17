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
                key={position}
                id={position}
                type="source"
                position={position}
                className="canvas-handle canvas-handle--source"
                style={{ offset: 6 }}
            />
        ))}
        {HANDLE_POSITIONS.map((position) => (
            <Handle
                key={`target-${position}`}
                id={`target-${position}`}
                type="target"
                position={position}
                className="canvas-handle canvas-handle--target"
                style={{ offset: -6 }}
            />
        ))}
      </>
  );
}
