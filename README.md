# Harthika Travels — Tamil Nadu Tours & Travel Website

A full-stack website for **Harthika Travels**, a (fictional/demo) Tamil Nadu tours
and travel agency. Includes a public-facing site plus an admin panel to manage
destinations, packages, gallery, testimonials, and customer enquiries.

## What's included

- **Frontend**: React (Vite) + React Router + Tailwind CSS
- **Backend**: Node.js + Express REST API
- **Database**: SQLite (file-based, zero setup — `backend/db/harthika.db` is created automatically)
- **Admin Panel**: Login-protected dashboard with full CRUD for all content
- **Contact/Booking**: Form saved to the database, plus WhatsApp & phone click-to-contact

---

## Prerequisites

You need **Node.js v18 or later** installed. Check with:
```bash
node --version
```
If you don't have it, download it from https://nodejs.org

---

## 1. Backend Setup

```bash
cd backend
npm install
npm run seed     # creates the database, seeds Tamil Nadu destinations/packages, creates admin user
npm start         # starts the API server on http://localhost:5000
```

You should see:
```
Harthika Travels API running on http://localhost:5000
```

**Default admin login** (set in `backend/.env`, change before going live):
- Username: `admin`
- Password: `Harthika@2026`

Leave this terminal running.

---

## 2. Frontend Setup

Open a **new terminal window**:

```bash
cd frontend
npm install
npm run dev       # starts the React app on http://localhost:5173
```

Open **http://localhost:5173** in your browser — that's your live website.

---

## 3. Accessing the Admin Panel

Go to **http://localhost:5173/admin/login** and log in with the credentials above.

From the admin panel you can:
- Add/edit/delete **Destinations**
- Add/edit/delete **Tour Packages** (linked to destinations)
- Add/delete **Gallery** images
- Add/approve/delete **Testimonials**
- View and manage **Enquiries** (from the Contact/Booking form), including direct WhatsApp/call links

---

## Project Structure

```
harthika-travels/
├── backend/
│   ├── server.js              # Express entry point
│   ├── db/
│   │   ├── database.js        # SQLite connection + schema
│   │   └── seed.js            # Seed data (Tamil Nadu destinations, packages, admin user)
│   ├── routes/                 # API routes (auth, destinations, packages, gallery, testimonials, inquiries)
│   ├── middleware/auth.js      # JWT auth middleware
│   └── .env                    # Config (PORT, JWT secret, admin credentials)
│
└── frontend/
    ├── src/
    │   ├── pages/               # Public pages (Home, About, Packages, Destinations, Gallery, Testimonials, Contact)
    │   ├── pages/admin/          # Admin panel pages
    │   ├── components/          # Shared UI components
    │   ├── context/AuthContext.jsx
    │   └── api/client.js        # Frontend API client
    └── tailwind.config.js       # Custom Harthika Travels color palette
```

---

## Important things to customize before going live

1. **WhatsApp number**: currently a placeholder (`919876543210`). Update it in:
   - `frontend/src/components/WhatsAppButton.jsx`
   - `frontend/src/pages/Contact.jsx`
2. **Phone number & email**: update in `frontend/src/components/Footer.jsx` and `frontend/src/pages/Contact.jsx`
3. **Admin credentials**: change `ADMIN_USERNAME` / `ADMIN_PASSWORD` in `backend/.env` **before** running `npm run seed` for the first time (or delete `backend/db/harthika.db` and re-seed after changing).
4. **JWT_SECRET**: change this in `backend/.env` to a long random string before deploying publicly.
5. **Images**: destinations/packages currently use royalty-free Unsplash stock photos. Replace `image_url` values via the Admin Panel with your own real photos once available.

---

## Deploying for real customers

This is currently set up for **local development**. To go live you'll want to:
1. Host the backend (e.g. on a VPS, Render, or Railway) — note SQLite works fine for low-to-moderate traffic; for higher traffic consider migrating to PostgreSQL.
2. Build the frontend for production: `cd frontend && npm run build` (outputs to `frontend/dist`), then host the static files (e.g. Netlify, Vercel, or served by the same backend).
3. Update the frontend's API base URL if backend and frontend are hosted on different domains (currently uses a relative `/api` path via Vite's dev proxy — you'll need to either reverse-proxy `/api` in production too, or set an absolute API URL).
4. Set up HTTPS, and move all secrets (`JWT_SECRET`, admin password) to your hosting provider's environment variable settings rather than the `.env` file.

---

## Troubleshooting

- **"Cannot connect to API" / blank data on pages**: make sure the backend (`npm start` in `backend/`) is running on port 5000 before starting the frontend.
- **Admin login fails**: confirm you ran `npm run seed` at least once, and double-check the username/password in `backend/.env`.
- **Port already in use**: change `PORT` in `backend/.env`, and update the proxy target in `frontend/vite.config.js` to match.
