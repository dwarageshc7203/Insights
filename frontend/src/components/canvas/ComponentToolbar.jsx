// ComponentToolbar.jsx
// Vertical toolbar for adding specific components to the canvas.
import React from 'react';
import './ComponentToolbar.css';

export default function ComponentToolbar({ onAddText, onAddImage, onAddShape }) {
  return (
    <div className="component-toolbar">
      <button 
        className="toolbar-btn" 
        onClick={onAddText} 
        title="Add Text (T)"
        aria-label="Add text component"
      >
        <span className="toolbar-icon">Tt</span>
        <span className="toolbar-label">Text</span>
      </button>
      <div className="toolbar-divider"></div>
      <button 
        className="toolbar-btn" 
        onClick={onAddImage} 
        title="Add Image (I)"
        aria-label="Add image component"
      >
        <span className="toolbar-icon">🖼️</span>
        <span className="toolbar-label">Image</span>
      </button>
      <div className="toolbar-divider"></div>
      <button 
        className="toolbar-btn" 
        onClick={onAddShape} 
        title="Add Shape (S)"
        aria-label="Add shape component"
      >
        <span className="toolbar-icon">⬜</span>
        <span className="toolbar-label">Shape</span>
      </button>
    </div>
  );
}
