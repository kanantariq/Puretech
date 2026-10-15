# PureTech CMS setup

The site now runs on Next.js and can read published landing-page content from Supabase. Until Supabase is connected, the seven bundled page records remain the automatic fallback.

## 1. Create and configure Supabase

1. Create a Supabase project.
2. Open the SQL editor and run `supabase/migrations/001_cms.sql`.
3. Copy `.env.example` to `.env.local` and add the project URL, anon key, and server-only service role key.
4. In Supabase Authentication, create the first admin user.
5. Add that user to `public.profiles` with the `admin` role:

```sql
insert into public.profiles (id, role, display_name)
select id, 'admin', 'PureTech Admin'
from auth.users
where email = 'YOUR_ADMIN_EMAIL';
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` in a `NEXT_PUBLIC_` variable.

## 2. Import the existing pages

With `.env.local` loaded in the shell, run:

```bash
pnpm seed:content
```

This upserts all seven landing pages by slug. Published database records override the bundled fallback within 60 seconds.

## 3. Use the admin

Run `pnpm dev`, then open `/admin/login`. The dashboard lists managed pages, publishing state, and captured lead totals. Each page can be saved as a draft or published. The first editor uses structured JSON so every existing field remains editable without changing the designed page components.

Lead forms post to `/api/leads`. If Supabase is not configured, the visitor receives an email-draft fallback instead of losing their inquiry.

## Content model

- `pages`: page slug, title, publishing status, and structured content
- `site_settings`: future global header, footer, contact, and brand settings
- `media`: metadata for future Supabase Storage uploads
- `leads`: landing-page inquiries
- `profiles`: authenticated CMS users and roles
