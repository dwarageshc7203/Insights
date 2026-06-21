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
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    reader.readAsDataURL(file);
  };

  const handlePlaceholderClick = () => {
    fileInputRef.current?.click();
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imgUrl = reader.result;
      onImageChange(id, imgUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={`canvas-node canvas-node--image${selected ? ' is-selected' : ''}`}
      data-component-type="IMAGE"
      style={{
        width: Number(data.width) > 0 ? Number(data.width) : 260,
        height: Number(data.height) > 0 ? Number(data.height) : 200,
      }}
      onDoubleClick={handleDoubleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
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
