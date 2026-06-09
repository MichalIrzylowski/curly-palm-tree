import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getLocale } from 'next-intl/server'
import type { Equipment } from '@/payload-types'
import type { Locale } from '@/i18n/locales'

export const getEquipment = cache(async (locale?: Locale): Promise<Equipment[]> => {
  const activeLocale = locale ?? ((await getLocale()) as Locale)
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'equipment',
    sort: 'order',
    locale: activeLocale,
    depth: 1,
    limit: 0,
  })
  return docs
})
