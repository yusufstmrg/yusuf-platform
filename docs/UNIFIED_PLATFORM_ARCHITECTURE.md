# Yusuf Platform — Unified Architecture Contract

## Purpose

Yusuf Platform is one platform with two secure experiences:

- **Public Portfolio OS** — professional identity, experience, expertise, projects, case studies, insights, ventures and opportunities.
- **Private Personal OS** — command center for life strategy, goals, execution, skills, career, proof, brand, network, business, wealth, purpose and reviews.

The experiences share one identity and one canonical data layer, while sensitive data remains private by default.

## Core principle

**Private work → selected proof → public portfolio/content → attention → leads → business → revenue → ownership → freedom → more time for purpose/service.**

## Visibility model

| State | Meaning | Public? |
|---|---|---|
| private | Internal record | No |
| draft | Work in progress | No |
| ready_to_publish | Reviewed and eligible | No |
| published | Explicitly approved public projection | Yes |
| archived | Retained privately, no longer displayed | No |

## Data boundary

Never expose private goals, tasks, net worth, liabilities, health data, private purpose notes, confidential applications, private contacts or internal notes through public routes.

Public data must be an explicit projection of a private/shared object, not a raw SELECT from sensitive tables.

## Canonical stack

- Next.js 16 + TypeScript
- Vercel
- Neon PostgreSQL 18
- Neon Auth
- Neon Data API / `@neondatabase/neon-js`
- Neon serverless driver for server-only operations
- Neon Object Storage when production evidence/media storage is required
- GitHub + GitHub Actions
- TanStack Query
- Provider-agnostic AI interface (Gemini default for free-first strategy)

## Domain groups

### Identity
`profiles`, Neon Auth `user`, roles, public profile projection

### Strategy
`life_domains`, `goals`, `okrs`, `key_results`, `masterplan_items`, `sprints`

### Execution
`tasks`, `activities`, `quick_captures`, `habits`

### Capability
`skills`, `skill_assessments`, `learning_items`

### Proof
`projects`, `portfolio_items`, `evidence`, `achievements`, `testimonials`

### Career
`career_targets`, `career_applications`, `career_opportunities`, `career_readiness_snapshots`

### Brand
`social_accounts`, `content_pillars`, `content_items`, `content_metrics`

### Network
`contacts`, `relationships`, `interactions`, `followups`

### Business
`businesses`, `business_initiatives`, `leads`, `customers`, `deals`, `revenue_transactions`

### Wealth
`income`, `expenses`, `assets`, `liabilities`, `investments`, `net_worth_snapshots`, `fi_targets`

### Reviews
`weekly_reviews`, `monthly_reviews`, `quarterly_reviews`, `decisions`, `lessons`

### Intelligence
`score_snapshots`, `ai_insights`, `ai_recommendations`, `next_best_actions`

### Publication
`publication_records`, `public_publications`, future `publication_versions`, `visibility_rules`

## AI boundary

### Private AI

The Chief of Staff, Bottleneck Engine, Opportunity Engine, Next Best Action, Learning Coach and Decision Support may use private workspace data after authorization.

### Public AI

Portfolio AI may use public data only. It must never query private workspace tables or return sensitive information.

## Publication workflow

1. Create/update private object.
2. Attach evidence.
3. Review for accuracy and confidentiality.
4. Sanitize sensitive information.
5. Create public projection/version.
6. Set `published` only after explicit approval.
7. Public routes read only published projections.

## Authentication boundary

Neon Auth is the canonical identity layer. The production Next.js app uses a fail-closed private route guard. When auth environment configuration is absent, private routes redirect to the setup/login gateway rather than rendering private content.

## Engineering rules

- Do not publish invented metrics, clients, achievements, testimonials or outcomes.
- Do not call a feature production-ready until functional, data, security, AI, UX, performance, testing, recovery, observability, documentation and packaging gates pass.
- Domain logic must remain portable and not depend unnecessarily on builder-specific UI/runtime behavior.
- Private data is private by default.
- Canonical migrations must be version-controlled; the older `supabase/migrations/` directory is historical reference only and must not be applied to the Neon project.
