const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// GET /api/packages - public, list all (optionally filter by destination_id)
router.get('/', (req, res) => {
  const { destination_id } = req.query;
  let rows;
  if (destination_id) {
    rows = db.prepare(`
      SELECT packages.*, destinations.name as destination_name, destinations.slug as destination_slug
      FROM packages LEFT JOIN destinations ON packages.destination_id = destinations.id
      WHERE packages.destination_id = ?
      ORDER BY packages.featured DESC, packages.id DESC
    `).all(destination_id);
  } else {
    rows = db.prepare(`
      SELECT packages.*, destinations.name as destination_name, destinations.slug as destination_slug
      FROM packages LEFT JOIN destinations ON packages.destination_id = destinations.id
      ORDER BY packages.featured DESC, packages.id DESC
    `).all();
  }
  res.json(rows);
});

// GET /api/packages/:slug - public, single package
router.get('/:slug', (req, res) => {
  const row = db.prepare(`
    SELECT packages.*, destinations.name as destination_name, destinations.slug as destination_slug
    FROM packages LEFT JOIN destinations ON packages.destination_id = destinations.id
    WHERE packages.slug = ?
  `).get(req.params.slug);
  if (!row) return res.status(404).json({ error: 'Package not found.' });
  res.json(row);
});

// POST /api/packages - admin only, create
router.post('/', requireAuth, (req, res) => {
  const { title, destination_id, duration_days, duration_nights, price, description, highlights, image_url, featured } = req.body;
  if (!title || !duration_days || !price) {
    return res.status(400).json({ error: 'Title, duration_days, and price are required.' });
  }

  const slug = slugify(title);
  try {
    const result = db.prepare(`
      INSERT INTO packages (title, slug, destination_id, duration_days, duration_nights, price, description, highlights, image_url, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, slug, destination_id || null, duration_days, duration_nights || 0,
      price, description || '', highlights || '', image_url || '', featured ? 1 : 0
    );

    const created = db.prepare('SELECT * FROM packages WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: 'A package with this title already exists.' });
  }
});

// PUT /api/packages/:id - admin only, update
router.put('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM packages WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Package not found.' });

  const { title, destination_id, duration_days, duration_nights, price, description, highlights, image_url, featured } = req.body;
  const slug = title ? slugify(title) : existing.slug;

  db.prepare(`
    UPDATE packages SET
      title = ?, slug = ?, destination_id = ?, duration_days = ?, duration_nights = ?,
      price = ?, description = ?, highlights = ?, image_url = ?, featured = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    title || existing.title,
    slug,
    destination_id !== undefined ? destination_id : existing.destination_id,
    duration_days || existing.duration_days,
    duration_nights !== undefined ? duration_nights : existing.duration_nights,
    price || existing.price,
    description ?? existing.description,
    highlights ?? existing.highlights,
    image_url ?? existing.image_url,
    featured !== undefined ? (featured ? 1 : 0) : existing.featured,
    req.params.id
  );

  const updated = db.prepare('SELECT * FROM packages WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE /api/packages/:id - admin only
router.delete('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM packages WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Package not found.' });

  db.prepare('DELETE FROM packages WHERE id = ?').run(req.params.id);
  res.json({ message: 'Package deleted successfully.' });
});

module.exports = router;
