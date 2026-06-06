// ComponentToolbar.jsx
// Vertical toolbar for adding specific components to the canvas.
import React from 'react';
import './ComponentToolbar.css';

export default function ComponentToolbar({ onAddText, onAddImage, onAddShape }) {
  return (
    <div className="component-toolbar">
      <button className="toolbar-btn" onClick={onAddText} title="Add Text">
        <span className="toolbar-icon">Tt</span>
      </button>
      <button className="toolbar-btn" onClick={onAddImage} title="Add Image">
        <span className="toolbar-icon">🖼️</span>
      </button>
      <button className="toolbar-btn" onClick={onAddShape} title="Add Shape">
        <span className="toolbar-icon">⬜</span>
      </button>
    </div>
  );
}
