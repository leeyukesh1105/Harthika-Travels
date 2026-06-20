import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Your trusted partner for Tamil Nadu tours, since day one. Hills, temples, beaches,
            and everything in between &mdash; planned with care.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-marigold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/packages" className="hover:text-white">Tour Packages</Link></li>
            <li><Link to="/destinations" className="hover:text-white">Destinations</Link></li>
            <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link to="/testimonials" className="hover:text-white">Testimonials</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-marigold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact / Booking</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-marigold mb-4">Get in Touch</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>📞 +91 98765 43210</li>
            <li>✉️ booking@harthikatravels.in</li>
            <li>📍 Madurai, Tamil Nadu, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        &copy; {new Date().getFullYear()} Harthika Travels. All rights reserved.
      </div>
    </footer>
  );
}
