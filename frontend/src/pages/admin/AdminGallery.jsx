import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

const emptyForm = { title: '', image_url: '', destination_id: '' };

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  function load() {
    setLoading(true);
    Promise.all([api.getGallery(), api.getDestinations()])
      .then(([g, d]) => { setImages(g); setDestinations(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.image_url.trim()) { setError('Image URL is required.'); return; }
    setSaving(true);
    setError('');
    try {
      await api.createGalleryImage({
        ...form,
        destination_id: form.destination_id ? Number(form.destination_id) : null,
      });
      setCreating(false);
      setForm(emptyForm);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await api.deleteGalleryImage(deleteTarget.id);
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
          <h1 className="font-display font-semibold text-2xl text-ink">Gallery</h1>
          <p className="text-ink/60 text-sm">Manage images shown on the public Gallery page.</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setError(''); setCreating(true); }}
          className="rounded-full bg-sunset text-white font-semibold text-sm px-5 py-2.5 hover:bg-sunset-dark transition-colors focus-ring"
        >
          + Add Image
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : images.length === 0 ? (
        <p className="text-ink/50 text-center py-16 bg-white rounded-postcard border border-ink/10">
          No gallery images added yet. The public Gallery page is currently showing default sample photos.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="bg-white rounded-postcard border border-ink/10 overflow-hidden">
              <img src={img.image_url} alt={img.title || 'Gallery image'} className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="text-sm font-medium text-ink truncate">{img.title || 'Untitled'}</p>
                {img.destination_name && <p className="text-xs text-ink/50">{img.destination_name}</p>}
                <button
                  onClick={() => setDeleteTarget(img)}
                  className="text-sunset text-xs font-semibold hover:underline mt-2 focus-ring rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {creating && (
        <Modal title="Add Gallery Image" onClose={() => setCreating(false)}>
          {error && <div className="bg-sunset/10 text-sunset-dark text-sm rounded-lg p-3 mb-4 font-medium">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Image URL *</label>
              <input name="image_url" value={form.image_url} onChange={handleChange} required placeholder="https://..." className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Title / Caption</label>
              <input name="title" value={form.title} onChange={handleChange} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Related Destination</label>
              <select name="destination_id" value={form.destination_id} onChange={handleChange} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal">
                <option value="">— None —</option>
                {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setCreating(false)} className="flex-1 rounded-full border border-ink/15 text-ink font-semibold py-2.5 hover:bg-ink/5 transition-colors focus-ring">Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 rounded-full bg-sunset text-white font-semibold py-2.5 hover:bg-sunset-dark transition-colors focus-ring disabled:opacity-60">
                {saving ? 'Saving...' : 'Add'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message="Delete this image from the gallery? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
