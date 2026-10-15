create extension if not exists pgcrypto;

create type public.user_role as enum ('admin', 'editor');
create type public.page_status as enum ('draft', 'published');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'editor',
  display_name text,
  created_at timestamptz not null default now()
);

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  status public.page_status not null default 'draft',
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  alt_text text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id)
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  budget text,
  service text,
  message text not null,
  source_path text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create or replace function public.is_cms_user() returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role in ('admin','editor'));
$$;

alter table public.profiles enable row level security;
alter table public.pages enable row level security;
alter table public.site_settings enable row level security;
alter table public.media enable row level security;
alter table public.leads enable row level security;

create policy "published pages are public" on public.pages for select using (status = 'published' or public.is_cms_user());
create policy "cms users manage pages" on public.pages for all using (public.is_cms_user()) with check (public.is_cms_user());
create policy "users read own profile" on public.profiles for select using (id = auth.uid());
create policy "cms users read settings" on public.site_settings for select using (public.is_cms_user());
create policy "cms users manage settings" on public.site_settings for all using (public.is_cms_user()) with check (public.is_cms_user());
create policy "cms users manage media" on public.media for all using (public.is_cms_user()) with check (public.is_cms_user());
create policy "cms users read leads" on public.leads for select using (public.is_cms_user());
create policy "cms users update leads" on public.leads for update using (public.is_cms_user()) with check (public.is_cms_user());

create index pages_status_slug_idx on public.pages(status, slug);
create index leads_created_at_idx on public.leads(created_at desc);
