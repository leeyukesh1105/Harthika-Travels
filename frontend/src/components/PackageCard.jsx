import React from 'react';
import { Link } from 'react-router-dom';

export default function PackageCard({ pkg }) {
  const highlights = (pkg.highlights || '').split(',').filter(Boolean).slice(0, 3);

  return (
    <div className="postcard overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img src={pkg.image_url} alt={pkg.title} loading="lazy" className="w-full h-full object-cover" />
        {pkg.featured === 1 && (
          <span className="absolute top-3 left-3 bg-sunset text-white text-xs font-bold px-3 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-teal text-xs font-bold uppercase tracking-wide">
          {pkg.duration_days} Days / {pkg.duration_nights} Nights
          {pkg.destination_name ? ` · ${pkg.destination_name}` : ''}
        </p>
        <h3 className="font-display font-semibold text-lg text-ink mt-2">{pkg.title}</h3>

        {highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm text-ink/70">
                <span className="w-1.5 h-1.5 rounded-full bg-marigold flex-shrink-0" />
                {h.trim()}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-ink/50">Starting from</span>
            <p className="font-display font-bold text-2xl text-sunset">₹{pkg.price.toLocaleString('en-IN')}</p>
          </div>
          <Link
            to="/contact"
            className="rounded-full bg-teal text-white text-sm font-semibold px-4 py-2.5 hover:bg-teal-dark transition-colors focus-ring"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}
