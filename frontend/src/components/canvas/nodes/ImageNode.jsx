import CanvasHandles from './CanvasHandles';
import {NodeResizer} from "@xyflow/react";

export default function ImageNode({ data, selected }) {
  const hasImage = Boolean(data.imgUrl);

  return (
    <div
      className={`canvas-node canvas-node--image${selected ? ' is-selected' : ''}`}
      data-component-type="IMAGE"
    >
      <NodeResizer
          isVisible={selected}
          minWidth={100}
          minHeight={100}
      />
      <CanvasHandles />
      <div className="canvas-node-image-frame">
        {hasImage ? (
          <img
            src={data.imgUrl}
            alt={data.componentName || 'Image'}
            className="canvas-node-image-preview"
            draggable={false}
          />
        ) : (
          <div className="canvas-node-image-placeholder" aria-hidden="true">
            <span className="canvas-node-image-placeholder-label">Image</span>
          </div>
        )}
      </div>
    </div>
  );
}
