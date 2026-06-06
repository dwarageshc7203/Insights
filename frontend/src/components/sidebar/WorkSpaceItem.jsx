// WorkSpaceItem.jsx
// Represents a single workspace item in the sidebar list.
import React from 'react';
import './WorkSpaceItem.css';

export default function WorkSpaceItem({ workspace, isSelected, onClick, onDelete }) {
  return (
    <div className={`workspace-item ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      <span className="workspace-name">{workspace.workSpaceName}</span>
      {isSelected && (
        <button 
          className="workspace-delete-btn" 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(workspace.workSpaceId);
          }}
          title="Delete Workspace"
        >
          &times;
        </button>
      )}
    </div>
  );
}
