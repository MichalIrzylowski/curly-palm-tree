import type { Payload, PayloadRequest } from 'payload'

import { seedTeam } from './vet-team'
import { seedCategories } from './vet-categories'
import { seedServices } from './vet-services'
import { seedEquipment } from './vet-equipment'
import { clearData } from './clear-data'
import { seedMedia } from './upload-media'
import { seedGlobals } from './seed-globals'
import { seedPages } from './seed-pages'

export async function seed({
  payload,
  req,
  onProgress,
}: {
  payload: Payload
  req: PayloadRequest
  onProgress?: (message: string) => void
}): Promise<void> {
  const log = (msg: string) => {
    payload.logger.info(msg)
    onProgress?.(msg)
  }

  log('Seeding database...')

  // 1. Clear existing data
  log('Clearing existing data...')
  await clearData(payload, req)

  // 2. Upload media
  log('Uploading media...')
  const { staffImages } = await seedMedia(payload)

  // 3. Seed collections
  log('Seeding categories...')
  const categories = await seedCategories({ payload, req })
  log('Seeding services...')
  await seedServices({ payload, req, categories })
  log('Seeding equipment...')
  await seedEquipment({ payload, req, images: staffImages })
  log('Seeding team...')
  await seedTeam({ payload, req, images: staffImages })

  const featuredResult = await payload.find({
    collection: 'services',
    where: { featured: { equals: true } },
    limit: 4,
  })
  const featuredServiceIds = featuredResult.docs.map((s) => s.id)

  // 4. Seed globals
  log('Seeding globals...')
  await seedGlobals(payload)

  // 5. Seed pages
  log('Seeding pages...')
  await seedPages(payload, featuredServiceIds)

  log('✓ Seeding complete.')
}
