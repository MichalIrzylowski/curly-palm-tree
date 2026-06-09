# 2. next-intl for frontend localization

Date: 2026-06-08

## Status

Accepted

## Context

Per [[0001-locale-prefixed-url-routing]] the frontend needs locale-prefixed
routing and a fixed (non-negotiated) root redirect. Separately, developer-owned
UI copy (buttons, form errors, aria-labels) has no translation mechanism — the
prior `CLAUDE.md` rule allowed "Polish-default hardcoded" strings, which cannot
produce an English UI.

Options were a hand-rolled `[locale]` segment + thin middleware (routing only,
UI copy unsolved) versus adopting next-intl (routing + message catalogs in one
library). Stack: Next 15.4.11 App Router, React 19.

## Decision

Adopt **next-intl** (4.x) for both locale routing and UI-copy translation.

- Routing config: `localePrefix: 'always'`, `localeDetection: false` — this is
  the literal implementation of ADR-0001 (prefix all, never sniff
  `Accept-Language`).
- **Single source of truth for locales:** one shared module
  (`src/i18n/locales.ts`) exports the locale list + default; both
  `payload.config.ts` and next-intl's `routing.ts` import it. The two systems
  must never drift.
- **No locale mapping layer:** URL locale segments are identical to Payload
  locale codes (`pl`/`en`), so the param read from the URL is passed verbatim to
  Payload queries.
- **Two homes for text, no hardcoded literals:** editor-authored content →
  localized Payload field; developer UI copy → next-intl catalog
  (`messages/{pl,en}.json`). This supersedes the old `CLAUDE.md` UI-copy rule.

## Consequences

- One dependency owns middleware, navigation (`Link`, `redirect`, `usePathname`,
  `useRouter` via `createNavigation`), and the `t()` API.
- A one-time sweep is needed to move existing hardcoded UI strings into catalogs.
- The `[locale]` layout must call `setRequestLocale` and `generateStaticParams`
  to preserve static rendering.
- next-intl defaults to `localeDetection: true`; we must explicitly disable it,
  or we silently violate ADR-0001.
