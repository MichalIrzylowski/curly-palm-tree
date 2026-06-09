import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import type { Locale } from '@/i18n/locales'

/**
 * Given a page's slug in a known locale, returns that same page's slug in every
 * locale (Payload `locale: 'all'`). Powers the language switcher and `hreflang`
 * alternates — switching locale is a sibling-slug lookup, not a prefix swap.
 * See docs/adr/0003-cms-content-localization-model.md.
 */
export const getPageAlternates = cache(
  async (slug: string, locale: Locale): Promise<Partial<Record<Locale, string>>> => {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      draft,
      locale,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
      select: {
        slug: true,
      },
    })

    const id = result.docs?.[0]?.id
    if (!id) return {}

    const allLocales = await payload.findByID({
      collection: 'pages',
      id,
      depth: 0,
      draft,
      overrideAccess: draft,
      locale: 'all',
      select: {
        slug: true,
      },
    })

    // With `locale: 'all'`, `slug` is an object keyed by locale at runtime.
    const slugByLocale = allLocales.slug as unknown as Partial<Record<Locale, string>>
    return slugByLocale ?? {}
  },
)
