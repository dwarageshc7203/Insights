// IllustrationSide.jsx
// A reusable component for displaying illustrated figures on the sides of the page.
import React from 'react';
import './IllustrationSide.css';

export default function IllustrationSide({ src, alt }) {
  return (
    <div className="illustration-side-container">
      {src ? (
        <img src={src} alt={alt} className="illustration-image" />
      ) : (
        <div className="illustration-placeholder">
        </div>
      )}
    </div>
  );
}
