import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getLocale } from 'next-intl/server'
import type { OpeningHour } from '@/payload-types'
import type { Locale } from '@/i18n/locales'

export const getOpeningHours = cache(async (locale?: Locale): Promise<OpeningHour> => {
  const activeLocale = locale ?? ((await getLocale()) as Locale)
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({ slug: 'opening-hours', locale: activeLocale })
})
