import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { vetMan } from './vet-man'
import { staff1 } from './staff-1'
import { staff2 } from './staff-2'
import { seedEquipment } from './vet-equipment'
import { seedServices } from './vet-services'
import { seedTeam } from './vet-team'

// To add more team photos: drop the file in src/endpoints/seed/ and add an entry here.
// Members are assigned photos by index (cycling if there are fewer photos than members).
const TEAM_PHOTOS = [
  { filename: 'vet-man.png', data: vetMan },
  { filename: 'staff-1.png', data: staff1 },
  { filename: 'staff-2.png', data: staff2 },
]

// Collections with FK refs to other cleared collections — must be deleted before media/categories
// team, equipment → media (required/NOT NULL); services → categories (nullable FK)
const dependentCollections: CollectionSlug[] = ['team', 'services', 'equipment']

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  payload.logger.info('— Clearing collections and globals...')

  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: { navItems: [] } as any,
        depth: 0,
        context: { disableRevalidate: true },
      }),
    ),
  )

  // Delete collections with FK references to media first, then the rest
  await Promise.all(
    dependentCollections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    [...dependentCollections, ...collections]
      .filter((collection) => Boolean(payload.collections[collection]?.config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info('— Seeding media...')

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({ collection: 'media', data: image1, file: image1Buffer }),
    payload.create({ collection: 'media', data: image2, file: image2Buffer }),
    payload.create({ collection: 'media', data: image2, file: image3Buffer }),
    payload.create({ collection: 'media', data: imageHero1, file: hero1Buffer }),
  ])

  payload.logger.info('— Seeding team photos...')

  const teamPhotoDocs = await Promise.all(
    TEAM_PHOTOS.map(({ filename, data }) =>
      payload.create({
        collection: 'media',
        data,
        file: readLocalFile(filename),
      }),
    ),
  )

  // Seed vet collections
  const allImages = [image1Doc, image2Doc, image3Doc, imageHomeDoc]
  await seedServices({ payload, req })
  await seedTeam({ payload, req, images: teamPhotoDocs })
  await seedEquipment({ payload, req, images: allImages })

  payload.logger.info('— Seeding opening hours...')

  await payload.updateGlobal({
    slug: 'opening-hours',
    data: {
      hours: [
        { day: 'monday', openTime: '08:00', closeTime: '19:00', isClosed: false },
        { day: 'tuesday', openTime: '08:00', closeTime: '19:00', isClosed: false },
        { day: 'wednesday', openTime: '08:00', closeTime: '19:00', isClosed: false },
        { day: 'thursday', openTime: '08:00', closeTime: '19:00', isClosed: false },
        { day: 'friday', openTime: '08:00', closeTime: '19:00', isClosed: false },
        { day: 'saturday', openTime: '09:00', closeTime: '14:00', isClosed: false },
        { day: 'sunday', isClosed: true },
      ],
    },
  })

  payload.logger.info('— Seeding contact...')

  await payload.updateGlobal({
    slug: 'contact',
    locale: 'pl',
    data: {
      lat: 54.4472595,
      lng: 18.5504898,
      address: 'ul. 23 Marca 32E, 81-820 Sopot',
      phones: [
        { label: 'Rejestracja', number: '+48 58 555 12 34' },
        { label: 'Nagłe przypadki', number: '+48 58 555 56 78' },
      ],
      email: 'gabinet@lecznicawet.pl',
      directionsNotes: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Bezpłatny parking dostępny przy ulicy. Przystanek SKM Sopot Wyścigi w odległości 5 minut pieszo.',
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
              format: '' as const,
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
        },
      },
    },
  })

  await payload.updateGlobal({
    slug: 'contact',
    locale: 'en',
    data: {
      address: '23 Marca 32E St., 81-820 Sopot',
      phones: [
        { label: 'Reception', number: '+48 58 555 12 34' },
        { label: 'Emergencies', number: '+48 58 555 56 78' },
      ],
      directionsNotes: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Free street parking available nearby. Sopot Wyścigi SKM train stop is a 5-minute walk away.',
                  version: 1,
                },
              ],
              direction: 'ltr' as const,
              format: '' as const,
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
        },
      },
    },
  })

  payload.logger.info('— Seeding header & footer nav...')

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          { link: { type: 'custom', label: 'Usługi', url: '/uslugi' } },
          { link: { type: 'custom', label: 'Zespół', url: '/zespol' } },
          { link: { type: 'custom', label: 'Kontakt', url: '/kontakt' } },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          { link: { type: 'custom', label: 'Usługi', url: '/uslugi' } },
          { link: { type: 'custom', label: 'Kontakt', url: '/kontakt' } },
          { link: { type: 'custom', label: 'Admin', url: '/admin' } },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

function readLocalFile(filename: string): File {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const filePath = join(__dirname, filename)
  const data = readFileSync(filePath)
  const ext = filename.split('.').pop() ?? 'png'
  return {
    name: filename,
    data,
    mimetype: `image/${ext}`,
    size: data.byteLength,
  }
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, { credentials: 'include', method: 'GET' })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
