-- Creator Program Index — Database Schema
-- Run this in your Supabase SQL editor to set up the tables.

-- Users table
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  first_name text not null,
  role text not null,
  company_stage text not null,
  geography text not null,
  beehiiv_subscriber_id text,
  created_at timestamptz default now(),
  last_seen_at timestamptz
);

-- Practitioner profiles (optional, post-registration)
create table if not exists public.practitioner_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  vertical text,
  program_maturity text,
  biggest_challenge text,
  completed_at timestamptz default now()
);

-- Magic links table
create table if not exists public.magic_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  token text unique not null,
  expires_at timestamptz not null,
  used boolean default false,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists magic_links_token_idx on public.magic_links(token);
create index if not exists magic_links_user_id_idx on public.magic_links(user_id);
create index if not exists practitioner_profiles_user_id_idx on public.practitioner_profiles(user_id);

-- Row Level Security
alter table public.users enable row level security;
alter table public.practitioner_profiles enable row level security;
alter table public.magic_links enable row level security;

-- Service role has full access (used by server-side API routes via supabaseAdmin)
-- Anon key has no access — all reads/writes go through server API routes
create policy "Service role full access users"
  on public.users for all
  using (true)
  with check (true);

create policy "Service role full access profiles"
  on public.practitioner_profiles for all
  using (true)
  with check (true);

create policy "Service role full access magic_links"
  on public.magic_links for all
  using (true)
  with check (true);
