# Yusuf Platform — Private OS Migration Plan

## Objective

Move the existing Private Personal OS implementation from its current Floot/PostgreSQL runtime into the canonical Yusuf Platform architecture without losing validated data or workflows.

## Source

The existing project is the working reference implementation. The supplied database dump is treated as migration input only; it is not a production schema contract.

## Target

- Next.js + TypeScript application
- Vercel deployment
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage
- GitHub source control
- Provider-agnostic AI layer

## Migration stages

1. Inventory: tables, columns, relationships, indexes, enums, current records and existing workflows.
2. Canonical mapping: map the existing implementation to the Integrated Roadmap domain model.
3. Security redesign: owner-scoped access, RLS, private-by-default, explicit publication states.
4. Data migration: transform and import validated records.
5. Reconciliation: compare counts, keys, relationships and required fields.
6. Application integration: connect the Private OS workflows to the canonical API/database layer.
7. Public projection: expose only explicitly published objects to the Public Portfolio OS.
8. AI integration: add private Chief of Staff and public Portfolio AI with separate data access boundaries.
9. Cutover: verify production workflows before retiring the old runtime as a reference/legacy system.

## Critical rule

Do not migrate production-sensitive data until the target Supabase project, RLS policies, authentication boundary, backup/recovery approach and reconciliation checks have been reviewed.

## Public/private projection

Private source objects must not be exposed directly. Use a controlled publication record/version that contains only the approved public payload.

`private → draft → ready_to_publish → published → archived`

## Reconciliation gates

- Row counts by domain
- Primary-key uniqueness
- Foreign-key integrity
- Orphan detection
- Enum/state compatibility
- Required-field coverage
- Timestamp integrity
- Visibility correctness
- Publication correctness
- Post-migration application workflow tests

## Current status

Phase 0 foundation is staged in the public repository. Supabase infrastructure has not been connected or migrated yet; no production private data is being exposed by the public website.
