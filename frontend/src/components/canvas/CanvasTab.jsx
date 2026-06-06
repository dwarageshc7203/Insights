// CanvasTab.jsx
// A single tab within the CanvasTabBar. Displays the canvas name and a delete button.
import React from 'react';
import './CanvasTab.css';

export default function CanvasTab({ canvas, isSelected, onClick, onDelete }) {
  return (
    <div className={`canvas-tab ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      <span className="canvas-tab-name">{canvas.canvasName}</span>
      <button 
        className="canvas-tab-delete" 
        onClick={(e) => {
          e.stopPropagation();
          onDelete(canvas.canvasId);
        }}
        title="Close Canvas"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="5" r="5" fill="#e85c5c" />
          <path d="M3 3L7 7M7 3L3 7" stroke="white" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
