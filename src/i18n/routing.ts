import { defineRouting } from 'next-intl/routing'

import { defaultLocale, locales } from './locales'

/**
 * next-intl routing configuration.
 *
 * `localePrefix: 'always'` and `localeDetection: false` are the literal
 * implementation of docs/adr/0001-locale-prefixed-url-routing.md: every locale
 * is prefixed (including the default), and a prefix-less request resolves to a
 * fixed default — never the `Accept-Language` header.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false,
})
