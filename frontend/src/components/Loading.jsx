import React from 'react';

export default function Loading({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-ink/50">
      <div className="w-10 h-10 border-4 border-teal-tint border-t-teal rounded-full animate-spin mb-4" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
