# Yusuf Platform

Public-facing personal digital headquarters for **Yusuf B. Situmorang**, designed to become the public experience of a unified Yusuf Platform.

## Positioning

**Finance × Business × AI × Growth**

**Build. Serve. Grow. Give.**

## End-state architecture

Yusuf Platform is designed as **one platform with two secure experiences**:

- **Public Portfolio OS** — profile, career, expertise, projects, case studies, proof, insights, ventures and opportunities.
- **Private Personal OS** — command center for life strategy, execution, skills, career, proof, brand, network, business, wealth, purpose and reviews.

The two experiences share identity and selected publishable data, while private information remains private by default.

See [`docs/UNIFIED_PLATFORM_ARCHITECTURE.md`](docs/UNIFIED_PLATFORM_ARCHITECTURE.md).

## Current public stack

- Next.js 16.3.3 (App Router)
- React 19.2
- TypeScript
- Lucide React
- CSS-first design system
- Vercel deployment
- GitHub source control
- Supabase/PostgreSQL foundation staged in `supabase/migrations/`
- Portable publication/visibility contract in `lib/platform.ts`

## Public routes

- `/` — public personal headquarters
- `/about` — professional story and positioning
- `/expertise` — expertise and skill stack
- `/experience` — career experience
- `/building` — current ventures / initiatives when surfaced by the UI
- `/projects` — proof-of-work index
- `/projects/[slug]` — project/case-study detail
- `/insights` — content hub / social distribution
- `/resume` — public professional profile / resume view
- `/contact` — opportunity/contact entry point
- `/robots.txt` — generated robots metadata
- `/sitemap.xml` — generated sitemap metadata

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production build

```bash
npm run lint
npm run build
npm start
```

## Environment

Optional:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Future canonical data layer variables will be documented in an environment template once Supabase Auth/Storage is wired into the application.

## Public content governance

Public content is currently intentionally source-controlled. Do not publish invented metrics, clients, credentials, project results or testimonials. New proof-of-work should be added only after it exists and can be evidenced.

The future publication workflow is:

`private → draft → ready_to_publish → published → archived`

Public routes should consume only explicitly published projections, never raw private records.

## Deployment

Import this repository into Vercel and use the default Next.js build settings. Set `NEXT_PUBLIC_SITE_URL` to the final production URL after deployment.

## Current asset

The hero currently uses the existing public GitHub avatar as a fallback. Replace it with Yusuf's approved professional photo when the final binary asset is added to `public/` or the future media layer.
