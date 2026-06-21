# SALTed — F&B Marketplace

**Sarawak's Authentic Local Taste, Extra Delicious**

A full-stack ordering and table-booking web app for SALTed restaurant, built with Next.js 16, Supabase, and Tailwind CSS v4.

## Features

- **Order for Pickup** — browse menu, build cart, send via WhatsApp
- **Book a Table** — reservation form, sends via WhatsApp
- **Admin Panel** — menu CRUD, categories, settings, image uploads to Supabase Storage
- **Halal** — Muslim-owned, clearly marked throughout
- **Accessible** — WCAG AA, 52px touch targets, 16px minimum font, screen reader labels

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Image Storage | Supabase Storage (menu-images bucket) |
| Cart | localStorage + React Context |
| Deploy | Vercel |

## Prerequisites

- Node.js 20+
- Supabase account + project
- Vercel account (for deployment)

## Setup

### 1. Supabase

1. Create a new Supabase project
2. Go to SQL Editor → paste and run `data/schema.sql`
3. Go to Storage → create a bucket named `menu-images` (set to **Public**)
4. Go to Authentication → Users → **Invite user** with your admin email

### 2. Clone & install

```bash
git clone https://github.com/asyazwan8/saltedswk
cd saltedswk
npm install
```

### 3. Environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL` — from Supabase dashboard → Project Settings → API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from the same page
- `SUPABASE_SERVICE_ROLE_KEY` — from the same page (**keep this secret**)

### 4. Download brand assets

```bash
node scripts/download-assets.js
```

Then manually save the SALTed Instagram profile picture to `public/brand/logo.png`.

### 5. Seed menu data

```bash
npx ts-node --project tsconfig.json scripts/seed.ts
```

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Deploy to Vercel

1. Connect your GitHub repo to Vercel
2. Add all env vars in Vercel dashboard → Project Settings → Environment Variables
3. Deploy — Vercel auto-detects Next.js

## Contact

- Instagram: [@saltedswk](https://www.instagram.com/saltedswk/)
- WhatsApp: +60 3-7493 5266
- Address: 30-1, Jalan PJU 7/16A, Mutiara Damansara, 47810 Petaling Jaya, Selangor
