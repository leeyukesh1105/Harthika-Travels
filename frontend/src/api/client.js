// In local dev, this stays '/api' and Vite's proxy (vite.config.js) forwards it to localhost:5000.
// In production, set VITE_API_URL (e.g. https://harthika-backend.onrender.com/api) as an
// environment variable on your hosting provider (Render/Vercel/Netlify static site settings).
const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getToken() {
  return localStorage.getItem('harthika_admin_token');
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.');
  }
  return data;
}

export const api = {
  // Auth
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),

  // Destinations
  getDestinations: () => request('/destinations'),
  getDestination: (slug) => request(`/destinations/${slug}`),
  createDestination: (payload) => request('/destinations', { method: 'POST', body: JSON.stringify(payload) }),
  updateDestination: (id, payload) => request(`/destinations/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteDestination: (id) => request(`/destinations/${id}`, { method: 'DELETE' }),

  // Packages
  getPackages: (destinationId) => request(destinationId ? `/packages?destination_id=${destinationId}` : '/packages'),
  getPackage: (slug) => request(`/packages/${slug}`),
  createPackage: (payload) => request('/packages', { method: 'POST', body: JSON.stringify(payload) }),
  updatePackage: (id, payload) => request(`/packages/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deletePackage: (id) => request(`/packages/${id}`, { method: 'DELETE' }),

  // Gallery
  getGallery: () => request('/gallery'),
  createGalleryImage: (payload) => request('/gallery', { method: 'POST', body: JSON.stringify(payload) }),
  deleteGalleryImage: (id) => request(`/gallery/${id}`, { method: 'DELETE' }),

  // Testimonials
  getTestimonials: () => request('/testimonials'),
  getAllTestimonials: () => request('/testimonials/all'),
  createTestimonial: (payload) => request('/testimonials', { method: 'POST', body: JSON.stringify(payload) }),
  updateTestimonial: (id, payload) => request(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteTestimonial: (id) => request(`/testimonials/${id}`, { method: 'DELETE' }),

  // Inquiries
  submitInquiry: (payload) => request('/inquiries', { method: 'POST', body: JSON.stringify(payload) }),
  getInquiries: () => request('/inquiries'),
  updateInquiry: (id, payload) => request(`/inquiries/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteInquiry: (id) => request(`/inquiries/${id}`, { method: 'DELETE' }),
};

export { getToken };
