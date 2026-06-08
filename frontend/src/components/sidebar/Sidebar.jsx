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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [workspaceToDelete, setWorkspaceToDelete] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteClick = (workspace) => {
    setWorkspaceToDelete(workspace);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!workspaceToDelete) return;
    setIsDeleting(true);
    try {
      await onDeleteWorkspace(workspaceToDelete.workSpaceId);
      setShowDeleteModal(false);
      setWorkspaceToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Work Spaces</h2>
          
          <button className="sidebar-btn" onClick={handleCreateClick}>
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
            <React.Fragment key={ws.workSpaceId}>
              <WorkSpaceItem 
                workspace={ws}
                isSelected={selectedWorkspace?.workSpaceId === ws.workSpaceId}
                onClick={() => onSelectWorkspace(ws)}
                onDelete={handleDeleteClick}
              />
              {selectedWorkspace?.workSpaceId === ws.workSpaceId && canvases && canvases.length > 0 && (
                <div className="sidebar-canvas-list">
                  {canvases.map(canvas => (
                    <div 
                      key={canvas.canvasId} 
                      className={`sidebar-canvas-item ${selectedCanvas?.canvasId === canvas.canvasId ? 'selected' : ''}`}
                      onClick={() => onSelectCanvas(canvas)}
                    >
                      {canvas.canvasName}
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
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

      <Modal 
        isOpen={showDeleteModal}
        onClose={() => !isDeleting && setShowDeleteModal(false)}
        title="Delete Work Space"
        size="sm"
      >
        <p className="modal-message">
          Are you sure you want to delete "<strong>{workspaceToDelete?.workSpaceName}</strong>"? This action cannot be undone.
        </p>
        <div className="modal-actions">
          <Button 
            variant="secondary" 
            onClick={() => !isDeleting && setShowDeleteModal(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            variant="danger"
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Modal>
    </>
  );
}
