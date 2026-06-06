// CanvasTabBar.jsx
// Displays a row of tabs for the currently open canvases and an add new canvas button.
import React from 'react';
import CanvasTab from './CanvasTab';
import './CanvasTabBar.css';

export default function CanvasTabBar({ canvases, selectedCanvas, onSelectCanvas, onCreateCanvas, onDeleteCanvas }) {
  return (
    <div className="canvas-tab-bar">
      {canvases.map(canvas => (
        <CanvasTab 
          key={canvas.canvasId}
          canvas={canvas}
          isSelected={selectedCanvas?.canvasId === canvas.canvasId}
          onClick={() => onSelectCanvas(canvas)}
          onDelete={onDeleteCanvas}
        />
      ))}
      <button 
        className="canvas-add-btn" 
        onClick={() => {
          const name = prompt('Enter new canvas name:');
          if (name) onCreateCanvas(name);
        }}
        title="New Canvas"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="8" fill="#555" />
          <path d="M10 6V14M6 10H14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
