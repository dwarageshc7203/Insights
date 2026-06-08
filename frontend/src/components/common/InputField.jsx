// InputField.jsx
// Reusable input field component with label
import React from 'react';
import './InputField.css';

export default function InputField({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  onKeyPress,
  type = 'text',
  error = null,
  disabled = false 
}) {
  return (
    <div className="input-field">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        className={`input-control ${error ? 'error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        disabled={disabled}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
}
