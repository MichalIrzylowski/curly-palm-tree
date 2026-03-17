import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload } from 'payload'
import type { Media } from '@/payload-types'

import { staff1 } from './staff-1'
import { staff2 } from './staff-2'
import { vetMan } from './vet-man'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function uploadImage(
  payload: Payload,
  filePath: string,
  metadata: Omit<Media, 'createdAt' | 'id' | 'updatedAt'>,
  mimetype: string,
): Promise<Media> {
  const data = fs.readFileSync(filePath)
  const name = path.basename(filePath)
  return payload.create({
    collection: 'media',
    data: metadata,
    file: { data, mimetype, name, size: data.length },
  }) as unknown as Media
}

export async function seedMedia(payload: Payload): Promise<{
  staffImages: Media[]
}> {
  payload.logger.info('— Uploading media...')

  const staff1Media = await uploadImage(
    payload,
    path.resolve(__dirname, 'staff-1.png'),
    staff1,
    'image/png',
  )

  const staff2Media = await uploadImage(
    payload,
    path.resolve(__dirname, 'staff-2.png'),
    staff2,
    'image/png',
  )

  const staff3Media = await uploadImage(
    payload,
    path.resolve(__dirname, 'staff-3.png'),
    { alt: 'Zdjęcie członka zespołu' },
    'image/png',
  )
  const staff4Media = await uploadImage(
    payload,
    path.resolve(__dirname, 'staff-4.png'),
    { alt: 'Zdjęcie członka zespołu' },
    'image/png',
  )
  const staff5Media = await uploadImage(
    payload,
    path.resolve(__dirname, 'staff-5.png'),
    { alt: 'Zdjęcie członka zespołu' },
    'image/png',
  )
  const staff6Media = await uploadImage(
    payload,
    path.resolve(__dirname, 'staff-6.png'),
    { alt: 'Zdjęcie członka zespołu' },
    'image/png',
  )

  const vetManMedia = await uploadImage(
    payload,
    path.resolve(__dirname, 'vet-man.png'),
    vetMan,
    'image/png',
  )

  const staffImages: Media[] = [
    staff1Media,
    staff2Media,
    vetManMedia,
    staff3Media,
    staff4Media,
    staff5Media,
    staff6Media,
  ]

  return { staffImages }
}
