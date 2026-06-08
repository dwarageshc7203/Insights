// TopBar.jsx
// Top navigation bar with logo, user profile, and logout button
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './TopBar.css';

export default function TopBar({ user }) {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const userInitials = user?.user_metadata?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'U';

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C14.2 0 16 1.8 16 4C16 6.2 14.2 8 12 8C9.8 8 8 6.2 8 4C8 1.8 9.8 0 12 0ZM15 12V36C15 38.2 13.2 40 11 40H9C6.8 40 5 38.2 5 36V12C5 9.8 6.8 8 9 8H11C13.2 8 15 9.8 15 12Z" fill="#1e3b2b"/>
        </svg>
        <span className="topbar-title">Insights</span>
      </div>
      <div className="topbar-right">
        <div className="topbar-grid-icon" title="Apps">
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
        <div className="topbar-profile-section">
          <div 
            className="topbar-profile-circle"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title={user?.email}
          >
            {userInitials}
          </div>
          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-avatar">{userInitials}</div>
                <div className="profile-info">
                  <div className="profile-name">{user?.user_metadata?.full_name || 'User'}</div>
                  <div className="profile-email">{user?.email}</div>
                </div>
              </div>
              <button className="profile-logout-btn" onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
