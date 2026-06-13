# 4. WebP image derivatives (originals untouched, `og` stays JPEG)

Date: 2026-06-13

## Status

Accepted

## Context

The `media` collection generates eight resized derivatives per upload
(`Media.ts`), and sharp is already wired into Payload. To improve page-load
bandwidth (an M4 SEO/performance goal), we want resized images served as WebP.
All content is photographic JPEG/PNG; SVG/animated GIF are not in scope.

## Decision

**Convert the generated sizes to WebP at `quality: 80`; leave originals
untouched.** The browser only ever downloads the resized derivatives, so
converting those captures essentially all the bandwidth win, while keeping each
uploaded original in its source format as a pristine fallback / re-export source.

**Keep the `og` size as JPEG — do not convert it.** The `og` derivative
(1200×630) exists solely to feed `og:image` / `twitter:image` tags. It is never
part of page load; it is fetched only by social-media crawlers, many of which
(Facebook, LinkedIn, WhatsApp) still render WebP OG images unreliably. WebP's
benefit does not apply here and the downside (broken share previews) is real, so
`og` is deliberately excluded.

**Backfill existing production media via a one-off, idempotent script — not a CI
migration.** Existing derivatives are regenerated against production (NeonDB +
Vercel Blob) by re-supplying each doc's original to `payload.update`, which
re-runs the full upload pipeline. The Vercel Blob adapter's `afterChange` hook
deletes the previous (non-WebP) derivatives as part of that same update, so the
conversion is a single step with no separate cleanup — a two-phase
convert-then-delete design was considered but is not achievable, because the
framework deletes superseded files transactionally during the update rather than
leaving them orphaned. A `--dry-run` flag reports before writing; the script
skips docs already matching the policy, so it is safe to re-run.

## Consequences

- Converting derivatives renames them by extension
  (`photo-300x300.jpg` → `photo-300x300.webp`); DB records update to the new
  filenames and the old files are deleted by the adapter during the same update.
- The `og`/WebP-everywhere-else inconsistency is intentional. **Do not "fix" it
  by converting `og` to WebP** — that silently breaks social link previews.
- The backfill mutates production with no server-side backup (free tier); local
  copies of the media are the recovery path. Because the update deletes old files
  before re-uploading new ones, a crash mid-update could leave a single doc
  without files — re-running the script (or re-uploading that one image) recovers
  it.
