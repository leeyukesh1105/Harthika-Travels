const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/testimonials - public, list approved only
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM testimonials WHERE approved = 1 ORDER BY id DESC').all();
  res.json(rows);
});

// GET /api/testimonials/all - admin only, list everything (incl. unapproved)
router.get('/all', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM testimonials ORDER BY id DESC').all();
  res.json(rows);
});

// POST /api/testimonials - admin only, add testimonial
router.post('/', requireAuth, (req, res) => {
  const { customer_name, location, rating, message, avatar_url, approved } = req.body;
  if (!customer_name || !message) {
    return res.status(400).json({ error: 'customer_name and message are required.' });
  }

  const result = db.prepare(`
    INSERT INTO testimonials (customer_name, location, rating, message, avatar_url, approved)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(customer_name, location || '', rating || 5, message, avatar_url || '', approved !== undefined ? (approved ? 1 : 0) : 1);

  const created = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

// PUT /api/testimonials/:id - admin only, update (e.g. approve/reject)
router.put('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Testimonial not found.' });

  const { customer_name, location, rating, message, avatar_url, approved } = req.body;
  db.prepare(`
    UPDATE testimonials SET customer_name = ?, location = ?, rating = ?, message = ?, avatar_url = ?, approved = ?
    WHERE id = ?
  `).run(
    customer_name || existing.customer_name,
    location ?? existing.location,
    rating ?? existing.rating,
    message || existing.message,
    avatar_url ?? existing.avatar_url,
    approved !== undefined ? (approved ? 1 : 0) : existing.approved,
    req.params.id
  );

  const updated = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE /api/testimonials/:id - admin only
router.delete('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Testimonial not found.' });

  db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
  res.json({ message: 'Testimonial deleted successfully.' });
});

module.exports = router;
