import React from 'react';

export default function SectionHeading({ eyebrow, title, subtitle, light = false, center = false }) {
  return (
    <div className={center ? 'text-center max-w-2xl mx-auto' : ''}>
      {eyebrow && (
        <span className={`inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 ${light ? 'text-marigold' : 'text-teal'}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display font-semibold text-3xl sm:text-4xl leading-tight ${light ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-white/80' : 'text-ink/70'}`}>{subtitle}</p>
      )}
    </div>
  );
}
