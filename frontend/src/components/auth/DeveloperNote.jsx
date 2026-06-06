// DeveloperNote.jsx
// Displays a personalized, handwritten-style note from the developer.
import React from 'react';
import './DeveloperNote.css';

export default function DeveloperNote({ 
  text = "Hey! I feel genuinely delighted to see you again, mate! I remember you (even still, you have to login, sadly)! Thanks for continuing to use my work! It really means a lot!"
}) {
  return (
    <div className="developer-note-container">
      <p className="developer-note-text">
        {text}
      </p>
      <div className="developer-note-signature">
        -Dwaragesh C<br />Dev
      </div>
    </div>
  );
}
