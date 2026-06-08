import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { OpeningHour } from '@/payload-types'

export const getOpeningHours = cache(async (): Promise<OpeningHour> => {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({ slug: 'opening-hours' })
})
