// Sidebar.jsx
// Sidebar component containing workspace list, search, and action buttons.
import React, { useState } from 'react';
import WorkSpaceItem from './WorkSpaceItem';
import './Sidebar.css';

export default function Sidebar({ 
  workspaces, 
  selectedWorkspace, 
  onSelectWorkspace, 
  onCreateWorkspace, 
  onDeleteWorkspace 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkspaces = workspaces.filter(ws => 
    ws.workSpaceName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Work Spaces</h2>
        
        <button className="sidebar-btn" onClick={() => {
          const name = prompt('Enter new workspace name:');
          if (name) onCreateWorkspace(name);
        }}>
          <span className="sidebar-btn-icon">+</span> New Work Space
        </button>
        
        <div className="sidebar-search">
          <span className="sidebar-search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="sidebar-list">
        {filteredWorkspaces.map(ws => (
          <WorkSpaceItem 
            key={ws.workSpaceId}
            workspace={ws}
            isSelected={selectedWorkspace?.workSpaceId === ws.workSpaceId}
            onClick={() => onSelectWorkspace(ws)}
            onDelete={onDeleteWorkspace}
          />
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-footer-item">
          <span className="sidebar-footer-icon">?</span> Need Help?
        </div>
        <div className="sidebar-footer-item">
          <span className="sidebar-footer-icon">⚙️</span> Settings
        </div>
      </div>
    </div>
  );
}
