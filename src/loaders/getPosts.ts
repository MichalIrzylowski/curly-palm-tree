import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getLocale } from 'next-intl/server'
import type { Post } from '@/payload-types'
import type { Locale } from '@/i18n/locales'

export const getPosts = cache(
  async (opts: {
    limit: number
    locale?: Locale
  }): Promise<Post[]> => {
    const { limit, locale } = opts
    const activeLocale = locale ?? ((await getLocale()) as Locale)
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      locale: activeLocale,
    })
    return docs
  },
)
