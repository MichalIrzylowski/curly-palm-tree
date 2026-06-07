import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Equipment } from '@/payload-types'

export const getEquipment = cache(async (): Promise<Equipment[]> => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'equipment',
    sort: 'order',
    depth: 1,
    limit: 0,
  })
  return docs
})
