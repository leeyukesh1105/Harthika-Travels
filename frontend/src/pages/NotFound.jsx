import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-28 text-center">
      <span className="font-display font-bold text-7xl text-sunset">404</span>
      <h1 className="font-display font-semibold text-2xl sm:text-3xl text-ink mt-4">
        Looks like this trail doesn't exist
      </h1>
      <p className="text-ink/60 mt-3">
        The page you're looking for may have been moved or never existed.
      </p>
      <Link
        to="/"
        className="inline-block mt-7 rounded-full bg-sunset text-white font-semibold px-7 py-3 hover:bg-sunset-dark transition-colors focus-ring"
      >
        Back to Home
      </Link>
    </div>
  );
}
