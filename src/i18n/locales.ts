/**
 * Single source of truth for the site's locales.
 *
 * Both Payload (`payload.config.ts`) and next-intl (`routing.ts`) import from
 * here so the two systems can never drift. URL locale segments are identical to
 * Payload locale codes, so values read from the URL are passed verbatim to
 * Payload queries. See docs/adr/0002-next-intl-for-frontend-localization.md.
 */

export const locales = ['pl', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'pl'

/** Human-readable labels, used to build Payload's localization config. */
export const localeLabels: Record<Locale, string> = {
  pl: 'Polish',
  en: 'English',
}

/** Narrows an arbitrary string (e.g. a URL segment) to a supported Locale. */
export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
