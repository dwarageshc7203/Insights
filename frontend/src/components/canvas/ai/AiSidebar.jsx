/* src/components/canvas/ai/AiSidebar.jsx */
import React, { useState, useEffect, useCallback } from 'react';
import './AiSidebar.css';
import { analyzeCanvas } from "../../../services/aiService";

export default function AiSidebar({ isOpen, onClose, graphData }) {
  const [analysis, setAnalysis] = useState(null);
  
  const [progress, setProgress] = useState({ step: 0, total: 0, message: '' });
  const [controller, setController] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAnalysis = useCallback(async () => {
    if (!graphData) return;
    setLoading(true);
    setAnalysis(null);
    setProgress({ step: 0, total: 0, message: '' });
    try {
      const { result, controller: abortCtrl } = await analyzeCanvas(graphData, ({ step, total, message }) => {
        setProgress({ step, total, message });
      });
      setController(abortCtrl);
      setAnalysis(result);
      setTimestamp(new Date().toLocaleString());
    } catch (e) {
      console.error('AI analysis failed', e);
      setAnalysis({ error: e.message });
    }
    setLoading(false);
  }, [graphData]);

  const refresh = () => {
    fetchAnalysis();
  };

  const cancelAnalysis = () => {
    if (controller) {
      controller.abort();
    }
    setLoading(false);
    setProgress({ step: 0, total: 0, message: '' });
  };

  // Resizing logic (drag from left edge)
  const startResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--ai-sidebar-width') || 380, 10);
    const onMouseMove = (ev) => {
      const newWidth = Math.max(300, startWidth - (ev.clientX - startX));
      document.documentElement.style.setProperty('--ai-sidebar-width', `${newWidth}px`);
    };
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className={`ai-sidebar ${isOpen ? 'open' : ''}`} style={{ width: 'var(--ai-sidebar-width, 380px)' }}>
      <div className="resize-handle" onMouseDown={startResize} />
      <div className="ai-header">
        <h2>AI Analysis</h2>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="ai-controls">
        <button onClick={fetchAnalysis} disabled={loading}>Analyze Canvas</button>
        <button onClick={refresh} disabled={loading}>Refresh</button>
        {loading && <button onClick={cancelAnalysis}>Cancel</button>}
        {loading && (
          <div className="ai-progress">
            <div className="progress-bar" style={{ width: `${(progress.step / progress.total) * 100}%` }} />
            <span className="progress-message">{progress.message}</span>
          </div>
        )}
        {timestamp && <span className="ai-timestamp">{timestamp}</span>}
      </div>
      <div className="ai-content" tabIndex={0}>
        {analysis ? (
          analysis.error ? (
            <p className="ai-error">Error: {analysis.error}</p>
          ) : (
            <div className="ai-sections">
              <section>
                <h3>Canvas Summary</h3>
                <p>{analysis.summary}</p>
              </section>
              <section>
                <h3>Relationship Analysis</h3>
                <p>{analysis.relationships}</p>
              </section>
              <section>
                <h3>Structural Understanding</h3>
                <p>{analysis.structure}</p>
              </section>
              <section>
                <h3>Architecture Generation</h3>
                <p>{analysis.architecture}</p>
              </section>
              <section>
                <h3>Database Analysis</h3>
                <p>{analysis.database}</p>
              </section>
              <section>
                <h3>Flowchart Generation</h3>
                <p>{analysis.flowchart}</p>
              </section>
              <section>
                <h3>Project Blueprint</h3>
                <p>{analysis.blueprint}</p>
              </section>
              <section>
                <h3>AI Development Prompt</h3>
                <p>{analysis.prompt}</p>
              </section>
            </div>
          )
        ) : (
          <p>No analysis yet.</p>
        )}
      </div>
    </div>
  );
}
