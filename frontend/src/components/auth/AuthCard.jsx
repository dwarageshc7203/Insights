// AuthCard.jsx
// Serves as the central wrapper for the login form elements (button, sign up text, note).
import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuthButton from './GoogleAuthButton';
import DeveloperNote from './DeveloperNote';
import './AuthCard.css';

export default function AuthCard({
  title = "Login here!",
  promptText = "Is this our first meet? Try ",
  linkText = "Sign Up!",
  linkTo = "/signup",
  noteText
}) {
  return (
    <div className="auth-card-container">
      <h2 className="auth-card-title">{title}</h2>
      
      <GoogleAuthButton />

      <p className="auth-card-signup-text">
        {promptText}<Link to={linkTo} className="auth-card-signup-link">{linkText}</Link>
      </p>

      <DeveloperNote text={noteText} />
    </div>
  );
}
