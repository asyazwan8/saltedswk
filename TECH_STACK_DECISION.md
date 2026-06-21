# SALTed — Tech Stack Decision

## Summary

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 16 (App Router) | Vercel-native, SSR/ISR for menu, strong TypeScript support |
| Styling | Tailwind CSS v4 | Stable as of Feb 2025, installed by default with Next.js 16 |
| Database client | Supabase JS (`@supabase/supabase-js`) | Native RLS, Auth, Storage — no ORM needed for 5-table schema |
| Auth | Supabase Auth | Single admin user, zero extra config, consistent with Supabase ecosystem |
| Image storage | Supabase Storage | Avoids adding Vercel Blob as a second service; 1 GB free tier sufficient |
| Cart state | localStorage + React Context | Simple, persists across navigation, no backend round-trips needed |

---

## Reasoning

### Frontend Framework — Next.js 16 (App Router)

- Menu pages benefit from ISR (revalidate every 60 s) — fast loads without stale data.
- Server Components handle Supabase reads with zero client bundle impact.
- `use client` only on interactive islands (cart, date pickers, quantity selectors).
- Vercel deploys Next.js with zero config; edge middleware can guard `/admin` routes.

### Styling — Tailwind CSS v4

- v4 reached stable in February 2025; shipped by `create-next-app` as default.
- Zero-config PostCSS integration (`@tailwindcss/postcss`).
- CSS custom properties for design tokens map cleanly to the SALTed colour palette.

### Database client — Supabase JS (no ORM)

- Schema has 5 tables with simple relationships — no ORM abstraction adds value here.
- Supabase JS gives us Row Level Security, Realtime, Storage, and Auth from one package.
- Adding Prisma or Drizzle would route around Supabase's native auth/storage advantages.
- Server client uses `@supabase/ssr` with cookie-based sessions for SSR compatibility.

### Authentication — Supabase Auth

- One admin user: create in Supabase dashboard → Authentication → Users.
- Server-side session checked via `@supabase/ssr` cookie client.
- No `NEXTAUTH_SECRET` or adapter config needed — simpler for a solo developer.
- Admin write operations use the `SUPABASE_SERVICE_ROLE_KEY` (server only, never in browser).

### Image Storage — Supabase Storage

- `menu-images` bucket (public) stores uploaded food photos.
- Returns a stable public URL saved to `menu_items.image_url`.
- Keeps everything in one Supabase project — one dashboard, one billing line.

### Cart State — localStorage + React Context

- Cart only needs to survive navigation within the same browser session.
- WhatsApp redirect is the checkout; no server-side cart needed.
- React Context provides typed access; `useEffect` hydrates from localStorage on mount.
