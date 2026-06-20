import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/packages', label: 'Tour Packages' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-ink/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <NavLink to="/" className="focus-ring rounded" onClick={() => setOpen(false)}>
          <Logo />
        </NavLink>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link focus-ring rounded font-medium text-sm tracking-wide ${
                  isActive ? 'text-sunset active' : 'text-ink/80 hover:text-sunset'
                }`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <a
          href="/contact"
          className="hidden lg:inline-flex items-center justify-center rounded-full bg-sunset text-white font-semibold text-sm px-5 py-2.5 hover:bg-sunset-dark transition-colors focus-ring"
        >
          Plan My Trip
        </a>

        <button
          className="lg:hidden p-2 text-ink focus-ring rounded"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-ink/10 bg-cream px-4 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-3 rounded-lg font-medium text-sm ${
                  isActive ? 'bg-sunset/10 text-sunset' : 'text-ink/80 hover:bg-ink/5'
                }`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 text-center rounded-full bg-sunset text-white font-semibold text-sm px-5 py-3 hover:bg-sunset-dark transition-colors"
          >
            Plan My Trip
          </a>
        </div>
      )}
    </header>
  );
}
