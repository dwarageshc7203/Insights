// ComponentToolbar.jsx
// Vertical toolbar for adding specific components to the canvas.
import React, { useState } from 'react';
import './ComponentToolbar.css';

export default function ComponentToolbar({ onAddText, onAddImage, onAddShape }) {
  const [showShapeMenu, setShowShapeMenu] = useState(false);
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
        <span className="toolbar-icon toolbar-image-icon"></span>
        <span className="toolbar-label">Image</span>
      </button>
      <div className="toolbar-divider"></div>
      <button
        className="toolbar-btn"
        onClick={() => setShowShapeMenu(prev => !prev)}
        title="Add Shape (S)"
        aria-label="Add shape component"
      >
        <span className="toolbar-icon toolbar-shape-icon"></span>
        <span className="toolbar-label">Shape</span>
      </button>
      {showShapeMenu && (
        <div className="shape-popup">
          <button className="popup-item" onClick={() => { setShowShapeMenu(false); onAddShape('square'); }}>Square</button>
          <button className="popup-item" onClick={() => { setShowShapeMenu(false); onAddShape('oval'); }}>Oval</button>
          <button className="popup-item" onClick={() => { setShowShapeMenu(false); onAddShape('rhombus'); }}>Rhombus</button>
        </div>
      )}
    </div>
  );
}
