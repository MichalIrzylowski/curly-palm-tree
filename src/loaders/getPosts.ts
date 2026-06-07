import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Post } from '@/payload-types'

export const getPosts = cache(
  async (opts: {
    limit: number
    categoryIds?: (string | number)[]
  }): Promise<Post[]> => {
    const { limit, categoryIds } = opts
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(categoryIds && categoryIds.length > 0
        ? { where: { categories: { in: categoryIds } } }
        : {}),
    })
    return docs
  },
)
