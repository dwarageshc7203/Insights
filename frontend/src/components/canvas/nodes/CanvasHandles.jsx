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
          type="source"
          position={position}
          className="canvas-handle"
        />
      ))}
    </>
  );
}
