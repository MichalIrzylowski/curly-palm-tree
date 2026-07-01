import type { Metadata } from 'next'

import type { Media, Page, Post, Config, SiteSetting } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getCachedGlobal } from './getGlobals'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null): string | undefined => {
  if (image && typeof image === 'object' && 'url' in image) {
    const serverUrl = getServerSideURL()
    const ogUrl = image.sizes?.og?.url

    return ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return undefined
}

const getCanonicalPageURL = (slug: Page['slug'] | Post['slug'] | undefined, locale: string): string => {
  const path = slug && slug !== 'home' ? `/${slug}` : ''

  return `${getServerSideURL()}/${locale}${path}`
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  locale: string
}): Promise<Metadata> => {
  const { doc, locale } = args

  const siteSettings = (await getCachedGlobal('site-settings', 0)()) as SiteSetting
  const clinicName = siteSettings?.clinicName ?? 'Lecznica Weterynaryjna'

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? doc?.meta?.title + ' | ' + clinicName : clinicName

  return {
    description: doc?.meta?.description,
    robots: doc?.meta?.noIndex ? { index: false } : undefined,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      siteName: clinicName,
      title,
      url: getCanonicalPageURL(doc?.slug, locale),
    }),
    title,
  }
}
