import type { Payload, PayloadRequest } from 'payload'

export async function clearData(payload: Payload, req: PayloadRequest): Promise<void> {
  payload.logger.info('— Clearing existing data...')

  // Versioned collections (pages, posts) must be deleted via Local API so that
  // the _pages_v / _posts_v version tables are cleaned up correctly.
  // Non-versioned collections can use the faster deleteMany adapter call.

  const { docs: existingPages } = await payload.find({
    collection: 'pages',
    limit: 1000,
    pagination: false,
  })
  for (const page of existingPages) {
    await payload.delete({ collection: 'pages', id: page.id })
  }

  const { docs: existingPosts } = await payload.find({
    collection: 'posts',
    limit: 1000,
    pagination: false,
  })
  for (const post of existingPosts) {
    await payload.delete({ collection: 'posts', id: post.id })
  }

  await payload.db.deleteMany({ collection: 'team', req, where: {} })
  await payload.db.deleteMany({ collection: 'equipment', req, where: {} })
  await payload.db.deleteMany({ collection: 'media', req, where: {} })
  // services must be deleted before categories due to FK constraint
  await payload.db.deleteMany({ collection: 'services', req, where: {} })
  await payload.db.deleteMany({ collection: 'categories', req, where: {} })
}
