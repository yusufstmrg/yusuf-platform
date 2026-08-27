-- Yusuf Platform Phase 2-4: capability, career, growth, wealth, reviews and intelligence.
-- All records are owner-scoped and private until explicitly projected to public data.

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text,
  description text,
  target_level numeric(5,2) not null default 100 check (target_level >= 0 and target_level <= 100),
  current_level numeric(5,2) not null default 0 check (current_level >= 0 and current_level <= 100),
  validated boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(owner_id, name)
);

create table if not exists public.skill_assessments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  skill_id uuid not null references public.skills(id) on delete cascade,
  score numeric(5,2) not null check (score >= 0 and score <= 100),
  source text,
  evidence_url text,
  assessed_at timestamptz not null default now()
);

create table if not exists public.learning_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  skill_id uuid references public.skills(id) on delete set null,
  title text not null,
  resource_url text,
  status text not null default 'planned' check (status in ('planned','in_progress','completed','abandoned')),
  progress numeric(5,2) not null default 0 check (progress >= 0 and progress <= 100),
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.career_targets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  role_title text not null,
  company text,
  target_date date,
  priority text not null default 'medium' check (priority in ('low','medium','high','critical')),
  readiness_score numeric(5,2) not null default 0 check (readiness_score >= 0 and readiness_score <= 100),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.career_applications (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  career_target_id uuid references public.career_targets(id) on delete set null,
  company text not null,
  role_title text not null,
  stage text not null default 'prospect' check (stage in ('prospect','applied','screening','interview','offer','rejected','withdrawn')),
  applied_at date,
  confidential boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.social_accounts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  platform text not null check (platform in ('instagram','tiktok','youtube','linkedin','github','other')),
  handle text,
  url text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(owner_id, platform)
);

