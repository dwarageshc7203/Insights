// Sidebar.jsx
// Sidebar component containing workspace list, search, and action buttons.
import React, { useState } from 'react';
import Modal from '../common/Modal';
import InputField from '../common/InputField';
import Button from '../common/Button';
import WorkSpaceItem from './WorkSpaceItem';
import './Sidebar.css';

export default function Sidebar({
  workspaces,
  selectedWorkspace,
  canvases,
  selectedCanvas,
  onSelectCanvas,
  onSelectWorkspace,
  onCreateWorkspace,
  onDeleteWorkspace
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const filteredWorkspaces = workspaces.filter(ws =>
    ws.workSpaceName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateClick = () => {
    setNewWorkspaceName('');
    setShowCreateModal(true);
  };

  const handleCreateSubmit = async () => {
    if (!newWorkspaceName.trim()) return;
    setIsCreating(true);
    try {
      await onCreateWorkspace(newWorkspaceName);
      setShowCreateModal(false);
      setNewWorkspaceName('');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <aside className="sidebar-container">
        <div className="sidebar-header">
          <div className="sidebar-header-row">
            <h2 className="sidebar-title">Workspaces</h2>
            <button
              type="button"
              className="sidebar-btn-new"
              onClick={handleCreateClick}
              title="New workspace"
            >
              +
            </button>
          </div>

          <div className="sidebar-search">
            <input
              type="text"
              placeholder="Search workspaces…"
              aria-label="Search workspaces"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <nav className="sidebar-list" aria-label="Workspaces">
          {filteredWorkspaces.map(ws => (
            <div key={ws.workSpaceId} className="sidebar-workspace-group">
              <WorkSpaceItem
                workspace={ws}
                isSelected={selectedWorkspace?.workSpaceId === ws.workSpaceId}
                onClick={() => onSelectWorkspace(ws)}
              />
              {selectedWorkspace?.workSpaceId === ws.workSpaceId && canvases && canvases.length > 0 && (
                <div className="sidebar-canvas-group">
                  <span className="sidebar-section-label">Canvases</span>
                  <ul className="sidebar-canvas-list">
                    {canvases.map(canvas => (
                      <li key={canvas.canvasId}>
                        <button
                          type="button"
                          className={`sidebar-canvas-item${selectedCanvas?.canvasId === canvas.canvasId ? ' selected' : ''}`}
                          onClick={() => onSelectCanvas(canvas)}
                        >
                          {canvas.canvasName}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <Modal
        isOpen={showCreateModal}
        onClose={() => !isCreating && setShowCreateModal(false)}
        title="Create New Work Space"
        size="sm"
      >
        <InputField
          label="Work Space Name"
          placeholder="e.g., My Project"
          value={newWorkspaceName}
          onChange={(e) => setNewWorkspaceName(e.target.value)}
          disabled={isCreating}
        />
        <div className="modal-actions">
          <Button
            variant="secondary"
            onClick={() => !isCreating && setShowCreateModal(false)}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateSubmit}
            disabled={isCreating || !newWorkspaceName.trim()}
          >
            {isCreating ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </Modal>
    </>
  );
}
