import { useState, useEffect, useRef, useCallback } from 'react';
import { useCanvasInteraction } from '../CanvasInteractionContext';
import { NodeResizer } from '@xyflow/react';
import CanvasHandles from './CanvasHandles';

export default function TextNode({ id, data, selected }) {
  const {
    pendingEditNodeId,
    clearPendingEditNodeId,
    setEditingNodeId,
    onTextSave,
  } = useCanvasInteraction();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(data.textContent || data.label || '');
  const textareaRef = useRef(null);

  const displayContent = data.textContent || data.label || 'New Text';
  const isPlaceholder = !data.textContent || data.textContent === 'New Text';

  useEffect(() => {
    if (!isEditing) {
      setDraft(displayContent);
    }
  }, [displayContent, isEditing]);

  useEffect(() => {
    if (pendingEditNodeId === id) {
      setIsEditing(true);
      clearPendingEditNodeId();
    }
  }, [pendingEditNodeId, id, clearPendingEditNodeId]);

  useEffect(() => {
    if (isEditing) {
      setEditingNodeId(id);
    } else {
      setEditingNodeId((prev) => (prev === id ? null : prev));
    }
  }, [isEditing, id, setEditingNodeId]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const el = textareaRef.current;
      el.focus();
      el.select();
    }
  }, [isEditing]);

  const startEditing = useCallback((event) => {
    event.stopPropagation();
    setIsEditing(true);
  }, []);

  const commit = useCallback(() => {
    const trimmed = draft.trim();
    const nextText = trimmed || 'New Text';
    setIsEditing(false);
    setDraft(nextText);
    onTextSave(id, nextText);
  }, [draft, id, onTextSave]);

  const cancel = useCallback(() => {
    setIsEditing(false);
    setDraft(displayContent);
  }, [displayContent]);

  const handleKeyDown = (event) => {
    event.stopPropagation();
    if (event.key === 'Escape') {
      event.preventDefault();
      cancel();
    }
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      commit();
    }
  };

  return (
    <div
      className={`canvas-node canvas-node--text${selected ? ' is-selected' : ''}${isEditing ? ' is-editing' : ''}`}
      data-component-type="TEXT"
      onDoubleClick={startEditing}
    >
      <NodeResizer
          isVisible={selected}
          minWidth={100}
          minHeight={100}
      />
      <CanvasHandles />
      <div className="canvas-node-text-inner">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            className="canvas-node-text-editor nodrag nopan nowheel"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={handleKeyDown}
            rows={3}
            aria-label="Edit text"
          />
        ) : (
          <p className={`canvas-node-text-content${isPlaceholder ? ' is-placeholder' : ''}`}>
            {displayContent}
          </p>
        )}
      </div>
    </div>
  );
}
