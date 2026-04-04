import type { Payload } from 'payload'
import type { Media } from '@/payload-types'

import { staff1 } from './staff-1'
import { staff2 } from './staff-2'
import { vetMan } from './vet-man'

async function uploadImage(
  payload: Payload,
  filename: string,
  metadata: Omit<Media, 'createdAt' | 'id' | 'updatedAt'>,
  mimetype: string,
): Promise<Media> {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const res = await fetch(`${serverUrl}/seed/${filename}`)
  if (!res.ok) throw new Error(`Failed to fetch seed image: ${filename} (${res.status})`)
  const buffer = await res.arrayBuffer()
  const data = Buffer.from(buffer)
  return payload.create({
    collection: 'media',
    data: metadata,
    file: { data, mimetype, name: filename, size: data.length },
  }) as unknown as Media
}

export async function seedMedia(payload: Payload): Promise<{
  staffImages: Media[]
}> {
  payload.logger.info('— Uploading media...')

  const staff1Media = await uploadImage(payload, 'staff-1.png', staff1, 'image/png')
  const staff2Media = await uploadImage(payload, 'staff-2.png', staff2, 'image/png')
  const staff3Media = await uploadImage(
    payload,
    'staff-3.png',
    { alt: 'Zdjęcie członka zespołu' },
    'image/png',
  )
  const staff4Media = await uploadImage(
    payload,
    'staff-4.png',
    { alt: 'Zdjęcie członka zespołu' },
    'image/png',
  )
  const staff5Media = await uploadImage(
    payload,
    'staff-5.png',
    { alt: 'Zdjęcie członka zespołu' },
    'image/png',
  )
  const staff6Media = await uploadImage(
    payload,
    'staff-6.png',
    { alt: 'Zdjęcie członka zespołu' },
    'image/png',
  )
  const vetManMedia = await uploadImage(payload, 'vet-man.png', vetMan, 'image/png')

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
