import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import SectionHeading from '../components/SectionHeading';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';
import TestimonialCard from '../components/TestimonialCard';
import Loading from '../components/Loading';

const WHY_US = [
  {
    title: 'Local Tamil Nadu Experts',
    desc: 'We know every hill, temple, and backroad. Routes planned by people who actually grew up here.',
    icon: '🗺️',
  },
  {
    title: 'Transparent Pricing',
    desc: 'No hidden charges. The price you see is the price you pay, every single time.',
    icon: '💰',
  },
  {
    title: 'Always Reachable',
    desc: 'A real person on WhatsApp or phone, before, during, and after your trip.',
    icon: '📞',
  },
  {
    title: 'Comfortable Travel',
    desc: 'Verified hotels and well-maintained vehicles, checked by us before every season.',
    icon: '🚐',
  },
];

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getDestinations(), api.getPackages(), api.getTestimonials()])
      .then(([d, p, t]) => {
        setDestinations(d.filter((x) => x.featured).slice(0, 4));
        setPackages(p.filter((x) => x.featured).slice(0, 3));
        setTestimonials(t.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-teal" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 lg:pt-24 lg:pb-36 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-marigold text-ink text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full">
              Tamil Nadu Tours, Made Easy
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mt-6">
              Your Next Story Starts in <span className="text-marigold">Tamil Nadu</span>
            </h1>
            <p className="text-white/85 text-lg mt-6 max-w-md leading-relaxed">
              From misty Ooty mornings to Madurai's temple bells, Harthika Travels plans every
              detail so you just have to show up and enjoy.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/packages"
                className="rounded-full bg-sunset text-white font-semibold px-7 py-3.5 hover:bg-sunset-dark transition-colors focus-ring"
              >
                View Tour Packages
              </Link>
              <Link
                to="/contact"
                className="rounded-full bg-white text-ink font-semibold px-7 py-3.5 hover:bg-cream transition-colors focus-ring"
              >
                Plan My Trip
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-marigold rounded-postcard rotate-2" />
            <img
              src="https://images.unsplash.com/photo-1602216846623-c52e2dad3a5e?w=900&q=80"
              alt="Misty hills of Ooty, Tamil Nadu"
              className="relative rounded-postcard shadow-2xl w-full h-[420px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-postcard shadow-xl p-4 flex items-center gap-3 max-w-[220px]">
              <span className="text-2xl">⭐</span>
              <p className="text-sm text-ink/80 font-medium">Rated 4.8/5 by 500+ happy travellers</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <SectionHeading eyebrow="Where to Go" title="Popular Destinations" />
          <Link to="/destinations" className="text-teal font-semibold text-sm hover:underline focus-ring rounded">
            View all destinations →
          </Link>
        </div>
        {loading ? (
          <Loading label="Loading destinations..." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        )}
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-teal-tint py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why Travel With Us" title="Planned With Care, Travelled With Ease" center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {WHY_US.map((item) => (
              <div key={item.title} className="bg-white rounded-postcard p-6 text-center border border-ink/5">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-display font-semibold text-lg mt-4">{item.title}</h3>
                <p className="text-ink/60 text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <SectionHeading eyebrow="Tour Packages" title="Hand-Picked Trips for Every Traveller" />
          <Link to="/packages" className="text-teal font-semibold text-sm hover:underline focus-ring rounded">
            View all packages →
          </Link>
        </div>
        {loading ? (
          <Loading label="Loading packages..." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        )}
      </section>

      {/* TESTIMONIALS PREVIEW */}
      {testimonials.length > 0 && (
        <section className="bg-ink py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Happy Travellers" title="What Our Guests Say" light center />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-sunset py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white">
            Ready to explore Tamil Nadu?
          </h2>
          <p className="text-white/90 mt-3">Tell us your dates and we'll handle the rest.</p>
          <Link
            to="/contact"
            className="inline-block mt-7 rounded-full bg-white text-sunset font-semibold px-8 py-3.5 hover:bg-cream transition-colors focus-ring"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
