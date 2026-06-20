import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import Loading from '../components/Loading';

// Fallback gallery images in case the database gallery table is empty,
// so the page still looks complete on first run.
const FALLBACK_IMAGES = [
  { id: 'f1', image_url: 'https://images.unsplash.com/photo-1602216846623-c52e2dad3a5e?w=700&q=80', title: 'Ooty hills' },
  { id: 'f2', image_url: 'https://images.unsplash.com/photo-1626621331169-7322872c8635?w=700&q=80', title: 'Kodaikanal lake' },
  { id: 'f3', image_url: 'https://images.unsplash.com/photo-1621839673705-6617945851a8?w=700&q=80', title: 'Meenakshi Temple' },
  { id: 'f4', image_url: 'https://images.unsplash.com/photo-1623060064327-1066997228d2?w=700&q=80', title: 'Rameswaram bridge' },
  { id: 'f5', image_url: 'https://images.unsplash.com/photo-1602308304610-93d4f0c70932?w=700&q=80', title: 'Kanyakumari coast' },
  { id: 'f6', image_url: 'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=700&q=80', title: 'Mahabalipuram shore temple' },
  { id: 'f7', image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=700&q=80', title: 'Chennai Marina Beach' },
  { id: 'f8', image_url: 'https://images.unsplash.com/photo-1601701119533-fde7ae42d09f?w=700&q=80', title: 'Tea estates' },
];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getGallery()
      .then((data) => setImages(data.length > 0 ? data : FALLBACK_IMAGES))
      .catch(() => setImages(FALLBACK_IMAGES))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bg-sunset py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-ink text-marigold text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full">
            Gallery
          </span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-white mt-6">Moments From Our Trips</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <Loading label="Loading gallery..." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div
                key={img.id}
                className={`overflow-hidden rounded-postcard border border-ink/5 ${i % 5 === 0 ? 'sm:row-span-2 sm:h-full' : ''}`}
              >
                <img
                  src={img.image_url}
                  alt={img.title || 'Harthika Travels gallery photo'}
                  loading="lazy"
                  className="w-full h-48 sm:h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
