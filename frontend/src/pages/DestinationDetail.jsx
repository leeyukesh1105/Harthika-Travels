import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';
import PackageCard from '../components/PackageCard';
import Loading from '../components/Loading';
import SectionHeading from '../components/SectionHeading';

export default function DestinationDetail() {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .getDestination(slug)
      .then((d) => {
        setDestination(d);
        return api.getPackages(d.id);
      })
      .then(setPackages)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loading label="Loading destination..." />;

  if (notFound || !destination) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink">Destination not found</h1>
        <p className="text-ink/60 mt-3">This destination may have been removed or renamed.</p>
        <Link to="/destinations" className="inline-block mt-6 text-teal font-semibold hover:underline">
          ← Back to all destinations
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="relative h-[420px]">
        <img src={destination.image_url} alt={destination.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <span className="inline-block bg-marigold text-ink text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full w-fit">
            Tamil Nadu
          </span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-white mt-4">{destination.name}</h1>
          <p className="text-marigold font-medium text-lg mt-2">{destination.tagline}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="font-display font-semibold text-2xl text-ink mb-4">About {destination.name}</h2>
          <p className="text-ink/70 leading-relaxed">{destination.description}</p>
        </div>
        <div className="bg-teal-tint rounded-postcard p-6 h-fit">
          <h3 className="font-display font-semibold text-lg text-teal">Good to Know</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-ink/50">Best Time to Visit</dt>
              <dd className="font-semibold text-ink">{destination.best_time_to_visit || 'Year-round'}</dd>
            </div>
          </dl>
          <Link
            to="/contact"
            className="mt-5 block text-center rounded-full bg-sunset text-white font-semibold px-5 py-3 hover:bg-sunset-dark transition-colors focus-ring"
          >
            Enquire About This Trip
          </Link>
        </div>
      </section>

      {packages.length > 0 && (
        <section className="bg-teal-tint py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Plan Your Trip" title={`Tour Packages for ${destination.name}`} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {packages.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
