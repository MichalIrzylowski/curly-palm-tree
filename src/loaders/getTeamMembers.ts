import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Team } from '@/payload-types'

export const getTeamMembers = cache(async (locale: 'pl' | 'en' = 'pl'): Promise<Team[]> => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'team',
    sort: 'order',
    locale,
    depth: 1,
    limit: 100,
    pagination: false,
  })
  return docs
})
