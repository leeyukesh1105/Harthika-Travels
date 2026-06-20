import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import TestimonialCard from '../components/TestimonialCard';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTestimonials().then(setTestimonials).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bg-ink py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-marigold text-ink text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full">
            Testimonials
          </span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-white mt-6">What Our Guests Say</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <Loading label="Loading testimonials..." />
        ) : testimonials.length === 0 ? (
          <p className="text-center text-ink/50 py-16">No testimonials yet. Be the first to share your trip story!</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        )}

        <div className="text-center mt-14">
          <p className="text-ink/60">Travelled with us recently?</p>
          <Link
            to="/contact"
            className="inline-block mt-4 rounded-full bg-teal text-white font-semibold px-6 py-3 hover:bg-teal-dark transition-colors focus-ring"
          >
            Share Your Experience
          </Link>
        </div>
      </section>
    </>
  );
}
