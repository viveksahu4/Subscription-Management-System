import React from 'react';
import './PageTransitionOverlay.css';

const GymIcon = () => (
  <svg
    className="page-transition-icon"
    viewBox="0 0 64 64"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Barbell with weightlifter - head, torso, legs squatting, bar on shoulders */}
    <circle cx="32" cy="10" r="5" />
    <rect x="28" y="15" width="8" height="10" rx="2" />
    <rect x="10" y="22" width="44" height="4" rx="2" />
    <rect x="6" y="20" width="6" height="8" rx="2" />
    <rect x="52" y="20" width="6" height="8" rx="2" />
    <path d="M26 25 L26 48 L30 56 L34 56 L38 48 L38 25" fill="white" stroke="white" strokeWidth="1" />
  </svg>
);

const PageTransitionOverlay = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="page-transition-overlay">
      <div className="page-transition-content">
        <GymIcon />
      </div>
    </div>
  );
};

export default PageTransitionOverlay;
