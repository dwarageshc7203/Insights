// WorkSpaceItem.jsx
// Represents a single workspace item in the sidebar list.
import React from 'react';
import './WorkSpaceItem.css';

export default function WorkSpaceItem({ workspace, isSelected, onClick, onDelete }) {
  return (
    <button
      type="button"
      className={`workspace-item${isSelected ? ' selected' : ''}`}
      onClick={onClick}
    >
      <span className="workspace-marker" aria-hidden="true" />
      <span className="workspace-name">{workspace.workSpaceName}</span>
    </button>
  );
}
