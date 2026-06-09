import { getRequestConfig } from 'next-intl/server'

import { defaultLocale, isValidLocale } from './locales'

/**
 * Per-request next-intl config. Resolves the active locale from the URL segment
 * (validated against the supported set) and loads its UI-copy message catalog.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = requested && isValidLocale(requested) ? requested : defaultLocale

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
