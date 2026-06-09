import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
      <div className="landing-page">
        <nav className="landing-nav">
          <div className="landing-logo">
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

        {/* Section 1 — Hero */}
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
              <div className="mockup-node" style={{ top: '10%', left: '10%', width: '18%', height: '16%', backgroundColor: '#8ac97a' }}>User</div>
              <div className="mockup-node" style={{ top: '20%', left: '55%', width: '12%', height: '10%', backgroundColor: '#f0f048', borderRadius: '25px' }}>App Name?</div>
              <div className="mockup-node" style={{ top: '45%', left: '15%', width: '14%', height: '10%', backgroundColor: '#e2f048', borderRadius: '25px' }}>Marketing?</div>
              <div className="mockup-node" style={{ top: '35%', left: '40%', width: '16%', height: '14%', backgroundImage: 'linear-gradient(#ddd, #ccc)', fontSize: 'clamp(8px, 1.5vw, 12px)' }}>
                Setup?
                <div style={{ marginTop: '5px', height: '40%', width: '80%', backgroundColor: '#555', borderRadius: '4px' }}></div>
              </div>
              <div className="mockup-node" style={{ top: '30%', left: '65%', width: '20%', height: '16%', backgroundColor: '#eeb2c6' }}>Dashboard</div>
              <div className="mockup-node" style={{ top: '65%', left: '35%', width: '14%', height: '12%', backgroundColor: '#fca340' }}>Shop</div>
              <div className="mockup-node" style={{ top: '75%', left: '55%', width: '14%', height: '12%', backgroundColor: '#40bbfc' }}>Unsold<br/>Food</div>
            </div>
          </div>

          <Link to="/login" className="landing-cta-btn">Get Started Free</Link>
        </main>

        {/* Section 2 — Features */}
        <section className="landing-section" id="features">
          <h2 className="section-title">Everything you need to think clearly</h2>
          <p className="section-subtitle">Stop fighting your thoughts. Start connecting them.</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Visual Canvas</h3>
              <p>Drop nodes, draw connections, and build a map of your thinking on an infinite dot-grid canvas.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>AI Conversion</h3>
              <p>One click turns your messy canvas into structured summaries, checklists, or flowcharts ready to use.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📁</div>
              <h3>Workspaces</h3>
              <p>Organise multiple projects into workspaces. Switch contexts without losing your train of thought.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>Connected Edges</h3>
              <p>Draw relationships between ideas with directional edges. See how your thoughts connect at a glance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">☁️</div>
              <h3>Always Saved</h3>
              <p>Every node, every edge, every thought — persisted automatically. Pick up exactly where you left off.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Secure Login</h3>
              <p>Sign in with Google in one click. Your workspaces are private and only accessible to you.</p>
            </div>
          </div>
        </section>

        {/* Section 3 — Benefits / How it works */}
        <section className="landing-section landing-section-alt" id="benefits">
          <h2 className="section-title">From chaos to clarity in three steps</h2>
          <p className="section-subtitle">The fastest path from scattered thoughts to structured plans.</p>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Dump your thoughts</h3>
                <p>Open a canvas and add nodes freely. Don't organise yet — just get everything out of your head and onto the canvas. Text, images, shapes — anything goes.</p>
              </div>
            </div>
            <div className="step-divider" />
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Connect the dots</h3>
                <p>Draw edges between related ideas. Group related nodes. Move things around until the structure starts to emerge naturally from your thinking.</p>
              </div>
            </div>
            <div className="step-divider" />
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Generate Insights</h3>
                <p>Hit the generate button. Insights analyses your canvas and produces a structured summary, action plan, or flowchart — ready to share or act on immediately.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 — CTA */}
        <section className="landing-cta-section" id="contact">
          <h2 className="cta-title">Ready to think better?</h2>
          <p className="cta-subtitle">Join the waitlist and be the first to know when Insights launches publicly.</p>
          <div className="cta-actions">
            <Link to="/login" className="landing-cta-btn">Start for Free</Link>
            <a href="mailto:dwarageshc@example.com" className="cta-contact-link">Contact the developer →</a>
          </div>
          <p className="cta-note">Built by a solo developer. No ads. No fluff. Just a better way to think.</p>
        </section>

        <footer className="landing-footer">
          <p>&copy; {new Date().getFullYear()} Insights Workspace. Built by Dwaragesh C.</p>
        </footer>
      </div>
  );
}