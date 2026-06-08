import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="landing-logo">
          {/* Using the same logo shape from the application */}
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C14.2 0 16 1.8 16 4C16 6.2 14.2 8 12 8C9.8 8 8 6.2 8 4C8 1.8 9.8 0 12 0ZM15 12V36C15 38.2 13.2 40 11 40H9C6.8 40 5 38.2 5 36V12C5 9.8 6.8 8 9 8H11C13.2 8 15 9.8 15 12Z" fill="#1e3b2b"/>
          </svg>
        </div>
        <div className="landing-links">
          <a href="#features">Features</a>
          <a href="#benefits">Benefits</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="landing-nav-right">
          <Link to="/login" className="landing-login-btn">Log In</Link>
        </div>
      </nav>

      <main className="landing-main">
        <h1 className="landing-title">
          Convert raw thoughts <br />
          into <span className="landing-title-highlight">Insights</span>
        </h1>
        <p className="landing-subtitle">
          The ultimate visual workspace to organize, connect, and evolve your ideas.
        </p>

        <div className="landing-mockup">
          <div className="mockup-canvas">
            <div className="mockup-node" style={{ top: '10%', left: '10%', width: '18%', height: '16%', backgroundColor: '#8ac97a' }}>
              User
            </div>
            <div className="mockup-node" style={{ top: '20%', left: '55%', width: '12%', height: '10%', backgroundColor: '#f0f048', borderRadius: '25px' }}>
              App Name?
            </div>
            <div className="mockup-node" style={{ top: '45%', left: '15%', width: '14%', height: '10%', backgroundColor: '#e2f048', borderRadius: '25px' }}>
              Marketing?
            </div>
            <div className="mockup-node" style={{ top: '35%', left: '40%', width: '16%', height: '14%', backgroundImage: 'linear-gradient(#ddd, #ccc)', fontSize: 'clamp(8px, 1.5vw, 12px)' }}>
              Setup?
              <div style={{ marginTop: '5px', height: '40%', width: '80%', backgroundColor: '#555', borderRadius: '4px' }}></div>
            </div>
            <div className="mockup-node" style={{ top: '30%', left: '65%', width: '20%', height: '16%', backgroundColor: '#eeb2c6' }}>
              Dashboard
            </div>
            <div className="mockup-node" style={{ top: '65%', left: '35%', width: '14%', height: '12%', backgroundColor: '#fca340' }}>
              Shop
            </div>
            <div className="mockup-node" style={{ top: '75%', left: '55%', width: '14%', height: '12%', backgroundColor: '#40bbfc' }}>
              Unsold<br/>Food
            </div>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Insights Workspace. All rights reserved.</p>
      </footer>
    </div>
  );
}
