import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';

const emptyForm = { customer_name: '', location: '', rating: 5, message: '', approved: true };

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  function load() {
    setLoading(true);
    api.getAllTestimonials().then(setTestimonials).catch(() => {}).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.customer_name.trim() || !form.message.trim()) {
      setError('Customer name and message are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await api.createTestimonial({ ...form, rating: Number(form.rating) });
      setCreating(false);
      setForm(emptyForm);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleApproved(t) {
    try {
      await api.updateTestimonial(t.id, { approved: !t.approved });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete() {
    try {
      await api.deleteTestimonial(deleteTarget.id);
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
          <h1 className="font-display font-semibold text-2xl text-ink">Testimonials</h1>
          <p className="text-ink/60 text-sm">Approve, add, or remove customer testimonials.</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setError(''); setCreating(true); }}
          className="rounded-full bg-sunset text-white font-semibold text-sm px-5 py-2.5 hover:bg-sunset-dark transition-colors focus-ring"
        >
          + Add Testimonial
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
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t.id} className="border-b border-ink/5">
                    <td className="py-3 px-4 font-medium text-ink">{t.customer_name}<br /><span className="text-xs text-ink/50">{t.location}</span></td>
                    <td className="py-3 px-4 text-marigold-dark">{'★'.repeat(t.rating)}</td>
                    <td className="py-3 px-4 text-ink/60 max-w-xs truncate">{t.message}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleApproved(t)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          t.approved ? 'bg-teal/10 text-teal-dark' : 'bg-ink/10 text-ink/50'
                        }`}
                      >
                        {t.approved ? 'Approved' : 'Hidden'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => setDeleteTarget(t)} className="text-sunset font-semibold hover:underline focus-ring rounded">Delete</button>
                    </td>
                  </tr>
                ))}
                {testimonials.length === 0 && (
                  <tr><td colSpan={5} className="py-10 text-center text-ink/50">No testimonials yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {creating && (
        <Modal title="Add Testimonial" onClose={() => setCreating(false)}>
          {error && <div className="bg-sunset/10 text-sunset-dark text-sm rounded-lg p-3 mb-4 font-medium">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Customer Name *</label>
              <input name="customer_name" value={form.customer_name} onChange={handleChange} required className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Location</label>
              <input name="location" value={form.location} onChange={handleChange} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Rating</label>
              <select name="rating" value={form.rating} onChange={handleChange} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal">
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows={3} className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal resize-none" />
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-ink">
              <input type="checkbox" name="approved" checked={form.approved} onChange={handleChange} className="w-4 h-4" />
              Show publicly (approved)
            </label>
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
          message={`Delete testimonial from "${deleteTarget.customer_name}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
