const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// GET /api/destinations - public, list all
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM destinations ORDER BY featured DESC, name ASC').all();
  res.json(rows);
});

// GET /api/destinations/:slug - public, single destination
router.get('/:slug', (req, res) => {
  const row = db.prepare('SELECT * FROM destinations WHERE slug = ?').get(req.params.slug);
  if (!row) return res.status(404).json({ error: 'Destination not found.' });
  res.json(row);
});

// POST /api/destinations - admin only, create
router.post('/', requireAuth, (req, res) => {
  const { name, tagline, description, image_url, best_time_to_visit, featured } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required.' });

  const slug = slugify(name);
  try {
    const result = db.prepare(`
      INSERT INTO destinations (name, slug, tagline, description, image_url, best_time_to_visit, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(name, slug, tagline || '', description || '', image_url || '', best_time_to_visit || '', featured ? 1 : 0);

    const created = db.prepare('SELECT * FROM destinations WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: 'A destination with this name already exists.' });
  }
});

// PUT /api/destinations/:id - admin only, update
router.put('/:id', requireAuth, (req, res) => {
  const { name, tagline, description, image_url, best_time_to_visit, featured } = req.body;
  const existing = db.prepare('SELECT * FROM destinations WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Destination not found.' });

  const slug = name ? slugify(name) : existing.slug;

  db.prepare(`
    UPDATE destinations SET
      name = ?, slug = ?, tagline = ?, description = ?, image_url = ?, best_time_to_visit = ?, featured = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    name || existing.name,
    slug,
    tagline ?? existing.tagline,
    description ?? existing.description,
    image_url ?? existing.image_url,
    best_time_to_visit ?? existing.best_time_to_visit,
    featured !== undefined ? (featured ? 1 : 0) : existing.featured,
    req.params.id
  );

  const updated = db.prepare('SELECT * FROM destinations WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE /api/destinations/:id - admin only
router.delete('/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM destinations WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Destination not found.' });

  db.prepare('DELETE FROM destinations WHERE id = ?').run(req.params.id);
  res.json({ message: 'Destination deleted successfully.' });
});

module.exports = router;
