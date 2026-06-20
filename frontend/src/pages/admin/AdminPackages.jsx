import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

const emptyForm = {
  title: '', destination_id: '', duration_days: '', duration_nights: '',
  price: '', description: '', highlights: '', image_url: '', featured: false,
};

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  function load() {
    setLoading(true);
    Promise.all([api.getPackages(), api.getDestinations()])
      .then(([p, d]) => { setPackages(p); setDestinations(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setForm(emptyForm);
    setError('');
    setEditing({});
  }

  function openEdit(pkg) {
    setForm({
      title: pkg.title,
      destination_id: pkg.destination_id || '',
      duration_days: pkg.duration_days,
      duration_nights: pkg.duration_nights,
      price: pkg.price,
      description: pkg.description || '',
      highlights: pkg.highlights || '',
      image_url: pkg.image_url || '',
      featured: !!pkg.featured,
    });
    setError('');
    setEditing(pkg);
  }

  function closeModal() { setEditing(null); }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.duration_days || !form.price) {
      setError('Title, duration (days), and price are required.');
      return;
    }
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      destination_id: form.destination_id ? Number(form.destination_id) : null,
      duration_days: Number(form.duration_days),
      duration_nights: Number(form.duration_nights || 0),
      price: Number(form.price),
    };
    try {
      if (editing && editing.id) {
        await api.updatePackage(editing.id, payload);
      } else {
        await api.createPackage(payload);
      }
      closeModal();
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await api.deletePackage(deleteTarget.id);
      setDeleteTarget(null);
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
          <h1 className="font-display font-semibold text-2xl text-ink">Tour Packages</h1>
          <p className="text-ink/60 text-sm">Manage tour packages shown on the site.</p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-full bg-sunset text-white font-semibold text-sm px-5 py-2.5 hover:bg-sunset-dark transition-colors focus-ring"
        >
          + Add Package
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white rounded-postcard border border-ink/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink/50 border-b border-ink/10 bg-cream">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((p) => (
                  <tr key={p.id} className="border-b border-ink/5">
                    <td className="py-3 px-4 font-medium text-ink">{p.title}</td>
                    <td className="py-3 px-4 text-ink/60">{p.destination_name || '—'}</td>
                    <td className="py-3 px-4 text-ink/60">{p.duration_days}D/{p.duration_nights}N</td>
                    <td className="py-3 px-4 text-ink/60">₹{p.price.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">
                      {p.featured ? (
                        <span className="bg-marigold/20 text-marigold-dark text-xs font-semibold px-2.5 py-1 rounded-full">Yes</span>
                      ) : (
                        <span className="text-ink/40 text-xs">No</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => openEdit(p)} className="text-teal font-semibold hover:underline focus-ring rounded">Edit</button>
                      <button onClick={() => setDeleteTarget(p)} className="text-sunset font-semibold hover:underline focus-ring rounded">Delete</button>
                    </td>
                  </tr>
                ))}
                {packages.length === 0 && (
                  <tr><td colSpan={6} className="py-10 text-center text-ink/50">No packages yet. Add your first one!</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editing !== null && (
        <Modal title={editing.id ? 'Edit Package' : 'Add Package'} onClose={closeModal} maxWidth="max-w-2xl">
          {error && <div className="bg-sunset/10 text-sunset-dark text-sm rounded-lg p-3 mb-4 font-medium">{error}</div>}
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-ink mb-1.5">Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Destination</label>
              <select name="destination_id" value={form.destination_id} onChange={handleChange} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal">
                <option value="">— None —</option>
                {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Price (₹) *</label>
              <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Duration (Days) *</label>
              <input name="duration_days" type="number" min="1" value={form.duration_days} onChange={handleChange} required className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Duration (Nights)</label>
              <input name="duration_nights" type="number" min="0" value={form.duration_nights} onChange={handleChange} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-ink mb-1.5">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal resize-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-ink mb-1.5">Highlights (comma-separated)</label>
              <input name="highlights" value={form.highlights} onChange={handleChange} placeholder="Tea Factory Visit, Lake Boating, Toy Train" className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-ink mb-1.5">Image URL</label>
              <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://..." className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" />
            </div>
            <label className="sm:col-span-2 flex items-center gap-2 text-sm font-medium text-ink">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4" />
              Mark as featured / popular
            </label>
            <div className="sm:col-span-2 flex gap-3 pt-2">
              <button type="button" onClick={closeModal} className="flex-1 rounded-full border border-ink/15 text-ink font-semibold py-2.5 hover:bg-ink/5 transition-colors focus-ring">Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 rounded-full bg-sunset text-white font-semibold py-2.5 hover:bg-sunset-dark transition-colors focus-ring disabled:opacity-60">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete "${deleteTarget.title}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
