# Yusuf Platform

Public-facing personal platform for **Yusuf B. Situmorang**, designed to evolve into a unified public + private operating system.

## Product vision

**One Platform. One Source of Truth. Private Intelligence + Public Proof.**

**Finance × Business × AI × Growth**

**Build. Serve. Grow. Give.**

### Public Portfolio OS

- `/` — personal public profile
- `/about` — story and positioning
- `/expertise` — expertise and capability stack
- `/experience` — career journey
- `/projects` — public proof-of-work index
- `/projects/[slug]` — case-study detail pages
- `/insights` — cross-platform insight hub
- `/resume` — public resume view
- `/contact` — opportunity/contact routes

### Private Personal OS

- `/login` — secure gateway
- `/auth/[path]` — Neon Auth views
- `/os` — private command-center entry
- `/os/quick-capture` — fast private capture workflow

The private OS is planned around life strategy, goals/OKR, masterplan, 90-day sprint, quick capture, skills, career, proof/evidence, personal brand, network, business, wealth, purpose, reviews and AI Chief of Staff.

## Security principle

Private data is private by default. Public pages must consume only explicitly published projections. Never expose salaries, net worth, liabilities, health information, private goals, confidential applications, private contacts or internal notes through public routes.

Publication states:

`private -> draft -> ready_to_publish -> published -> archived`

## Canonical architecture

- Next.js + TypeScript
- Vercel
- Neon PostgreSQL
- Neon Auth
- Neon Data API
- Neon Object Storage / object-storage abstraction
- GitHub
- TanStack Query
- Provider-agnostic AI interface (Gemini default for the free-first strategy)

The current Floot/PostgreSQL Private OS is treated as a migration/reference source, not the final canonical runtime. Its data and workflows will be reconciled into the canonical Neon model before legacy cutover.

## Authentication

Neon Auth is provisioned on the canonical Neon project. The Next.js integration uses the official `@neondatabase/auth` and `@neondatabase/auth-ui` packages. Private production access remains fail-closed until the required deployment environment variables are configured.

## Quality gates

Every milestone is expected to pass lint/build checks before release. Final production certification additionally requires functional, data, security, AI, UX, performance, testing, recovery, observability, documentation, deployment and packaging verification.

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

Required production environment variables:

```bash
NEON_AUTH_BASE_URL=https://<your-neon-auth-endpoint>/neondb/auth
NEON_AUTH_COOKIE_SECRET=<random-secret-32-chars-or-more>
NEXT_PUBLIC_NEON_AUTH_URL=https://<your-neon-auth-endpoint>/neondb/auth
NEXT_PUBLIC_NEON_DATA_API_URL=https://<your-neon-data-api-endpoint>/neondb/rest/v1
DATABASE_URL=<server-only-neon-postgres-connection-string>
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Do not commit secrets. Use local `.env.local` and Vercel Environment Variables.

## Content integrity

Do not publish invented metrics, clients, credentials, achievements, testimonials or outcomes. New proof-of-work should be published only after it exists and can be evidenced.


<!-- Recovery: return to approved public-portfolio baseline before subsequent hardening changes. -->
