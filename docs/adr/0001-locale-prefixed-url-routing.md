# 1. Locale-prefixed URL routing for the frontend

Date: 2026-06-08

## Status

Accepted

## Context

Payload localization (`pl` default, `en`) was already configured at the data
layer, but the public frontend was locale-blind: `<html lang>` was hardcoded to
`pl` and no loader passed a `locale` to Payload, so every visitor saw Polish
content only. We need locale-aware delivery URLs.

Two cross-cutting, hard-to-reverse questions had to be settled before any
implementation, because they bake into SEO, redirects, canonical URLs, and
external/printed links:

1. Does the default locale (`pl`) also get a URL prefix?
2. How is a prefix-less request (e.g. the bare root) resolved to a locale?

## Decision

**Prefix every locale.** URLs are `domain.com/{locale}/{slug}` for all locales,
including the default: `/pl/uslugi`, `/en/services`. Frontend routes move under
`(frontend)/[locale]/...`.

**Resolve prefix-less requests with a fixed redirect, never language
negotiation.** The bare root `domain.com/` and any prefix-less path redirect
(308) to the constant default `/pl/...`. We do **not** branch on the
`Accept-Language` header.

SEO is earned separately via `hreflang` alternates (`pl`, `en`) plus an
`x-default` pointing at `/pl`, a crawlable language switcher, and localized
sitemaps — not via redirects.

## Consequences

- Symmetric, deterministic routing; a single `[locale]` segment handles all
  languages. Fully cacheable — no `Vary: Accept-Language`.
- Aligns with Google's guidance: "Avoid automatically redirecting users from one
  language version of a site to a different language version" — auto language
  redirects can hide locale variants from crawlers (Googlebot crawls mostly from
  US/`en`).
- The bare domain never serves content directly; it always 308s to `/pl`.
- Any pre-existing prefix-less Polish links must be caught and redirected to
  their `/pl/...` equivalents.
- `hreflang`/`x-default` and localized sitemaps become required follow-on work,
  not optional.
- **CMS-managed redirects (`redirectsPlugin`) are locale-agnostic.** Editors
  store plain paths (`/old-services` → `/services`, no locale prefix). The
  active locale prefix is stripped before matching and re-applied to the target,
  so a redirect resolves within whichever locale the visitor is already in.
