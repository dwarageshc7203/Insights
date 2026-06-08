// CanvasTab.jsx
// A single tab within the CanvasTabBar. Displays the canvas name and a delete button.
import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import './CanvasTab.css';

export default function CanvasTab({ canvas, isSelected, onClick, onDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(canvas.canvasId);
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div 
        className={`canvas-tab ${isSelected ? 'selected' : ''}`} 
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick();
          }
        }}
      >
        <span className="canvas-tab-name">{canvas.canvasName}</span>
        <button 
          className="canvas-tab-delete" 
          onClick={handleDeleteClick}
          title="Close Canvas"
          aria-label={`Close ${canvas.canvasName}`}
        >
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="5" r="5" fill="#e85c5c" />
            <path d="M3 3L7 7M7 3L3 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <Modal 
        isOpen={showDeleteModal}
        onClose={() => !isDeleting && setShowDeleteModal(false)}
        title="Close Canvas"
        size="sm"
      >
        <p className="modal-message">
          Are you sure you want to close "<strong>{canvas.canvasName}</strong>"?
        </p>
        <div className="modal-actions">
          <Button 
            variant="secondary" 
            onClick={() => !isDeleting && setShowDeleteModal(false)}
            disabled={isDeleting}
          >
            Keep Open
          </Button>
          <Button 
            variant="danger"
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Closing...' : 'Close'}
          </Button>
        </div>
      </Modal>
    </>
  );
}
