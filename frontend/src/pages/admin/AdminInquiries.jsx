import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

const STATUS_OPTIONS = ['new', 'contacted', 'closed'];

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    api.getInquiries().then(setInquiries).catch(() => {}).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  const filtered = filter === 'all' ? inquiries : inquiries.filter((i) => i.status === filter);

  async function updateStatus(inq, status) {
    try {
      await api.updateInquiry(inq.id, { status });
      load();
      if (viewing && viewing.id === inq.id) setViewing({ ...viewing, status });
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete() {
    try {
      await api.deleteInquiry(deleteTarget.id);
      setDeleteTarget(null);
      setViewing(null);
      load();
    } catch (err) {
      setError(err.message);
      setDeleteTarget(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-semibold text-2xl text-ink">Enquiries</h1>
          <p className="text-ink/60 text-sm">Booking and contact form submissions from the website.</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        {['all', ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-colors ${
              filter === s ? 'bg-sunset text-white' : 'bg-white text-ink/60 border border-ink/10'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {error && <div className="bg-sunset/10 text-sunset-dark text-sm rounded-lg p-3 mb-4 font-medium">{error}</div>}

      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white rounded-postcard border border-ink/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink/50 border-b border-ink/10 bg-cream">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inq) => (
                  <tr key={inq.id} className="border-b border-ink/5">
                    <td className="py-3 px-4 font-medium text-ink">{inq.name}</td>
                    <td className="py-3 px-4 text-ink/60">{inq.phone}</td>
                    <td className="py-3 px-4 text-ink/60">{inq.destination_interest || '—'}</td>
                    <td className="py-3 px-4 text-ink/60">{new Date(inq.created_at).toLocaleDateString('en-IN')}</td>
                    <td className="py-3 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => updateStatus(inq, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-2.5 py-1 border-0 capitalize ${
                          inq.status === 'new' ? 'bg-marigold/20 text-marigold-dark' :
                          inq.status === 'contacted' ? 'bg-teal/10 text-teal-dark' : 'bg-ink/10 text-ink/50'
                        }`}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => setViewing(inq)} className="text-teal font-semibold hover:underline focus-ring rounded">View</button>
                      <button onClick={() => setDeleteTarget(inq)} className="text-sunset font-semibold hover:underline focus-ring rounded">Delete</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="py-10 text-center text-ink/50">No enquiries found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewing && (
        <Modal title="Enquiry Details" onClose={() => setViewing(null)}>
          <dl className="space-y-3 text-sm">
            <div><dt className="text-ink/50">Name</dt><dd className="font-medium text-ink">{viewing.name}</dd></div>
            <div><dt className="text-ink/50">Phone</dt><dd className="font-medium text-ink">{viewing.phone}</dd></div>
            <div><dt className="text-ink/50">Email</dt><dd className="font-medium text-ink">{viewing.email || '—'}</dd></div>
            <div><dt className="text-ink/50">Destination Interest</dt><dd className="font-medium text-ink">{viewing.destination_interest || '—'}</dd></div>
            <div><dt className="text-ink/50">Preferred Travel Date</dt><dd className="font-medium text-ink">{viewing.travel_date || '—'}</dd></div>
            <div><dt className="text-ink/50">Number of Travellers</dt><dd className="font-medium text-ink">{viewing.num_travelers || '—'}</dd></div>
            <div><dt className="text-ink/50">Message</dt><dd className="font-medium text-ink whitespace-pre-wrap">{viewing.message || '—'}</dd></div>
            <div><dt className="text-ink/50">Submitted</dt><dd className="font-medium text-ink">{new Date(viewing.created_at).toLocaleString('en-IN')}</dd></div>
          </dl>
          <div className="flex gap-3 pt-5">
            <a
              href={`https://wa.me/91${viewing.phone.replace(/\D/g, '').slice(-10)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center rounded-full bg-[#25D366] text-white font-semibold py-2.5 hover:opacity-90 transition-opacity"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${viewing.phone}`}
              className="flex-1 text-center rounded-full bg-teal text-white font-semibold py-2.5 hover:bg-teal-dark transition-colors"
            >
              Call
            </a>
          </div>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete enquiry from "${deleteTarget.name}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
