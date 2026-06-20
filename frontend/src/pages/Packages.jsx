import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import SectionHeading from '../components/SectionHeading';
import PackageCard from '../components/PackageCard';
import Loading from '../components/Loading';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [activeDestination, setActiveDestination] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getPackages(), api.getDestinations()])
      .then(([p, d]) => {
        setPackages(p);
        setDestinations(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeDestination === 'all'
      ? packages
      : packages.filter((p) => String(p.destination_id) === String(activeDestination));

  return (
    <>
      <section className="bg-marigold py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-ink text-marigold text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full">
            Tour Packages
          </span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-ink mt-6">
            Find Your Perfect Tamil Nadu Trip
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveDestination('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors focus-ring ${
              activeDestination === 'all' ? 'bg-sunset text-white' : 'bg-white text-ink/70 border border-ink/10 hover:border-sunset'
            }`}
          >
            All Packages
          </button>
          {destinations.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveDestination(d.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors focus-ring ${
                String(activeDestination) === String(d.id)
                  ? 'bg-sunset text-white'
                  : 'bg-white text-ink/70 border border-ink/10 hover:border-sunset'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>

        {loading ? (
          <Loading label="Loading tour packages..." />
        ) : filtered.length === 0 ? (
          <p className="text-center text-ink/50 py-16">No packages found for this destination yet. Check back soon!</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
