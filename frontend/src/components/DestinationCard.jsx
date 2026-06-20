import React from 'react';
import { Link } from 'react-router-dom';

export default function DestinationCard({ destination }) {
  return (
    <Link to={`/destinations/${destination.slug}`} className="postcard focus-ring block overflow-hidden group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.image_url}
          alt={destination.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <span className="absolute top-3 right-3 bg-marigold text-ink text-xs font-bold px-3 py-1 rounded-full">
          Tamil Nadu
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-xl text-ink">{destination.name}</h3>
        <p className="text-teal text-sm font-medium mt-1">{destination.tagline}</p>
        <p className="text-ink/60 text-sm mt-3 line-clamp-2">{destination.description}</p>
        <span className="inline-flex items-center gap-1 mt-4 text-sunset font-semibold text-sm">
          Explore
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </Link>
  );
}
