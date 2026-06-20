import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

const emptyForm = { name: '', tagline: '', description: '', image_url: '', best_time_to_visit: '', featured: false };

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = editing
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  function load() {
    setLoading(true);
    api.getDestinations().then(setDestinations).catch(() => {}).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setForm(emptyForm);
    setError('');
    setEditing({});
  }

  function openEdit(dest) {
    setForm({
      name: dest.name, tagline: dest.tagline || '', description: dest.description || '',
      image_url: dest.image_url || '', best_time_to_visit: dest.best_time_to_visit || '',
      featured: !!dest.featured,
    });
    setError('');
    setEditing(dest);
  }

  function closeModal() {
    setEditing(null);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) { setError('Name is required.'); return; }
    setSaving(true);
    setError('');
    try {
      if (editing && editing.id) {
        await api.updateDestination(editing.id, form);
      } else {
        await api.createDestination(form);
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
      await api.deleteDestination(deleteTarget.id);
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
          <h1 className="font-display font-semibold text-2xl text-ink">Destinations</h1>
          <p className="text-ink/60 text-sm">Manage Tamil Nadu destinations shown on the site.</p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-full bg-sunset text-white font-semibold text-sm px-5 py-2.5 hover:bg-sunset-dark transition-colors focus-ring"
        >
          + Add Destination
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
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Tagline</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((d) => (
                  <tr key={d.id} className="border-b border-ink/5">
                    <td className="py-3 px-4">
                      <img src={d.image_url} alt={d.name} className="w-14 h-14 object-cover rounded-lg" />
                    </td>
                    <td className="py-3 px-4 font-medium text-ink">{d.name}</td>
                    <td className="py-3 px-4 text-ink/60">{d.tagline}</td>
                    <td className="py-3 px-4">
                      {d.featured ? (
                        <span className="bg-marigold/20 text-marigold-dark text-xs font-semibold px-2.5 py-1 rounded-full">Yes</span>
                      ) : (
                        <span className="text-ink/40 text-xs">No</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => openEdit(d)} className="text-teal font-semibold hover:underline focus-ring rounded">
                        Edit
                      </button>
                      <button onClick={() => setDeleteTarget(d)} className="text-sunset font-semibold hover:underline focus-ring rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {destinations.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-ink/50">No destinations yet. Add your first one!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editing !== null && (
        <Modal title={editing.id ? 'Edit Destination' : 'Add Destination'} onClose={closeModal}>
          {error && <div className="bg-sunset/10 text-sunset-dark text-sm rounded-lg p-3 mb-4 font-medium">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Tagline</label>
              <input name="tagline" value={form.tagline} onChange={handleChange} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal resize-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Image URL</label>
              <input name="image_url" value={form.image_url} onChange={handleChange} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Best Time to Visit</label>
              <input name="best_time_to_visit" value={form.best_time_to_visit} onChange={handleChange} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" placeholder="e.g. October to March" />
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-ink">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4" />
              Show as featured on Home page
            </label>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={closeModal} className="flex-1 rounded-full border border-ink/15 text-ink font-semibold py-2.5 hover:bg-ink/5 transition-colors focus-ring">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="flex-1 rounded-full bg-sunset text-white font-semibold py-2.5 hover:bg-sunset-dark transition-colors focus-ring disabled:opacity-60">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete "${deleteTarget.name}"? This cannot be undone, and any linked packages will lose their destination.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
