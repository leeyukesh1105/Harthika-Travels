const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/gallery - public, list all
router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT gallery.*, destinations.name as destination_name
    FROM gallery LEFT JOIN destinations ON gallery.destination_id = destinations.id
    ORDER BY gallery.id DESC
  `).all();
  res.json(rows);
});

// POST /api/gallery - admin only, add image
router.post('/', requireAuth, (req, res) => {
  const { title, image_url, destination_id } = req.body;
  if (!image_url) return res.status(400).json({ error: 'image_url is required.' });

  const result = db.prepare(`
    INSERT INTO gallery (title, image_url, destination_id) VALUES (?, ?, ?)
  `).run(title || '', image_url, destination_id || null);

  const created = db.prepare('SELECT * FROM gallery WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

// DELETE /api/gallery/:id - admin only
router.delete('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Gallery image not found.' });

  db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id);
  res.json({ message: 'Gallery image deleted successfully.' });
});

module.exports = router;
