import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import SectionHeading from '../components/SectionHeading';
import DestinationCard from '../components/DestinationCard';
import Loading from '../components/Loading';

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDestinations().then(setDestinations).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bg-teal py-14 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 800 200">
          <path d="M0 150 Q200 50 400 120 T800 80" stroke="#FFC857" strokeWidth="2" fill="none" className="dotted-route" />
        </svg>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-marigold text-ink text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full">
            Explore Tamil Nadu
          </span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-white mt-6">
            Hills, Temples & Coastlines Await
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <Loading label="Loading destinations..." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
