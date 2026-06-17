import { memo, useState, useCallback, useRef, useEffect } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';

const CustomEdge = memo(
  ({ id, source, target, selected, data, style }) => {
    const { setEdges } = useReactFlow();
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(data?.label || '');
    const inputRef = useRef(null);

    const [edgePath, labelX, labelY] = getBezierPath({
      source,
      target,
    });

    useEffect(() => {
      if (isEditing) {
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }, [isEditing]);

    const handleDoubleClick = useCallback((e) => {
      e.stopPropagation();
      setIsEditing(true);
    }, []);

    const handleBlur = useCallback(() => {
      setIsEditing(false);
      setEdges((edges) =>
        edges.map((edge) =>
          edge.id === id
            ? { ...edge, data: { ...edge.data, label: draft.trim() } }
            : edge
        )
      );
    }, [draft, id, setEdges]);

    const handleKeyDown = useCallback((e) => {
      e.stopPropagation();
      if (e.key === 'Escape') {
        setIsEditing(false);
        setDraft(data?.label || '');
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleBlur();
      }
    }, [data?.label, handleBlur]);

    // Validate labelX and labelY before using in transform
    const isValidPosition = typeof labelX === 'number' && typeof labelY === 'number' && !isNaN(labelX) && !isNaN(labelY);

    return (
      <>
        <BaseEdge id={id} path={edgePath} style={style} />
        {isValidPosition && (
          <EdgeLabelRenderer>
            <div
              style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                pointerEvents: 'all',
              }}
              className="edge-label-container"
            >
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  className="edge-label-editor"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  style={{
                    background: 'white',
                    border: selected ? '2px solid var(--accent-primary)' : '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    minWidth: '60px',
                    textAlign: 'center',
                  }}
                />
              ) : (
                <div
                  onDoubleClick={handleDoubleClick}
                  className={`edge-label ${selected ? 'edge-label--selected' : ''}`}
                  style={{
                    background: 'white',
                    border: selected ? '2px solid var(--accent-primary)' : '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {data?.label || ''}
                </div>
              )}
            </div>
          </EdgeLabelRenderer>
        )}
      </>
    );
  }
);

CustomEdge.displayName = 'CustomEdge';

export default CustomEdge;
