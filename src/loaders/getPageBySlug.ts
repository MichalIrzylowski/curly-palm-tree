import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import type { Page } from '@/payload-types'
import type { Locale } from '@/i18n/locales'

export const getPageBySlug = cache(async (slug: string, locale: Locale): Promise<Page | null> => {
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
  })
  return result.docs?.[0] ?? null
})
