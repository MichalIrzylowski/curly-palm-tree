import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload, PayloadRequest } from 'payload'
import type { Media } from '@/payload-types'

import { imageHero1 } from './image-hero-1'
import { staff1 } from './staff-1'
import { staff2 } from './staff-2'
import { vetMan } from './vet-man'
import { seedTeam } from './vet-team'
import { seedServices } from './vet-services'
import { seedEquipment } from './vet-equipment'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function richText(text: string) {
  return {
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
              text,
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
  }
}

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

export async function seed({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> {
  payload.logger.info('Seeding database...')

  // 1. Delete existing data (FK-safe order)
  // Versioned collections (pages, posts) must be deleted via Local API so that
  // the _pages_v / _posts_v version tables are cleaned up correctly.
  // Non-versioned collections can use the faster deleteMany adapter call.
  payload.logger.info('— Clearing existing data...')

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

  // 2. Upload media
  payload.logger.info('— Uploading media...')
  const heroMedia = await uploadImage(
    payload,
    path.resolve(__dirname, 'image-hero1.webp'),
    imageHero1,
    'image/webp',
  )
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
  const vetManMedia = await uploadImage(
    payload,
    path.resolve(__dirname, 'vet-man.png'),
    vetMan,
    'image/png',
  )
  const staffImages: Media[] = [staff1Media, staff2Media, vetManMedia]

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
  payload.logger.info('— Seeding globals...')

  await payload.updateGlobal({
    slug: 'opening-hours',
    data: {
      hours: [
        { day: 'monday', openTime: '08:00', closeTime: '20:00', isClosed: false },
        { day: 'tuesday', openTime: '08:00', closeTime: '20:00', isClosed: false },
        { day: 'wednesday', openTime: '08:00', closeTime: '20:00', isClosed: false },
        { day: 'thursday', openTime: '08:00', closeTime: '20:00', isClosed: false },
        { day: 'friday', openTime: '08:00', closeTime: '20:00', isClosed: false },
        { day: 'saturday', openTime: '09:00', closeTime: '14:00', isClosed: false },
        { day: 'sunday', isClosed: true },
      ],
    } as any,
  })

  await payload.updateGlobal({
    slug: 'contact',
    locale: 'pl',
    data: {
      lat: 54.4472595,
      lng: 18.5504898,
      address: 'ul. 23 Marca 32E, 81-820 Sopot',
      phones: [{ label: 'Rejestracja', number: '+48 58 555 01 01' }],
      email: 'kontakt@lecznica-weterynaryjna.pl',
      directionsNotes: richText(
        'Bezpłatny parking dostępny przed kliniką oraz na ulicy 23 Marca.',
      ),
    } as any,
  })

  await payload.updateGlobal({
    slug: 'contact',
    locale: 'en',
    data: {
      lat: 54.4472595,
      lng: 18.5504898,
      address: 'ul. 23 Marca 32E, 81-820 Sopot',
      phones: [{ label: 'Reception', number: '+48 58 555 01 01' }],
      email: 'kontakt@lecznica-weterynaryjna.pl',
      directionsNotes: richText(
        'Free parking available in front of the clinic and on ul. 23 Marca.',
      ),
    } as any,
  })

  const navItems = [
    { url: '/', label: 'Strona główna' },
    { url: '/services', label: 'Usługi' },
    { url: '/team', label: 'Zespół' },
    { url: '/contact', label: 'Kontakt' },
  ].map(({ url, label }) => ({ link: { type: 'custom' as const, url, label } }))

  await payload.updateGlobal({ slug: 'header', data: { navItems } as any })
  await payload.updateGlobal({ slug: 'footer', data: { navItems } as any })

  // 5. Seed pages
  payload.logger.info('— Seeding pages...')

  const homepageLayout: any[] = [
    {
      blockType: 'heroBlock',
      heading: 'Lecznica Weterynaryjna',
      tagline: 'Dbamy o Twoje zwierzę — profesjonalnie i z troską.',
      primaryCtaLabel: 'Umów wizytę',
      media: heroMedia.id,
      trustSignals: [
        { text: 'Doświadczony zespół weterynarzy' },
        { text: 'Nowoczesny sprzęt diagnostyczny' },
        { text: 'Przyjazna atmosfera dla zwierząt' },
      ],
    },
    { blockType: 'quickInfoBlock' },
    {
      blockType: 'servicesHighlightsBlock',
      heading: 'Nasze usługi',
      services: featuredServiceIds,
    },
    {
      blockType: 'whyUsBlock',
      heading: 'Dlaczego my?',
      items: [
        {
          icon: 'microscope',
          heading: 'Nowoczesny sprzęt diagnostyczny',
          description:
            'Dysponujemy zaawansowanym sprzętem do szybkiej i dokładnej diagnozy Twojego zwierzęcia.',
        },
        {
          icon: 'users',
          heading: 'Doświadczony zespół specjalistów',
          description:
            'Nasi lekarze weterynarii mają wieloletnie doświadczenie w kompleksowej opiece nad zwierzętami.',
        },
        {
          icon: 'paw-print',
          heading: 'Psy, koty i małe zwierzęta',
          description:
            'Zapewniamy profesjonalną opiekę dla psów, kotów i wszelkich małych zwierząt domowych.',
        },
      ],
    },
    {
      blockType: 'teamTeaserBlock',
      heading: 'Poznaj nasz zespół',
      ctaLabel: 'Poznaj nasz zespół',
    },
    {
      blockType: 'equipmentHighlightBlock',
      heading: 'Nowoczesny sprzęt',
    },
    { blockType: 'mapBlock' },
    {
      blockType: 'cta',
      richText: richText('Umów wizytę już dziś — Twoje zwierzę zasługuje na najlepszą opiekę.'),
      links: [
        {
          link: {
            type: 'custom',
            url: '/contact',
            label: 'Umów wizytę',
            appearance: 'default',
          },
        },
      ],
    },
  ]

  const homepage = await payload.create({
    collection: 'pages',
    locale: 'pl',
    data: {
      title: 'Strona główna',
      slug: 'home',
      _status: 'published',
      layout: homepageLayout,
    } as any,
  })

  // Update with EN locale — include block IDs so Payload matches them correctly
  const hb = (homepage.layout as any[])[0] ?? {}
  const qib = (homepage.layout as any[])[1] ?? {}
  const shb = (homepage.layout as any[])[2] ?? {}
  const wub = (homepage.layout as any[])[3] ?? {}
  const ttb = (homepage.layout as any[])[4] ?? {}
  const ehb = (homepage.layout as any[])[5] ?? {}
  const mb = (homepage.layout as any[])[6] ?? {}
  const ctab = (homepage.layout as any[])[7] ?? {}

  await payload.update({
    collection: 'pages',
    id: homepage.id,
    locale: 'en',
    data: {
      title: 'Home',
      layout: [
        {
          id: hb.id,
          blockType: 'heroBlock',
          heading: 'Veterinary Clinic',
          tagline: 'Expert care, every visit.',
          primaryCtaLabel: 'Book an appointment',
          media: heroMedia.id,
          trustSignals: [
            { id: hb.trustSignals?.[0]?.id, text: 'Experienced team of veterinarians' },
            { id: hb.trustSignals?.[1]?.id, text: 'State-of-the-art diagnostic equipment' },
            { id: hb.trustSignals?.[2]?.id, text: 'A friendly environment for your pet' },
          ],
        },
        { id: qib.id, blockType: 'quickInfoBlock' },
        {
          id: shb.id,
          blockType: 'servicesHighlightsBlock',
          heading: 'Our services',
          services: featuredServiceIds,
        },
        {
          id: wub.id,
          blockType: 'whyUsBlock',
          heading: 'Why choose us?',
          items: [
            {
              id: wub.items?.[0]?.id,
              icon: 'microscope',
              heading: 'State-of-the-art diagnostics',
              description: 'We use advanced equipment for fast and accurate diagnosis of your pet.',
            },
            {
              id: wub.items?.[1]?.id,
              icon: 'users',
              heading: 'Experienced specialist team',
              description:
                'Our veterinarians bring years of experience in comprehensive animal care.',
            },
            {
              id: wub.items?.[2]?.id,
              icon: 'paw-print',
              heading: 'Dogs, cats and small animals',
              description:
                'We provide professional care for dogs, cats and all small domestic animals.',
            },
          ],
        },
        {
          id: ttb.id,
          blockType: 'teamTeaserBlock',
          heading: 'Meet our team',
          ctaLabel: 'Meet our team',
        },
        {
          id: ehb.id,
          blockType: 'equipmentHighlightBlock',
          heading: 'Modern equipment',
        },
        { id: mb.id, blockType: 'mapBlock' },
        {
          id: ctab.id,
          blockType: 'cta',
          richText: richText('Book an appointment today — your pet deserves the best care.'),
          links: [
            {
              link: {
                type: 'custom',
                url: '/contact',
                label: 'Book an appointment',
                appearance: 'default',
              },
            },
          ],
        },
      ],
    } as any,
  })

  // Services page
  const servicesPage = await payload.create({
    collection: 'pages',
    locale: 'pl',
    data: {
      title: 'Usługi',
      slug: 'services',
      _status: 'published',
      layout: [
        {
          blockType: 'heroBlock',
          heading: 'Nasze usługi',
          tagline: 'Kompleksowa opieka weterynaryjna dla Twojego zwierzęcia.',
        },
        {
          blockType: 'serviceGrid',
          heading: 'Wszystkie usługi',
          description: 'Oferujemy szeroki zakres usług weterynaryjnych — od profilaktyki po zaawansowaną diagnostykę i leczenie.',
        },
        {
          blockType: 'cta',
          richText: richText('Masz pytania? Skontaktuj się z nami lub umów wizytę.'),
          links: [
            {
              link: {
                type: 'custom',
                url: '/contact',
                label: 'Skontaktuj się',
                appearance: 'default',
              },
            },
          ],
        },
      ],
    } as any,
  })

  const sp0 = (servicesPage.layout as any[])[0] ?? {}
  const sp1 = (servicesPage.layout as any[])[1] ?? {}
  const sp2 = (servicesPage.layout as any[])[2] ?? {}

  await payload.update({
    collection: 'pages',
    id: servicesPage.id,
    locale: 'en',
    data: {
      title: 'Services',
      layout: [
        {
          id: sp0.id,
          blockType: 'heroBlock',
          heading: 'Our services',
          tagline: 'Comprehensive veterinary care for your pet.',
        },
        {
          id: sp1.id,
          blockType: 'serviceGrid',
          heading: 'All services',
          description: 'We offer a wide range of veterinary services — from preventive care to advanced diagnostics and treatment.',
        },
        {
          id: sp2.id,
          blockType: 'cta',
          richText: richText('Have questions? Contact us or book an appointment.'),
          links: [
            {
              link: {
                type: 'custom',
                url: '/contact',
                label: 'Contact us',
                appearance: 'default',
              },
            },
          ],
        },
      ],
    } as any,
  })

  // Team page
  const teamPage = await payload.create({
    collection: 'pages',
    locale: 'pl',
    data: {
      title: 'Zespół',
      slug: 'team',
      _status: 'published',
      layout: [
        {
          blockType: 'heroBlock',
          heading: 'Nasz zespół',
          tagline: 'Poznaj lekarzy i specjalistów, którzy dbają o Twoje zwierzę.',
        },
        {
          blockType: 'teamGrid',
          heading: 'Lekarze i specjaliści',
          description: 'Nasi weterynarze posiadają wieloletnie doświadczenie i pasję do pracy ze zwierzętami.',
        },
        {
          blockType: 'cta',
          richText: richText('Umów wizytę i powierz opiekę nad swoim zwierzęciem naszym specjalistom.'),
          links: [
            {
              link: {
                type: 'custom',
                url: '/contact',
                label: 'Umów wizytę',
                appearance: 'default',
              },
            },
          ],
        },
      ],
    } as any,
  })

  const tp0 = (teamPage.layout as any[])[0] ?? {}
  const tp1 = (teamPage.layout as any[])[1] ?? {}
  const tp2 = (teamPage.layout as any[])[2] ?? {}

  await payload.update({
    collection: 'pages',
    id: teamPage.id,
    locale: 'en',
    data: {
      title: 'Team',
      layout: [
        {
          id: tp0.id,
          blockType: 'heroBlock',
          heading: 'Our team',
          tagline: 'Meet the vets and specialists who care for your pet.',
        },
        {
          id: tp1.id,
          blockType: 'teamGrid',
          heading: 'Vets and specialists',
          description: 'Our veterinarians bring years of experience and a genuine passion for working with animals.',
        },
        {
          id: tp2.id,
          blockType: 'cta',
          richText: richText('Book an appointment and put your pet in the hands of our specialists.'),
          links: [
            {
              link: {
                type: 'custom',
                url: '/contact',
                label: 'Book an appointment',
                appearance: 'default',
              },
            },
          ],
        },
      ],
    } as any,
  })

  // Contact page
  const contactPage = await payload.create({
    collection: 'pages',
    locale: 'pl',
    data: {
      title: 'Kontakt',
      slug: 'contact',
      _status: 'published',
      layout: [
        { blockType: 'heroBlock', heading: 'Kontakt' },
        { blockType: 'mapBlock' },
      ],
    } as any,
  })

  const cb = (contactPage.layout as any[])[0] ?? {}
  const cmb = (contactPage.layout as any[])[1] ?? {}

  await payload.update({
    collection: 'pages',
    id: contactPage.id,
    locale: 'en',
    data: {
      title: 'Contact',
      layout: [
        { id: cb.id, blockType: 'heroBlock', heading: 'Contact' },
        { id: cmb.id, blockType: 'mapBlock' },
      ],
    } as any,
  })

  payload.logger.info('✓ Seeding complete.')
}
