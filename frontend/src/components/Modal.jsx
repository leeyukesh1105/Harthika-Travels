import React from 'react';

export default function Modal({ title, onClose, children, maxWidth = 'max-w-lg' }) {
  return (
    <div className="fixed inset-0 z-50 bg-ink/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className={`bg-white rounded-postcard shadow-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10 sticky top-0 bg-white">
          <h2 className="font-display font-semibold text-lg text-ink">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-full hover:bg-ink/5 focus-ring">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6L18 18M6 18L18 6" stroke="#2B2D42" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
