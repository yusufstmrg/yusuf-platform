# Yusuf Platform

Public-facing personal digital headquarters for **Yusuf B. Situmorang**.

## Positioning

**Finance × Business × AI × Growth**

**Build. Serve. Grow. Give.**

## Stack

- Next.js 16.3.3 (App Router)
- React 19.2
- TypeScript
- Lucide React
- CSS-first design system
- Vercel-ready deployment
- Future-ready for Supabase content/lead infrastructure and an AI layer

## Routes

- `/` — public personal headquarters
- `/resume` — public professional profile / resume view
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

## Content architecture

Public content is currently intentionally lightweight and source-controlled in `lib/content.ts`. As the portfolio grows, this can be migrated to a CMS/Supabase layer without changing the public information architecture.

## Important content rule

Do not publish invented metrics, clients, credentials, project results or testimonials. New proof-of-work should be added only after it exists and can be evidenced.

## Deployment

Import this repository into Vercel and use the default Next.js build settings. Set `NEXT_PUBLIC_SITE_URL` to the final production URL after the first deployment.

## Current asset placeholder

The hero currently uses a premium monogram portrait slot rather than inventing or fabricating a professional photograph. Replace the slot with Yusuf's approved professional photo when the image asset is added to the repository.
