-- Yusuf Platform Phase 1: Execution OS
-- Strategy -> execution -> capture -> review. All records are private/owner scoped.

create table if not exists public.life_domains (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(owner_id, name)
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  life_domain_id uuid references public.life_domains(id) on delete set null,
  title text not null,
  description text,
  status text not null default 'active' check (status in ('draft','active','paused','completed','cancelled')),
  priority text not null default 'medium' check (priority in ('low','medium','high','critical')),
  start_date date,
  target_date date,
  progress numeric(5,2) not null default 0 check (progress >= 0 and progress <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.okrs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  goal_id uuid references public.goals(id) on delete cascade,
  title text not null,
  period_start date,
  period_end date,
  status text not null default 'active' check (status in ('draft','active','completed','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.key_results (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  okr_id uuid not null references public.okrs(id) on delete cascade,
  title text not null,
  metric_type text not null default 'percent' check (metric_type in ('percent','number','currency','boolean','score')),
  start_value numeric,
  current_value numeric,
  target_value numeric,
  unit text,
  progress numeric(5,2) not null default 0 check (progress >= 0 and progress <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.masterplan_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  life_domain_id uuid references public.life_domains(id) on delete set null,
  goal_id uuid references public.goals(id) on delete set null,
  title text not null,
  description text,
  status text not null default 'not_started' check (status in ('not_started','in_progress','blocked','completed','deferred')),
  priority text not null default 'medium' check (priority in ('low','medium','high','critical')),
  due_date date,
  progress numeric(5,2) not null default 0 check (progress >= 0 and progress <= 100),
  evidence_required boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sprints (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  start_date date not null,
  end_date date not null,
  theme text,
  status text not null default 'planned' check (status in ('planned','active','completed','archived')),
  progress numeric(5,2) not null default 0 check (progress >= 0 and progress <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  life_domain_id uuid references public.life_domains(id) on delete set null,
  goal_id uuid references public.goals(id) on delete set null,
  sprint_id uuid references public.sprints(id) on delete set null,
  masterplan_item_id uuid references public.masterplan_items(id) on delete set null,
  title text not null,
  notes text,
  status text not null default 'todo' check (status in ('todo','in_progress','blocked','done','cancelled')),
  priority text not null default 'medium' check (priority in ('low','medium','high','critical')),
  due_date date,
  estimated_minutes integer,
  actual_minutes integer,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete set null,
  life_domain_id uuid references public.life_domains(id) on delete set null,
  title text not null,
  notes text,
  outcome text,
  evidence_url text,
  time_spent_minutes integer,
  impact_score numeric(5,2),
  activity_date date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.quick_captures (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  raw_input text not null,
  category text,
  outcome text,
  evidence_url text,
  time_spent_minutes integer,
  impact_score numeric(5,2),
  processed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  review_type text not null check (review_type in ('weekly','monthly','quarterly')),
  period_start date not null,
  period_end date not null,
  what_went_well text,
  what_did_not_go_well text,
  lessons text,
  bottlenecks text,
  opportunities text,
  next_actions jsonb not null default '[]'::jsonb,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (period_end >= period_start)
);

create index if not exists idx_life_domains_owner on public.life_domains(owner_id);
create index if not exists idx_goals_owner_status on public.goals(owner_id, status);
create index if not exists idx_okrs_owner on public.okrs(owner_id);
create index if not exists idx_key_results_okr on public.key_results(okr_id);
create index if not exists idx_masterplan_owner_status on public.masterplan_items(owner_id, status);
create index if not exists idx_sprints_owner_status on public.sprints(owner_id, status);
create index if not exists idx_tasks_owner_status_due on public.tasks(owner_id, status, due_date);
create index if not exists idx_activities_owner_date on public.activities(owner_id, activity_date);
create index if not exists idx_quick_captures_owner_date on public.quick_captures(owner_id, created_at);
create index if not exists idx_reviews_owner_type_period on public.reviews(owner_id, review_type, period_end);

alter table public.life_domains enable row level security;
alter table public.goals enable row level security;
alter table public.okrs enable row level security;
alter table public.key_results enable row level security;
alter table public.masterplan_items enable row level security;
alter table public.sprints enable row level security;
alter table public.tasks enable row level security;
alter table public.activities enable row level security;
alter table public.quick_captures enable row level security;
alter table public.reviews enable row level security;

create policy "life_domains_owner_all" on public.life_domains for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "goals_owner_all" on public.goals for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "okrs_owner_all" on public.okrs for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "key_results_owner_all" on public.key_results for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "masterplan_owner_all" on public.masterplan_items for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "sprints_owner_all" on public.sprints for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "tasks_owner_all" on public.tasks for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "activities_owner_all" on public.activities for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "quick_captures_owner_all" on public.quick_captures for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "reviews_owner_all" on public.reviews for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
