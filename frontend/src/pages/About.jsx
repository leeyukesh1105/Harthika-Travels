import React from 'react';
import SectionHeading from '../components/SectionHeading';

const VALUES = [
  { title: 'Honesty First', desc: 'We tell you exactly what to expect, costs included, no surprises at checkout.' },
  { title: 'Local Roots', desc: 'Born and based in Tamil Nadu, we plan trips the way we would for our own family.' },
  { title: 'Care for Every Traveller', desc: 'Solo, family, or large group, every itinerary is built around how you actually travel.' },
];

export default function About() {
  return (
    <>
      <section className="bg-teal py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-marigold text-ink text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full">
            Our Story
          </span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-white mt-6">About Harthika Travels</h1>
          <p className="text-white/85 mt-5 text-lg leading-relaxed">
            A team of Tamil Nadu locals turning our home state's hills, temples, and coastlines
            into trips you'll talk about for years.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeading eyebrow="Who We Are" title="Built by Travellers, for Travellers" />
          <p className="mt-5 text-ink/70 leading-relaxed">
            Harthika Travels started with a simple idea: travel within Tamil Nadu should feel as
            exciting as travelling abroad. Too many people fly past their own state's hill
            stations, temples, and beaches without ever exploring them properly.
          </p>
          <p className="mt-4 text-ink/70 leading-relaxed">
            Today, we plan everything from quick weekend escapes to week-long heritage circuits,
            handling hotels, transport, and local guides so you can focus on the experience, not
            the logistics.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -top-5 -right-5 w-full h-full border-2 border-sunset rounded-postcard -rotate-2" />
          <img
            src="https://images.unsplash.com/photo-1621839673705-6617945851a8?w=900&q=80"
            alt="Meenakshi Temple, Madurai"
            className="relative rounded-postcard shadow-xl w-full h-[380px] object-cover"
          />
        </div>
      </section>

      <section className="bg-teal-tint py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What We Stand For" title="Our Values" center />
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-postcard p-7 border border-ink/5">
                <h3 className="font-display font-semibold text-lg text-teal">{v.title}</h3>
                <p className="text-ink/60 text-sm mt-3 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <SectionHeading eyebrow="Our Promise" title="Every Trip, Planned With Care" center />
        <p className="mt-5 text-ink/70 leading-relaxed max-w-2xl mx-auto">
          Whether it's your first trip to Ooty or your tenth visit to Madurai, we treat every
          booking like it matters &mdash; because to us, it does.
        </p>
      </section>
    </>
  );
}
