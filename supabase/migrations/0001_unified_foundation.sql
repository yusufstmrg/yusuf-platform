-- Yusuf Platform canonical foundation
-- Phase 0: identity, public profile, publication state, projects/evidence.
-- This migration is intentionally safe to stage before the full domain migration.

create extension if not exists pgcrypto;

do $$ begin
  create type public.visibility_state as enum ('private','draft','ready_to_publish','published','archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.project_kind as enum ('career','proof_of_work','business','personal_os','content','other');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  slug text not null unique,
  headline text,
  positioning text,
  bio text,
  location text,
  avatar_url text,
  linkedin_url text,
  instagram_url text,
  tiktok_url text,
  youtube_url text,
  github_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug text not null,
  title text not null,
  kind public.project_kind not null default 'proof_of_work',
  summary text,
  problem text,
  objective text,
  approach text,
  tools jsonb not null default '[]'::jsonb,
  outcome text,
  lessons text,
  visibility public.visibility_state not null default 'private',
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(owner_id, slug)
);

create table if not exists public.evidence (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  description text,
  url text,
  storage_path text,
  visibility public.visibility_state not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.publication_records (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  entity_type text not null check (entity_type in ('profile','project','evidence','achievement','skill','insight','business')),
  entity_id uuid not null,
  state public.visibility_state not null default 'draft',
  published_at timestamptz,
  published_by uuid references auth.users(id),
  public_slug text,
  public_title text,
  public_summary text,
  public_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_projects_owner_visibility on public.projects(owner_id, visibility);
create index if not exists idx_evidence_owner_visibility on public.evidence(owner_id, visibility);
create index if not exists idx_publication_state on public.publication_records(state, entity_type);

-- RLS: every private object is owner-scoped.
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.evidence enable row level security;
alter table public.publication_records enable row level security;

create policy "profiles_owner_read" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_owner_write" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "projects_owner_all" on public.projects
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "evidence_owner_all" on public.evidence
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "publication_owner_all" on public.publication_records
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

-- Public access is intentionally exposed through a future published projection/view/API,
-- not directly on the sensitive source tables. Add narrowly-scoped public policies only
-- after the projection model is implemented and tested.
