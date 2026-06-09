# 3. CMS content localization model (field-level + localized slugs)

Date: 2026-06-08

## Status

Accepted

## Context

"Payload localization is already added" was only partly true: locales were
configured and the M1 collections (Team, Services, Equipment, OpeningHours,
Contact) had localized fields, but `Pages`, `Posts`, `Header`, and `Footer` had
**no** localized fields. With [[0002-next-intl-for-frontend-localization]]
routing in place, `/en/...` would render Polish page bodies, nav, and SEO tags.

The layout is a Payload `blocks` field, so localization granularity is a genuine
choice, as is whether the URL `slug` (currently not localized) becomes localized.

## Decision

**Localize at the field level, keep block structure shared.** Add
`localized: true` to the text-bearing fields *inside* blocks (headings,
richText), plus page `title` and `meta` (SEO), plus Header/Footer nav labels.
The block arrangement is one shared skeleton; `/pl` and `/en` show the same
sections with different words.

**Localize the `slug` field.** English pages get real English URLs
(`/en/about`, not `/en/o-nas`). Each document carries a slug per locale.

## Consequences

- This is a database schema change → a migration is required and committed with
  the change (`pnpm payload migrate:create && pnpm payload migrate`).
- Every frontend loader must pass the active `locale` to Payload.
- `getPageBySlug` must filter by `{ slug, locale }` — a slug only resolves within
  its own locale.
- `generateStaticParams` must emit per-locale slug sets (slugs differ per
  locale), not one slug list reused across locales.
- **A language switch is not a prefix swap.** Because slugs differ per locale,
  switching `/en/about` → Polish must resolve the *sibling slug* (`o-nas`) of the
  same document. The page loader fetches the document's slugs for all locales
  (Payload `locale: 'all'`) and feeds that set to both the `hreflang` alternates
  and the language switcher's links.
- Editors maintain one page skeleton and translate field-by-field via the locale
  switcher; they also set a slug per language.
- **Missing translations fall back to Polish** (Payload `fallback: true`, the
  default). An untranslated `/en` page is never blank or 404 — it renders Polish
  field values (with English UI chrome) and lives at the fallen-back Polish slug
  until an English slug is set. Accepted trade-off: mixed-language pages during
  rollout, in exchange for never shipping broken English routes. Revisit if
  partial-English pages hurt SEO.
