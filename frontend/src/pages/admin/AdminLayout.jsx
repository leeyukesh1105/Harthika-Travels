import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';

const links = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/destinations', label: 'Destinations', icon: '🗺️' },
  { to: '/admin/packages', label: 'Tour Packages', icon: '🧳' },
  { to: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { to: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
  { to: '/admin/inquiries', label: 'Enquiries', icon: '📩' },
];

export default function AdminLayout({ children }) {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-ink text-white flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <Logo light />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-sunset text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/50 px-4 mb-2">Logged in as {username}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            🚪 Log Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-ink text-white flex items-center justify-between px-4 h-16">
        <Logo light />
        <button onClick={() => setOpen(!open)} className="p-2" aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7H20M4 12H20M4 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-ink text-white p-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-sunset text-white' : 'text-white/70'
                }`
              }
            >
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
          <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-white/70">
            🚪 Log Out
          </button>
        </div>
      )}

      <main className="flex-1 p-5 lg:p-8 pt-20 lg:pt-8 max-w-full overflow-x-hidden">{children}</main>
    </div>
  );
}
