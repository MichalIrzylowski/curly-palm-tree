# 5. Campaign modal — reusable collection with explicit locale targeting

Date: 2026-06-13

## Status

Accepted

## Context

We want to show visitors a dismissible promotional modal that points them to an
external site (initially parassess.pl) — a QR code on desktop, a link on mobile,
with a short description. The first use is a single page (`/services`), but the
intent is explicitly temporary and recurring: run it for ~6 months, switch it
off, then later run a *different* campaign on a *different* page, possibly two
campaigns on two pages at once, possibly with different visual forms.

Several design choices were genuine forks:

- **Where the campaign is defined** — inline config on each Page vs. a standalone
  reusable entity.
- **How language is handled** — the project rule ([[0003-cms-content-localization-model]])
  is that all user-visible text lives in localized fields, and missing
  translations fall back to Polish. A single-language campaign would therefore
  surface Polish text on the `/en` site through fallback.
- **The outbound link** — a promotional external link has SEO implications.

## Decision

**Model a campaign as a reusable `campaigns` collection; a Page references one
via a relationship.** The collection owns all campaign data: internal name, a
single `enabled` toggle, a `variant` preset, the external URL, an optional
localized headline, a required localized description, and locale targeting. A
Page's "Campaign" tab holds only a relationship (one campaign per page; empty =
no modal).

**Targeting is configuration, not content.** A `showOnLocales` multiselect
(PL/EN) decides *whether* the modal appears on a given locale. The modal renders
only when the campaign is enabled **and** the current locale is in
`showOnLocales`. The description stays a localized field; targeting is separate.

**The outbound link carries `rel="sponsored noopener"`** and opens in a new tab.

**Variants are a fixed preset set, not free-form sizing.** One exists today:
`small-bottom-right`. Future forms (e.g. a large centered modal) extend the enum.

## Consequences

- New collection + a relationship field on Pages → a database schema change. A
  migration is required and committed with the change
  (`pnpm payload migrate:create && pnpm payload migrate`), plus
  `pnpm generate:types`.
- **Turning a campaign off is a one-place action**: toggle `enabled` on the
  campaign doc and every referencing page goes dark at once. Removing it from a
  single page = clear that page's relationship.
- **The localization rule stays intact.** Visible text remains in localized
  fields; we did not hardcode strings. The `showOnLocales` selector is treated as
  metadata, deliberately sidestepping the Polish-fallback problem from
  [[0003-cms-content-localization-model]] — a PL-only campaign simply never
  renders on `/en`, rather than showing fallback Polish text there.
- **Explicit over inferred targeting.** We rejected driving visibility from
  "is the description filled for this locale" because the empty-means-hidden rule
  is invisible to an editor returning months later. The selector is
  self-documenting at the cost of one extra field.
- **SEO:** `rel="sponsored"` discloses the promotional link and stops passing
  ranking equity to the external destination. Locale targeting keeps Polish text
  off English pages, avoiding mixed-language signals.
- Editors manage campaigns in one place and attach them to pages, rather than
  re-entering campaign content per page.
- UI chrome (close button label, "visit site" / aria-labels) stays in the
  next-intl catalog per [[0002-next-intl-for-frontend-localization]], not the CMS.
