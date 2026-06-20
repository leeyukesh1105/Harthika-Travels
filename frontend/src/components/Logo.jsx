import React from 'react';

export default function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="17" cy="17" r="16" stroke={light ? '#FFC857' : '#FF6B35'} strokeWidth="2" strokeDasharray="2 6" />
        <path
          d="M9 19L15 11L19 16L25 9"
          stroke={light ? '#FFFFFF' : '#1B998B'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="25" cy="9" r="2" fill={light ? '#FFC857' : '#FF6B35'} />
      </svg>
      <span className={`font-display font-semibold text-xl leading-none ${light ? 'text-white' : 'text-ink'}`}>
        Harthika <span className="text-sunset">Travels</span>
      </span>
    </div>
  );
}
