import React from 'react';

/**
 * Animated Transitioning Logo Component
 * Automatically transitions between A -> U -> R -> A.
 */
const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 24 L11 15 L17 21 L28 8 M28 8 H21 M28 8 V15"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;
