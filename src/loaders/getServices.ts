import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getLocale } from 'next-intl/server'
import type { Service } from '@/payload-types'
import type { Locale } from '@/i18n/locales'

export const getServices = cache(async (locale?: Locale): Promise<Service[]> => {
  const activeLocale = locale ?? ((await getLocale()) as Locale)
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'services',
    sort: 'order',
    locale: activeLocale,
    depth: 1,
    limit: 100,
    pagination: false,
  })
  return docs
})
