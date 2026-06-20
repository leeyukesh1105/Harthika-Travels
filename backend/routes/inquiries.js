const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// POST /api/inquiries - public, submit a booking/contact inquiry
router.post('/', (req, res) => {
  const { name, phone, email, destination_interest, travel_date, num_travelers, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone number are required.' });
  }

  const result = db.prepare(`
    INSERT INTO inquiries (name, phone, email, destination_interest, travel_date, num_travelers, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    name, phone, email || '', destination_interest || '',
    travel_date || '', num_travelers || null, message || ''
  );

  const created = db.prepare('SELECT * FROM inquiries WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json({ message: 'Thank you! We have received your inquiry and will contact you shortly.', inquiry: created });
});

// GET /api/inquiries - admin only, list all inquiries
router.get('/', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all();
  res.json(rows);
});

// PUT /api/inquiries/:id - admin only, update status (new / contacted / closed)
router.put('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM inquiries WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Inquiry not found.' });

  const { status } = req.body;
  db.prepare('UPDATE inquiries SET status = ? WHERE id = ?').run(status || existing.status, req.params.id);

  const updated = db.prepare('SELECT * FROM inquiries WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE /api/inquiries/:id - admin only
router.delete('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM inquiries WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Inquiry not found.' });

  db.prepare('DELETE FROM inquiries WHERE id = ?').run(req.params.id);
  res.json({ message: 'Inquiry deleted successfully.' });
});

module.exports = router;
