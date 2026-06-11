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
  log('Seeding services...')
  const serviceCategoryIds = await seedServices({ payload, req })
  log('Seeding equipment...')
  await seedEquipment({ payload, req, images: staffImages })
  log('Seeding team...')
  await seedTeam({ payload, req, images: staffImages })

  // 4. Seed globals
  log('Seeding globals...')
  await seedGlobals(payload)

  // 5. Seed pages
  log('Seeding pages...')
  await seedPages(payload, serviceCategoryIds)

  log('✓ Seeding complete.')
}
