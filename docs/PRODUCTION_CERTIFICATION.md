# Yusuf Platform — Production Certification

## Certification rule

The platform is only considered production-ready when the functional, data, security, AI, UX, performance, testing, recovery, observability, documentation and packaging gates have evidence.

## Current gates

| Gate | Status | Evidence / note |
|---|---|---|
| Canonical backend | PASS | Neon PostgreSQL 18.6 is the canonical database. |
| Database security | PASS | 52 public-domain tables; 52 RLS-enabled tables; 52 policies verified. |
| Authentication foundation | PASS | Neon Auth provisioned; private routes fail closed. |
| Public/private boundary | PASS | Public content uses explicit projection layer. |
| Quick Capture persistence | PASS | Authenticated server action persists captures. |
| Personal OS navigation | PASS | Command Center links to strategy, sprint, skills, career, business, wealth, reviews, growth, network, intelligence and publication. |
| Publication workflow | PASS | Authenticated review gate promotes eligible project records into `public_publications`. |
| AI decision layer | PARTIAL | Deterministic intelligence engine is live; external LLM provider is not yet connected. |
| Source quality | PASS when latest CI succeeds | GitHub Actions validates lint + production build. |
| Production smoke | BLOCKED | Current production smoke found the database health endpoint unavailable on the deployed environment; this requires Vercel production environment configuration. |
| Production auth usability | BLOCKED | Requires production Neon Auth environment variables/cookie secret in Vercel. |
| Full CRUD coverage | PARTIAL | Quick Capture and publication have writes; several OS modules are currently read-oriented dashboards. |
| Observability | PARTIAL | Health endpoint exists; richer runtime monitoring and alerting remain to be certified. |
| Recovery / backup drill | PARTIAL | Neon is canonical, but a documented production restore drill remains. |
| Package artifact | PASS | GitHub source package workflow produces the production source ZIP. |

## Required production environment

Configure these in Vercel Production without placing secrets in source control:

- `DATABASE_URL` — Neon production connection string.
- `NEON_AUTH_BASE_URL` — Neon Auth base URL.
- `NEON_AUTH_COOKIE_SECRET` — strong random production secret.
- `NEXT_PUBLIC_AUTH_URL` — browser-facing Neon Auth URL used by the official auth client.
- `NEXT_PUBLIC_SITE_URL` — canonical public site URL.

Optional AI provider configuration should only be enabled after the provider key is stored as a Vercel secret.

## Final certification sequence

1. Configure and verify Vercel Production environment variables.
2. Redeploy production.
3. Verify `/api/health` returns a healthy database state.
4. Verify `/auth/sign-in` can complete a real sign-in and callback.
5. Verify `/os` is inaccessible unauthenticated and accessible authenticated.
6. Create and read one private Quick Capture.
7. Verify publication workflow with a real `ready_to_publish` project.
8. Verify public project projection contains only sanitized published data.
9. Run production smoke checks.
10. Run the final accessibility, performance, security, recovery and packaging checklist.
11. Only then mark the platform fully certified.
