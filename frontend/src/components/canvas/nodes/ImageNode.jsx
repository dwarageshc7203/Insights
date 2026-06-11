import CanvasHandles from './CanvasHandles';
import {NodeResizer} from "@xyflow/react";
import {useCallback} from "react";
import {api} from "../../../services/api.js";

export default function ImageNode({ id, data, selected }) {
  const hasImage = Boolean(data.imgUrl);

  const handleImageUpload = useCallback(
      async (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = async () => {
          const imgUrl = reader.result;

          try {
            await api.updateComponentImage(
                parseInt(id, 10),
                imgUrl
            );

            window.location.reload();
          } catch (err) {
            console.error(err);
          }
        };

        reader.readAsDataURL(file);
      },
      [data]
  );

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

        <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
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
            <span className="canvas-node-image-placeholder-label">Image</span>
          </div>
        )}
      </div>
    </div>
  );
}
