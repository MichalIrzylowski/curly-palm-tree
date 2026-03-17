import type { Payload, PayloadRequest } from 'payload'

import { seedTeam } from './vet-team'
import { seedServices } from './vet-services'
import { seedEquipment } from './vet-equipment'
import { clearData } from './clear-data'
import { seedMedia } from './upload-media'
import { seedGlobals } from './seed-globals'
import { seedPages } from './seed-pages'

export async function seed({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> {
  payload.logger.info('Seeding database...')

  // 1. Clear existing data
  await clearData(payload, req)

  // 2. Upload media
  const { staffImages } = await seedMedia(payload)

  // 3. Seed collections
  await seedServices({ payload, req })
  await seedEquipment({ payload, req, images: staffImages })
  await seedTeam({ payload, req, images: staffImages })

  const featuredResult = await payload.find({
    collection: 'services',
    where: { featured: { equals: true } },
    limit: 4,
  })
  const featuredServiceIds = featuredResult.docs.map((s) => s.id)

  // 4. Seed globals
  await seedGlobals(payload)

  // 5. Seed pages
  await seedPages(payload, featuredServiceIds)

  payload.logger.info('✓ Seeding complete.')
}
