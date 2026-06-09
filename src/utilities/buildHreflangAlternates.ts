import type { Metadata } from 'next'

import { getPageAlternates } from '@/loaders/getPageAlternates'
import { defaultLocale, type Locale } from '@/i18n/locales'

const pathFor = (locale: string, slug?: string) =>
  !slug || slug === 'home' ? `/${locale}` : `/${locale}/${slug}`

/**
 * Builds the `canonical` + `hreflang` alternates for a page, resolving each
 * locale's sibling slug. `x-default` points at the default locale (`pl`).
 * See docs/adr/0001-locale-prefixed-url-routing.md.
 */
export async function buildHreflangAlternates(
  slug: string,
  locale: Locale,
): Promise<Metadata['alternates']> {
  const alternates = await getPageAlternates(slug, locale)

  const languages: Record<string, string> = {}
  for (const [loc, siblingSlug] of Object.entries(alternates)) {
    if (siblingSlug) languages[loc] = pathFor(loc, siblingSlug)
  }

  const defaultSlug = alternates[defaultLocale]
  if (defaultSlug) languages['x-default'] = pathFor(defaultLocale, defaultSlug)

  return {
    canonical: pathFor(locale, slug),
    languages,
  }
}
