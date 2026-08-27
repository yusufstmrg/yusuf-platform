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

- `/login` — unified authentication gateway
- `/os` — private command-center entry (locked until Supabase Auth is configured)

The private OS will manage life strategy, goals/OKR, masterplan, 90-day sprint, quick capture, skills, career, proof/evidence, personal brand, network, business, wealth, purpose, reviews and AI Chief of Staff.

## Security principle

Private data is private by default. Public pages must consume only explicitly published projections. Never expose salaries, net worth, liabilities, health information, private goals, confidential applications, private contacts or internal notes through public routes.

Publication states:

`private -> draft -> ready_to_publish -> published -> archived`

## Target architecture

- Next.js + TypeScript
- Vercel
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage
- GitHub
- Provider-agnostic AI interface (Gemini default for the free-first strategy)

The current Floot/PostgreSQL Private OS is treated as a migration/reference source, not the final canonical runtime. Migration and reconciliation are intentionally staged under `supabase/migrations/` and `docs/`.

## Quality gates

Every milestone is expected to pass lint/build checks before release. Final production certification additionally requires functional, data, security, AI, UX, performance, testing, recovery, observability, documentation, deployment and packaging verification.

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

Optional environment variable:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## Content integrity

Do not publish invented metrics, clients, credentials, achievements, testimonials or outcomes. New proof-of-work should be published only after it exists and can be evidenced.
