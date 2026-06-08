// CanvasTabBar.jsx
// Displays a row of tabs for the currently open canvases and an add new canvas button.
import React, { useState } from 'react';
import Modal from '../common/Modal';
import InputField from '../common/InputField';
import Button from '../common/Button';
import CanvasTab from './CanvasTab';
import './CanvasTabBar.css';

export default function CanvasTabBar({ canvases, selectedCanvas, onSelectCanvas, onCreateCanvas, onDeleteCanvas }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCanvasName, setNewCanvasName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateClick = () => {
    setNewCanvasName('');
    setShowCreateModal(true);
  };

  const handleCreateSubmit = async () => {
    if (!newCanvasName.trim()) return;
    setIsCreating(true);
    try {
      await onCreateCanvas(newCanvasName);
      setShowCreateModal(false);
      setNewCanvasName('');
    } finally {
      setIsCreating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateSubmit();
    }
  };

  return (
    <>
      <div className="canvas-tab-bar">
        <div className="canvas-tabs-scroll">
          {canvases.map(canvas => (
            <CanvasTab 
              key={canvas.canvasId}
              canvas={canvas}
              isSelected={selectedCanvas?.canvasId === canvas.canvasId}
              onClick={() => onSelectCanvas(canvas)}
              onDelete={onDeleteCanvas}
            />
          ))}
        </div>
        <button 
          className="canvas-add-btn" 
          onClick={handleCreateClick}
          title="New Canvas"
          aria-label="Create new canvas"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="8" fill="#555" />
            <path d="M10 6V14M6 10H14" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <Modal 
        isOpen={showCreateModal}
        onClose={() => !isCreating && setShowCreateModal(false)}
        title="Create New Canvas"
        size="sm"
      >
        <InputField 
          label="Canvas Name"
          placeholder="e.g., Design Draft"
          value={newCanvasName}
          onChange={(e) => setNewCanvasName(e.target.value)}
          onKeyPress={handleKeyPress}
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
            disabled={isCreating || !newCanvasName.trim()}
          >
            {isCreating ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </Modal>
    </>
  );
}
