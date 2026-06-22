import { memo, useState, useCallback, useRef, useEffect } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';

const CustomEdge = memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    selected,
    label,
    data,
    style,
    markerEnd,
  }) => {
    const { setEdges } = useReactFlow();
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(label || '');
    const inputRef = useRef(null);

    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    useEffect(() => {
      setDraft(label || '');
    }, [label]);

    useEffect(() => {
      if (isEditing) {
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }, [isEditing]);

    const handleDoubleClick = useCallback((e) => {
      e.stopPropagation();
      console.log('CustomEdge handleDoubleClick', { id });
      setIsEditing(true);
    }, []);

    console.log('CustomEdge data prop', data);

    const handleBlur = useCallback(() => {
      setIsEditing(false);
      const nextLabel = draft.trim();
      if (data?.onLabelChange) {
        data.onLabelChange(id, nextLabel);
      } else {
        setEdges((edges) =>
          edges.map((edge) =>
            edge.id === id
              ? { ...edge, label: nextLabel }
              : edge
          )
        );
      }
    }, [draft, id, data, setEdges]);

    const handleKeyDown = useCallback((e) => {
      e.stopPropagation();
      if (e.key === 'Escape') {
        setIsEditing(false);
        setDraft(label || '');
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleBlur();
      }
    }, [label, handleBlur]);

    // Validate labelX and labelY before using in transform
    const isValidPosition = typeof labelX === 'number' && typeof labelY === 'number' && !isNaN(labelX) && !isNaN(labelY);

    return (
      <>
        {/* Wrap edge path and optional label to capture double‑clicks anywhere on the edge */}
        <g onDoubleClick={handleDoubleClick}>
          <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />
          {isValidPosition && (isEditing || (label && label.trim())) && (
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
                      padding: '8px 12px',
                      fontSize: '12px',
                      minWidth: '60px',
                      textAlign: 'center',
                    }}
                  />
                ) : (
                  <div
                    className={`edge-label ${selected ? 'edge-label--selected' : ''}`}
                    style={{
                      background: 'white',
                      border: selected ? '2px solid var(--accent-primary)' : '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </div>
                )}
              </div>
            </EdgeLabelRenderer>
          )}
        </g>
      </>
    );
  }
);

CustomEdge.displayName = 'CustomEdge';

export default CustomEdge;
