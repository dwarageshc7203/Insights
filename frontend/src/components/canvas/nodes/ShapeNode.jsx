import { useMemo } from 'react';
import CanvasHandles from './CanvasHandles';
import { resolveShapeColor } from './nodeUtils';
import {NodeResizer} from "@xyflow/react";

export default function ShapeNode({ id, data, selected }) {
  const fillColor = useMemo(
    () => resolveShapeColor(data.color, id),
    [data.color, id],
  );
  const variant = useMemo(() => {
    const shape = data.shapeType?.toLowerCase();
    if (shape === 'oval') return 'oval';
    if (shape === 'rhombus') return 'rhombus';
    return 'square';
  }, [data.shapeType]);

  return (
    <div
      className={`canvas-node canvas-node--shape canvas-node--shape-${variant}${selected ? ' is-selected' : ''}`}
      data-component-type="NODE"
      style={{ '--shape-fill': fillColor }}
    >
      <NodeResizer
          isVisible={selected}
          minWidth={100}
          minHeight={100}
      />
      <CanvasHandles />
      <div className="canvas-node-shape-body" aria-hidden="true" />
    </div>
  );
}
