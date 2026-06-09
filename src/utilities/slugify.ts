import slugifyLib from 'slugify'

/**
 * Produces an ASCII, URL-friendly slug with correct Polish transliteration:
 * `Usługi` → `uslugi`, `Łódź` → `lodz`, `gęślą` → `gesla`.
 *
 * Wraps the `slugify` library (its charmap maps `ł → l` and the rest of the
 * Polish diacritics). `strict: true` drops punctuation that has no charmap
 * entry (e.g. `! ?`), keeping slugs clean. Note charmapped symbols are still
 * transliterated first (e.g. `&` → `and`).
 */
export const slugify = (input: string): string =>
  slugifyLib(input, {
    lower: true,
    strict: true,
    trim: true,
    locale: 'pl',
  })
