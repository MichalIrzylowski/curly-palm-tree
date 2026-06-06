# CLAUDE.md

You are an expert Payload CMS developer.

After any schema change (collection/global/field modifications), always run `pnpm generate:types`. After creating or modifying admin components, run `pnpm generate:importmap`.

## Architecture

This is a **Payload CMS 3.x + Next.js 15 (App Router)** monolith.

**Route groups:**

- `src/app/(frontend)/` — public-facing website (pages, posts, search, sitemaps)
- `src/app/(payload)/` — Payload admin panel and REST/GraphQL APIs

**Core Payload config:** `src/payload.config.ts`
**Auto-generated types (do not edit):** `src/payload-types.ts`

### Collections & Globals

**Collections:** `src/collections/`

**Globals:** `src/globals/`

See `src/payload.config.ts` to understand which collections/globals are active.

### Layout Builder (Blocks)

Pages and Posts use a block-based layout system. Each block lives in `src/blocks/<Name>/` with a `config.ts` (Payload field config) and a React component. `src/blocks/RenderBlocks.tsx` dispatches the correct component by block type.

### Access Control

Access functions are in `src/access/`.

## Deployment

- **Production URL:** https://curly-palm-tree-tawny.vercel.app/
- **Platform:** Vercel
- **Media storage:** Vercel Blob (production)
- **Database:** NeonDB (production) · local PostgreSQL for development
  - NeonDB connection string includes `?sslmode=require&uselibpqcompat=true`
  - Local dev uses `postgres://postgres@127.0.0.1:5432/vet-project`

## Environment Variables

Required (see `.env.example`):

## UI Copy

Never use task names, comments, or spec labels as user-visible string literals. All frontend copy must be either a localized CMS field or an explicit Polish-default hardcoded string.

## Testing

Integration tests (Vitest + jsdom) live in `tests/int/`.
E2E tests (Playwright, chromium) live in `tests/e2e/` with shared helpers in `tests/helpers/` (auth, user seeding/cleanup).

Demo credentials for seeded database: `demo-author@payloadcms.com` / `password`
