# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev                  # Start development server
pnpm build                # Production build (also generates sitemap via postbuild)
pnpm lint                 # Run ESLint
pnpm lint:fix             # Fix lint issues automatically
pnpm test                 # Run all tests (integration + e2e)
pnpm test:int             # Integration tests only (Vitest)
pnpm test:e2e             # E2E tests only (Playwright, chromium)
pnpm generate:types       # Regenerate payload-types.ts after schema changes
pnpm generate:importmap   # Regenerate import map after creating/modifying components
pnpm payload migrate      # Run pending database migrations
```

After any schema change (collection/global/field modifications), always run `pnpm generate:types`. After creating or modifying admin components, run `pnpm generate:importmap`.

To validate TypeScript correctness: `pnpm exec tsc --noEmit`

## Architecture

This is a **Payload CMS 3.x + Next.js 15 (App Router)** monolith.

**Route groups:**
- `src/app/(frontend)/` — public-facing website (pages, posts, search, sitemaps)
- `src/app/(payload)/` — Payload admin panel and REST/GraphQL APIs

**Core Payload config:** [src/payload.config.ts](src/payload.config.ts)
**Auto-generated types (do not edit):** [src/payload-types.ts](src/payload-types.ts)

### Collections & Globals

| Path | Purpose |
|---|---|
| `src/collections/Users/` | Auth-enabled users with `admin`/`editor`/`user` roles |
| `src/collections/Pages/` | Editable pages using the layout builder |
| `src/collections/Posts/` | Blog posts with draft/publish versioning |
| `src/collections/Media.ts` | Asset uploads |
| `src/collections/Categories.ts` | Taxonomy |
| `src/globals/Header/` | Global site header nav |
| `src/globals/Footer/` | Global site footer |

### Layout Builder (Blocks)

Pages and Posts use a block-based layout system. Each block lives in `src/blocks/<Name>/` with a `config.ts` (Payload field config) and a React component. `src/blocks/RenderBlocks.tsx` dispatches the correct component by block type.

### Access Control

Access functions are in `src/access/`. Two built-ins: `anyone.ts` (public) and `authenticated.ts` (logged-in users). Custom RBAC is expressed as query constraints returned from access functions (not just booleans).

## Environment Variables

Required (see `.env.example`):
- `DATABASE_URL` — PostgreSQL connection string
- `PAYLOAD_SECRET` — JWT encryption secret
- `NEXT_PUBLIC_SERVER_URL` — public server URL
- `CRON_SECRET` — authenticates Vercel cron jobs
- `PREVIEW_SECRET` — draft preview validation

## UI Copy

Never use task names, comments, or spec labels as user-visible string literals. All frontend copy must be either a localized CMS field or an explicit Polish-default hardcoded string.

## Testing

Integration tests (Vitest + jsdom) live in `tests/int/`.
E2E tests (Playwright, chromium) live in `tests/e2e/` with shared helpers in `tests/helpers/` (auth, user seeding/cleanup).

Demo credentials for seeded database: `demo-author@payloadcms.com` / `password`
