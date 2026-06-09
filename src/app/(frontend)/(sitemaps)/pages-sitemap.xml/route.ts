import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

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
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap: { loc: string; lastmod: string }[] = []

    for (const page of results.docs ?? []) {
      const slugByLocale = (page?.slug ?? {}) as unknown as Record<string, string | undefined>
      const lastmod = page.updatedAt || dateFallback

      for (const locale of routing.locales) {
        const slug = slugByLocale[locale]
        if (!slug) continue

        const loc = slug === 'home' ? `${SITE_URL}/${locale}` : `${SITE_URL}/${locale}/${slug}`
        sitemap.push({ loc, lastmod })
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
