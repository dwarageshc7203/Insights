// TopBar.jsx
// Displays the top navigation bar with the application logo, grid icon, and user profile avatar.
import React from 'react';
import './TopBar.css';

export default function TopBar() {
  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C14.2 0 16 1.8 16 4C16 6.2 14.2 8 12 8C9.8 8 8 6.2 8 4C8 1.8 9.8 0 12 0ZM15 12V36C15 38.2 13.2 40 11 40H9C6.8 40 5 38.2 5 36V12C5 9.8 6.8 8 9 8H11C13.2 8 15 9.8 15 12Z" fill="#1e3b2b"/>
        </svg>
      </div>
      <div className="topbar-right">
        <div className="topbar-grid-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--icon-color)">
            <circle cx="4" cy="4" r="2" />
            <circle cx="12" cy="4" r="2" />
            <circle cx="20" cy="4" r="2" />
            <circle cx="4" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="20" cy="12" r="2" />
            <circle cx="4" cy="20" r="2" />
            <circle cx="12" cy="20" r="2" />
            <circle cx="20" cy="20" r="2" />
          </svg>
        </div>
        <div className="topbar-profile-circle"></div>
      </div>
    </div>
  );
}
