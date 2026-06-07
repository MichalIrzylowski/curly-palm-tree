import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Service } from '@/payload-types'

export const getServices = cache(async (locale: 'pl' | 'en' = 'pl'): Promise<Service[]> => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'services',
    sort: 'order',
    locale,
    depth: 1,
    limit: 100,
    pagination: false,
  })
  return docs
})
