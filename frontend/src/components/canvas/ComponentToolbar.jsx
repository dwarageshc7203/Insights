// ComponentToolbar.jsx
// Vertical toolbar for adding specific components to the canvas.
import React, { useState } from 'react';
import './ComponentToolbar.css';

export default function ComponentToolbar({ onAddText, onAddImage, onAddShape }) {
  const [showShapeMenu, setShowShapeMenu] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#39FF14');
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

              <div className="shape-section">

                  <button
                      className="shape-option"
                      onClick={() => {
                          setShowShapeMenu(false);
                          onAddShape('rhombus', selectedColor);
                      }}
                  >
                      ◇
                  </button>

                  <button
                      className="shape-option"
                      onClick={() => {
                          setShowShapeMenu(false);
                          onAddShape('square', selectedColor);
                      }}
                  >
                      ▭
                  </button>

                  <button
                      className="shape-option"
                      onClick={() => {
                          setShowShapeMenu(false);
                          onAddShape('oval', selectedColor);
                      }}
                  >
                      ◯
                  </button>

              </div>

              <div className="shape-popup-divider" />

              <div className="color-section">

                  <button
                      className="color-option"
                      style={{ background: '#39FF14' }}
                      onClick={() => setSelectedColor('#39FF14')}
                  />

                  <button
                      className="color-option"
                      style={{ background: '#FF1493' }}
                      onClick={() => setSelectedColor('#FF1493')}
                  />

                  <button
                      className="color-option"
                      style={{ background: '#FF3131' }}
                      onClick={() => setSelectedColor('#FF3131')}
                  />

                  <button
                      className="color-option"
                      style={{ background: '#FFFF33' }}
                      onClick={() => setSelectedColor('#FFFF33')}
                  />

              </div>

          </div>
      )}
    </div>
  );
}
