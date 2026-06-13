import { getServerSideSitemap, type ISitemapField } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { defaultLocale } from '@/i18n/locales'
import { routing } from '@/i18n/routing'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    // `locale: 'all'` returns each localized slug keyed by locale.
    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      locale: 'all',
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
        'meta.noIndex': {
          not_equals: true,
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap: ISitemapField[] = []

    for (const page of results.docs ?? []) {
      const slugByLocale = (page?.slug ?? {}) as unknown as Record<string, string | undefined>
      const lastmod = page.updatedAt || dateFallback

      // Resolve the absolute URL for every locale this page is published in.
      const locByLocale: Partial<Record<string, string>> = {}
      for (const locale of routing.locales) {
        const slug = slugByLocale[locale]
        if (!slug) continue
        locByLocale[locale] = slug === 'home' ? `${SITE_URL}/${locale}` : `${SITE_URL}/${locale}/${slug}`
      }

      const availableLocales = routing.locales.filter((locale) => locByLocale[locale])
      if (availableLocales.length === 0) continue

      // Shared hreflang alternates so each locale entry declares its translations,
      // plus x-default pointing at the default locale (or the only one available).
      const alternateRefs: NonNullable<ISitemapField['alternateRefs']> = availableLocales.map(
        (locale) => ({
          href: locByLocale[locale]!,
          hreflang: locale,
          hrefIsAbsolute: true,
        }),
      )
      const xDefault = locByLocale[defaultLocale] ?? locByLocale[availableLocales[0]]
      if (xDefault) {
        alternateRefs.push({ href: xDefault, hreflang: 'x-default', hrefIsAbsolute: true })
      }

      for (const locale of availableLocales) {
        sitemap.push({ loc: locByLocale[locale]!, lastmod, alternateRefs })
      }
    }

    return sitemap
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