create table if not exists public.content_pillars (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  target_share numeric(5,2),
  description text,
  created_at timestamptz not null default now(),
  unique(owner_id, name)
);

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  pillar_id uuid references public.content_pillars(id) on delete set null,
  title text not null,
  format text,
  platform text,
  status text not null default 'idea' check (status in ('idea','draft','scheduled','published','archived')),
  published_at timestamptz,
  public_url text,
  call_to_action text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_metrics (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  content_id uuid not null references public.content_items(id) on delete cascade,
  measured_at timestamptz not null default now(),
  reach bigint,
  views bigint,
  likes bigint,
  comments bigint,
  shares bigint,
  saves bigint,
  clicks bigint,
  leads bigint
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  organization text,
  role_title text,
  email text,
  phone text,
  linkedin_url text,
  category text,
  notes text,
  private boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.relationships (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  contact_id uuid not null references public.contacts(id) on delete cascade,
  strength numeric(5,2) not null default 0 check (strength >= 0 and strength <= 100),
  last_interaction_at timestamptz,
  next_touch_at timestamptz,
  relationship_status text not null default 'active' check (relationship_status in ('active','dormant','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(owner_id, contact_id)
);

create table if not exists public.interactions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  contact_id uuid not null references public.contacts(id) on delete cascade,
  interaction_type text not null,
  summary text,
  occurred_at timestamptz not null default now()
);

create table if not exists public.followups (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete set null,
  title text not null,
  due_at timestamptz not null,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text,
  description text,
  status text not null default 'idea' check (status in ('idea','building','active','paused','exited')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_initiatives (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  title text not null,
  stage text not null default 'discovery' check (stage in ('discovery','validation','building','launch','scale','paused','completed')),
  progress numeric(5,2) not null default 0 check (progress >= 0 and progress <= 100),
  revenue_target numeric(18,2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete set null,
  source text,
  name text,
  company text,
  need text,
  stage text not null default 'new' check (stage in ('new','qualified','proposal','negotiation','won','lost')),
  estimated_value numeric(18,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.revenue_transactions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  amount numeric(18,2) not null,
  currency text not null default 'IDR',
  transaction_date date not null,
  recurring boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.income (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  source text not null,
  amount numeric(18,2) not null,
  currency text not null default 'IDR',
  income_date date not null,
  recurring boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  amount numeric(18,2) not null,
  currency text not null default 'IDR',
  expense_date date not null,
  essential boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text,
  current_value numeric(18,2) not null default 0,
  currency text not null default 'IDR',
  valuation_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.liabilities (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text,
  balance numeric(18,2) not null default 0,
  currency text not null default 'IDR',
  valuation_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.investments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  asset_class text,
  invested_amount numeric(18,2) not null default 0,
  current_value numeric(18,2) not null default 0,
  currency text not null default 'IDR',
  as_of_date date not null default current_date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.net_worth_snapshots (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  snapshot_date date not null,
  total_assets numeric(18,2) not null default 0,
  total_liabilities numeric(18,2) not null default 0,
  net_worth numeric(18,2) not null default 0,
  currency text not null default 'IDR',
  created_at timestamptz not null default now(),
  unique(owner_id, snapshot_date)
);

create table if not exists public.fi_targets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  annual_essential_expenses numeric(18,2) not null default 0,
  withdrawal_rate numeric(6,4) not null default 0.04,
  target_capital numeric(18,2) not null default 0,
  current_capital numeric(18,2) not null default 0,
  target_date date,
  currency text not null default 'IDR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.score_snapshots (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  snapshot_date date not null,
  capability numeric(5,2) not null default 0,
  proof numeric(5,2) not null default 0,
  distribution numeric(5,2) not null default 0,
  network numeric(5,2) not null default 0,
  commercialization numeric(5,2) not null default 0,
  ownership numeric(5,2) not null default 0,
  personal_value numeric(5,2) not null default 0,
  created_at timestamptz not null default now(),
  unique(owner_id, snapshot_date)
);

create table if not exists public.ai_insights (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  insight_type text not null check (insight_type in ('weekly_review','monthly_review','quarterly_review','bottleneck','opportunity','learning','decision','general')),
  title text not null,
  summary text not null,
  supporting_data jsonb not null default '{}'::jsonb,
  confidence numeric(5,2),
  created_at timestamptz not null default now()
);

create table if not exists public.ai_recommendations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  insight_id uuid references public.ai_insights(id) on delete cascade,
  title text not null,
  rationale text,
  expected_impact numeric(5,2),
  effort_minutes integer,
  status text not null default 'proposed' check (status in ('proposed','accepted','rejected','completed','expired')),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.next_best_actions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  reason text,
  impact_score numeric(5,2),
  effort_minutes integer,
  priority_rank integer,
  status text not null default 'proposed' check (status in ('proposed','started','done','dismissed')),
  due_date date,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists idx_skills_owner on public.skills(owner_id);
create index if not exists idx_assessments_owner_skill on public.skill_assessments(owner_id, skill_id);
create index if not exists idx_learning_owner_status on public.learning_items(owner_id, status);
create index if not exists idx_career_targets_owner on public.career_targets(owner_id);
create index if not exists idx_career_apps_owner_stage on public.career_applications(owner_id, stage);
create index if not exists idx_content_items_owner_status on public.content_items(owner_id, status);
create index if not exists idx_contacts_owner on public.contacts(owner_id);
create index if not exists idx_interactions_owner_date on public.interactions(owner_id, occurred_at);
create index if not exists idx_businesses_owner on public.businesses(owner_id);
create index if not exists idx_leads_owner_stage on public.leads(owner_id, stage);
create index if not exists idx_revenue_owner_date on public.revenue_transactions(owner_id, transaction_date);
create index if not exists idx_income_owner_date on public.income(owner_id, income_date);
create index if not exists idx_expenses_owner_date on public.expenses(owner_id, expense_date);
create index if not exists idx_assets_owner on public.assets(owner_id);
create index if not exists idx_investments_owner on public.investments(owner_id);
create index if not exists idx_net_worth_owner_date on public.net_worth_snapshots(owner_id, snapshot_date);
create index if not exists idx_fi_targets_owner on public.fi_targets(owner_id);
create index if not exists idx_scores_owner_date on public.score_snapshots(owner_id, snapshot_date);
create index if not exists idx_ai_insights_owner_date on public.ai_insights(owner_id, created_at);
create index if not exists idx_ai_actions_owner_status on public.next_best_actions(owner_id, status);

-- Owner-scoped RLS across all Phase 2-4 tables.
alter table public.skills enable row level security;
alter table public.skill_assessments enable row level security;
alter table public.learning_items enable row level security;
alter table public.career_targets enable row level security;
alter table public.career_applications enable row level security;
alter table public.social_accounts enable row level security;
alter table public.content_pillars enable row level security;
alter table public.content_items enable row level security;
alter table public.content_metrics enable row level security;
alter table public.contacts enable row level security;
alter table public.relationships enable row level security;
alter table public.interactions enable row level security;
alter table public.followups enable row level security;
alter table public.businesses enable row level security;
alter table public.business_initiatives enable row level security;
alter table public.leads enable row level security;
alter table public.revenue_transactions enable row level security;
alter table public.income enable row level security;
alter table public.expenses enable row level security;
alter table public.assets enable row level security;
alter table public.liabilities enable row level security;
alter table public.investments enable row level security;
alter table public.net_worth_snapshots enable row level security;
alter table public.fi_targets enable row level security;
alter table public.score_snapshots enable row level security;
alter table public.ai_insights enable row level security;
alter table public.ai_recommendations enable row level security;
alter table public.next_best_actions enable row level security;

create policy "skills_owner_all" on public.skills for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "skill_assessments_owner_all" on public.skill_assessments for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "learning_items_owner_all" on public.learning_items for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "career_targets_owner_all" on public.career_targets for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "career_applications_owner_all" on public.career_applications for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "social_accounts_owner_all" on public.social_accounts for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "content_pillars_owner_all" on public.content_pillars for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "content_items_owner_all" on public.content_items for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "content_metrics_owner_all" on public.content_metrics for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "contacts_owner_all" on public.contacts for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "relationships_owner_all" on public.relationships for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "interactions_owner_all" on public.interactions for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "followups_owner_all" on public.followups for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "businesses_owner_all" on public.businesses for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "business_initiatives_owner_all" on public.business_initiatives for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "leads_owner_all" on public.leads for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "revenue_owner_all" on public.revenue_transactions for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "income_owner_all" on public.income for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "expenses_owner_all" on public.expenses for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "assets_owner_all" on public.assets for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "liabilities_owner_all" on public.liabilities for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "investments_owner_all" on public.investments for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "net_worth_owner_all" on public.net_worth_snapshots for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "fi_targets_owner_all" on public.fi_targets for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "scores_owner_all" on public.score_snapshots for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "ai_insights_owner_all" on public.ai_insights for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "ai_recommendations_owner_all" on public.ai_recommendations for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "next_best_actions_owner_all" on public.next_best_actions for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
