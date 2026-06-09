import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { defaultLocale, isValidLocale } from '@/i18n/locales'

// Slugs are localized and the frontend is locale-prefixed (ADR-0001), so paths
// must be built per the locale being edited: `/pl/uslugi`, `/en/services`.
const pagePath = (locale: string, slug?: string | null) =>
  slug === 'home' ? `/${locale}` : `/${locale}/${slug}`

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate) {
    const activeLocale = isValidLocale(locale ?? '') ? (locale as string) : defaultLocale

    if (doc._status === 'published') {
      const path = pagePath(activeLocale, doc.slug)

      payload.logger.info(`Revalidating page at path: ${path}`)

      revalidatePath(path)
      revalidateTag('pages-sitemap')
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = pagePath(activeLocale, previousDoc.slug)

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('pages-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({
  doc,
  req: { context, locale },
}) => {
  if (!context.disableRevalidate) {
    const activeLocale = isValidLocale(locale ?? '') ? (locale as string) : defaultLocale
    revalidatePath(pagePath(activeLocale, doc?.slug))
    revalidateTag('pages-sitemap')
  }

  return doc
}
