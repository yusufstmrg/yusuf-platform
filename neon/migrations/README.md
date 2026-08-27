# Neon canonical database

The Yusuf Platform canonical database is the Neon project `Yusuf Platform` (`fragrant-credit-02879616`) and its default `production` branch.

The live database has been provisioned with the domain model defined by the Master Integrated Roadmap. The model is intentionally owner-scoped and private by default, with a separate public projection for explicitly published content.

## Repository policy

- Treat Neon as the canonical runtime database.
- Keep schema changes represented in versioned migration files before production rollout.
- Test risky migrations on a Neon branch first.
- Never expose private source tables directly to public routes.
- Public content must flow through the publication/projection layer.

## Existing source migrations

The earlier `supabase/migrations/` directory is retained only as historical/reference material from the first architecture draft. Do not apply those migrations to Yusuf Platform; they target Supabase-specific auth tables.

## Core security rule

Every private table is owner-scoped with Neon Auth identity (`auth.user_id()`) and is protected by row-level security. `public_publications` is the only intentionally public projection table and must contain sanitized, approved content.
