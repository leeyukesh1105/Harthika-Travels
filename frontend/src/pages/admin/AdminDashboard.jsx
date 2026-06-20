import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import Loading from '../../components/Loading';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getDestinations(), api.getPackages(), api.getInquiries(), api.getAllTestimonials()])
      .then(([destinations, packages, inquiries, testimonials]) => {
        setStats({
          destinations: destinations.length,
          packages: packages.length,
          inquiries: inquiries.length,
          newInquiries: inquiries.filter((i) => i.status === 'new').length,
          testimonials: testimonials.length,
          recentInquiries: inquiries.slice(0, 5),
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading label="Loading dashboard..." />;

  const cards = [
    { label: 'Destinations', value: stats?.destinations ?? 0, icon: '🗺️', to: '/admin/destinations', color: 'bg-teal' },
    { label: 'Tour Packages', value: stats?.packages ?? 0, icon: '🧳', to: '/admin/packages', color: 'bg-sunset' },
    { label: 'New Enquiries', value: stats?.newInquiries ?? 0, icon: '📩', to: '/admin/inquiries', color: 'bg-marigold' },
    { label: 'Testimonials', value: stats?.testimonials ?? 0, icon: '⭐', to: '/admin/testimonials', color: 'bg-ink' },
  ];

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl text-ink mb-1">Dashboard</h1>
      <p className="text-ink/60 text-sm mb-8">Overview of Harthika Travels site content.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="bg-white rounded-postcard border border-ink/10 p-5 hover:shadow-lg transition-shadow"
          >
            <div className={`w-11 h-11 rounded-full ${c.color} flex items-center justify-center text-xl text-white`}>
              {c.icon}
            </div>
            <p className="font-display font-bold text-3xl text-ink mt-4">{c.value}</p>
            <p className="text-ink/60 text-sm">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-postcard border border-ink/10 mt-8 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-lg text-ink">Recent Enquiries</h2>
          <Link to="/admin/inquiries" className="text-teal text-sm font-semibold hover:underline">
            View all →
          </Link>
        </div>
        {stats?.recentInquiries?.length === 0 ? (
          <p className="text-ink/50 text-sm py-6 text-center">No enquiries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink/50 border-b border-ink/10">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Phone</th>
                  <th className="py-2 pr-4">Destination</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentInquiries?.map((inq) => (
                  <tr key={inq.id} className="border-b border-ink/5">
                    <td className="py-3 pr-4 font-medium text-ink">{inq.name}</td>
                    <td className="py-3 pr-4 text-ink/70">{inq.phone}</td>
                    <td className="py-3 pr-4 text-ink/70">{inq.destination_interest || '—'}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          inq.status === 'new' ? 'bg-marigold/20 text-marigold-dark' : 'bg-teal/10 text-teal-dark'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
