import React from 'react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="postcard p-6 flex flex-col h-full">
      <div className="flex gap-1 text-marigold mb-3" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill={i < testimonial.rating ? 'currentColor' : '#E5E5E5'}>
            <path d="M10 1l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.2l6.1-.6L10 1z" />
          </svg>
        ))}
      </div>
      <p className="text-ink/80 text-sm leading-relaxed flex-1">&ldquo;{testimonial.message}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-tint flex items-center justify-center text-teal font-display font-semibold">
          {testimonial.customer_name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-sm text-ink">{testimonial.customer_name}</p>
          {testimonial.location && <p className="text-xs text-ink/50">{testimonial.location}</p>}
        </div>
      </div>
    </div>
  );
}
