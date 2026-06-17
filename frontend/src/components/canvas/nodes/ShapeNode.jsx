import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import CanvasHandles from './CanvasHandles';
import { resolveShapeColor } from './nodeUtils';
import { NodeResizer } from '@xyflow/react';
import { useCanvasInteraction } from '../CanvasInteractionContext';

export default function ShapeNode({ id, data, selected }) {
  const { setEditingNodeId, onTextSave } = useCanvasInteraction();

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

  const [isEditing, setIsEditing] = useState(false);
  const displayContent = data.textContent || '';
  const [draft, setDraft] = useState(displayContent);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!isEditing) setDraft(displayContent);
  }, [displayContent, isEditing]);

  useEffect(() => {
    if (isEditing) {
      setEditingNodeId(id);
      textareaRef.current?.focus();
      textareaRef.current?.select();
    } else {
      setEditingNodeId((prev) => (prev === id ? null : prev));
    }
  }, [isEditing, id, setEditingNodeId]);

  const startEditing = useCallback((e) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  const commit = useCallback(() => {
    const trimmed = draft.trim();
    setIsEditing(false);
    setDraft(trimmed);
    onTextSave(id, trimmed);
  }, [draft, id, onTextSave]);

  const cancel = useCallback(() => {
    setIsEditing(false);
    setDraft(displayContent);
  }, [displayContent]);

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === 'Escape') { e.preventDefault(); cancel(); }
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commit(); }
  };

  return (
    <div
      className={`canvas-node canvas-node--shape canvas-node--shape-${variant}${selected ? ' is-selected' : ''}`}
      data-component-type="NODE"
      style={{ '--shape-fill': fillColor, width: '100%', height: '100%' }}
      onDoubleClick={startEditing}
    >
      <NodeResizer isVisible={selected} minWidth={60} minHeight={60} handleClassName="canvas-node-resizer" />
      {/* Shape background — behind text */}
      <div className="canvas-node-shape-body" />
      {/* Text layer — above background, below handles */}
      <div className="canvas-node-shape-text">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            className="canvas-node-shape-editor nodrag nopan nowheel"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={handleKeyDown}
            aria-label="Edit shape text"
          />
        ) : (
          displayContent && (
            <span className="canvas-node-shape-label">{displayContent}</span>
          )
        )}
      </div>
      <CanvasHandles />
    </div>
  );
}
