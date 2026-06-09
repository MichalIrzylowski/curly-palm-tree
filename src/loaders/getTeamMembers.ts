import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getLocale } from 'next-intl/server'
import type { Team } from '@/payload-types'
import type { Locale } from '@/i18n/locales'

export const getTeamMembers = cache(async (locale?: Locale): Promise<Team[]> => {
  const activeLocale = locale ?? ((await getLocale()) as Locale)
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'team',
    sort: 'order',
    locale: activeLocale,
    depth: 1,
    limit: 100,
    pagination: false,
  })
  return docs
})
