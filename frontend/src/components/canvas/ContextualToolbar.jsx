import React, { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import './ContextualToolbar.css';

const COLORS = [
  { name: 'green', value: '#27ae60' },
  { name: 'pink', value: '#e91e63' },
  { name: 'yellow', value: '#f1c40f' },
  { name: 'red', value: '#c0392b' },
];

/**
 * Floating toolbar that appears above the selected node.
 * It receives the node object and callbacks to update text or colour.
 */
export default function ContextualToolbar({ node, onUpdateText, onUpdateColor }) {
  const { project } = useReactFlow();

  // Convert node flow position to screen coordinates for absolute positioning
  const { x, y } = project(node.position);

  // Offset the toolbar so it sits just above the node
  const toolbarStyle = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y - 48}px`, // 48px roughly toolbar height + gap
    transform: 'translate(-50%, -100%)',
  };

  const handleTextChange = useCallback(
    (e) => {
      e.stopPropagation();
      const newText = e.target.value;
      onUpdateText(node.id, newText);
    },
    [node.id, onUpdateText]
  );

  const handleColorClick = useCallback(
    (color) => {
      return (e) => {
        e.stopPropagation();
        onUpdateColor(node.id, color);
      };
    },
    [node.id, onUpdateColor]
  );

  return (
    <div className="contextual-toolbar" style={toolbarStyle} onClick={(e) => e.stopPropagation()}>
      {(node.type === 'text' || node.type === 'shape') && (
        <input
          className="toolbar-input"
          type="text"
          value={node.data?.textContent || ''}
          placeholder="Edit text"
          onChange={handleTextChange}
        />
      )}
      {(node.type === 'shape' || node.type === 'image') && (
        <div className="color-palette">
          {COLORS.map((c) => (
            <button
              key={c.name}
              className="color-btn"
              style={{ backgroundColor: c.value }}
              aria-label={`Set ${c.name} colour`}
              onClick={handleColorClick(c.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
