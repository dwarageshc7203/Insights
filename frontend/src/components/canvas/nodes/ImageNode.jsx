import { useRef } from 'react';
import CanvasHandles from './CanvasHandles';
import { NodeResizer } from "@xyflow/react";
import { useCanvasInteraction } from '../CanvasInteractionContext';

export default function ImageNode({ id, data, selected }) {
  const hasImage = Boolean(data.imgUrl);
  const { onImageChange } = useCanvasInteraction();
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) return;

    const reader = new FileReader();

    reader.onload = () => {
      const imgUrl = reader.result;
      onImageChange(id, imgUrl);
    };

    reader.readAsDataURL(file);
    // Reset value so the same file can be uploaded again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePlaceholderClick = () => {
    fileInputRef.current?.click();
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (selected) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`canvas-node canvas-node--image${selected ? ' is-selected' : ''}`}
      data-component-type="IMAGE"
      style={{
        width: data.width > 0 ? data.width : 260,
        height: data.height > 0 ? data.height : 200,
      }}
      onDoubleClick={handleDoubleClick}
    >
      <NodeResizer
          isVisible={selected}
          minWidth={100}
          minHeight={100}
          handleClassName="canvas-node-resizer"
      />
      <CanvasHandles />
      <div
        className="canvas-node-image-frame"
        onClick={!hasImage ? handlePlaceholderClick : undefined}
        onDoubleClick={(e) => e.stopPropagation()}
        style={{ cursor: !hasImage ? 'pointer' : 'default' }}
      >

        <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
        />

        {hasImage ? (
          <img
            src={data.imgUrl}
            alt={data.componentName || 'Image'}
            className="canvas-node-image-preview"
            draggable={false}
          />
        ) : (
          <div className="canvas-node-image-placeholder" aria-hidden="true">
            <span className="canvas-node-image-placeholder-label">Click to upload Image</span>
          </div>
        )}
      </div>
    </div>
  );
}
