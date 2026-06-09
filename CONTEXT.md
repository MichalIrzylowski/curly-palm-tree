# Context

Glossary of the ubiquitous language for this project. Terms only — no
implementation details. See `docs/adr/` for decisions.

## Glossary

### Locale
A supported language of the site. Exactly two exist: `pl` (Polish) and `en`
(English), defined once in `src/payload.config.ts`. The same set governs both
CMS content and frontend URLs — there is no separate frontend locale list.

### Default locale
`pl`. The locale served when none is otherwise determined. A prefix-less request
resolves to the default. See [[0001-locale-prefixed-url-routing]].

### Locale segment
The first path segment of every public URL (`/{locale}/...`), e.g. the `pl` in
`/pl/uslugi`. Always present — the default locale is prefixed too.

### CMS content vs. UI copy
Two distinct kinds of translatable text, resolved by different mechanisms:
- **CMS content** — editor-authored values stored as localized Payload fields
  (page blocks, service names, bios). Translated by passing `locale` to Payload
  queries.
- **UI copy** — developer-owned interface strings not stored in the CMS (button
  text, form errors, aria-labels). Translated via next-intl message catalogs
  (`messages/{pl,en}.json`), accessed with `t('key')`. No hardcoded literals.
  See [[0002-next-intl-for-frontend-localization]].
