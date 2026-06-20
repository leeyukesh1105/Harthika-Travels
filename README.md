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

## Deploying for real customers (Render, free tier)

This project is split into two folders so it deploys cleanly as two separate Render services.

### A. Push to GitHub
Push the whole `harthika-travels` folder to a GitHub repo. Note: GitHub's default
Node `.gitignore` often excludes `.env` — don't rely on it being in the repo;
set secrets directly in Render instead (see below).

### B. Deploy the backend
1. On [render.com](https://render.com), click **New +** → **Web Service**, connect your GitHub repo.
2. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run seed`
   - **Start Command**: `npm start`
3. Add Environment Variables in the Render dashboard (don't rely on `.env`):
   - `PORT` = `5000`
   - `JWT_SECRET` = a long random string
   - `ADMIN_USERNAME` = your choice
   - `ADMIN_PASSWORD` = a strong password
4. Deploy. Render gives you a URL like `https://harthika-backend.onrender.com`.
5. Verify it works: visit `https://harthika-backend.onrender.com/api/health` — expect `{"status":"ok",...}`.

> ⚠️ Render's free tier has an ephemeral filesystem — the SQLite file can reset on
> redeploys/restarts. Fine for demos; for real customer data, either upgrade to a
> paid instance with a persistent disk, or migrate to a managed Postgres database.

### C. Deploy the frontend
1. On Render, click **New +** → **Static Site**, connect the same repo.
2. Settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
3. Add an Environment Variable:
   - `VITE_API_URL` = `https://harthika-backend.onrender.com/api` (use your actual backend URL from step B, with `/api` on the end)
4. Deploy. Render gives you your live site URL, e.g. `https://harthika-travels.onrender.com` — **this is the link you share with people**.

### D. Re-seed or update later
Any time you push new commits to GitHub, Render auto-redeploys both services
(if auto-deploy is enabled, which it is by default).

### Notes
- HTTPS is automatic on Render — no extra setup needed.
- Free tier services "spin down" after inactivity and take ~30–60 seconds to wake on
  the next visit — normal for free hosting, just means the first load might feel slow.

---

## Troubleshooting

- **"Cannot connect to API" / blank data on pages**: make sure the backend (`npm start` in `backend/`) is running on port 5000 before starting the frontend.
- **Admin login fails**: confirm you ran `npm run seed` at least once, and double-check the username/password in `backend/.env`.
- **Port already in use**: change `PORT` in `backend/.env`, and update the proxy target in `frontend/vite.config.js` to match.
