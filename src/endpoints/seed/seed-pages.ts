import type { Payload } from 'payload'
import { richText } from './utils'

export async function seedPages(
  payload: Payload,
  featuredServiceIds: (string | number)[],
): Promise<void> {
  payload.logger.info('— Seeding pages...')

  // Homepage — Polish locale
  const homepageLayout: any[] = [
    {
      blockType: 'heroBlock',
      heading: 'Lecznica Weterynaryjna',
      tagline: 'Dbamy o Twoje zwierzę — profesjonalnie i z troską.',
      primaryCtaLabel: 'Umów wizytę',
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

  // Homepage — English locale (with block IDs preserved)
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
          blockType: 'serviceGrid',
          heading: 'Wszystkie usługi',
          description:
            'Oferujemy szeroki zakres usług weterynaryjnych — od profilaktyki po zaawansowaną diagnostykę i leczenie.',
        },
      ],
    } as any,
  })

  const sp1 = (servicesPage.layout as any[])[1] ?? {}

  await payload.update({
    collection: 'pages',
    id: servicesPage.id,
    locale: 'en',
    data: {
      title: 'Services',
      layout: [
        {
          id: sp1.id,
          blockType: 'serviceGrid',
          heading: 'All services',
          description:
            'We offer a wide range of veterinary services — from preventive care to advanced diagnostics and treatment.',
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
          blockType: 'teamGrid',
          heading: 'Lekarze i specjaliści',
          description:
            'Nasi weterynarze posiadają wieloletnie doświadczenie i pasję do pracy ze zwierzętami.',
        },
        {
          blockType: 'cta',
          richText: richText(
            'Umów wizytę i powierz opiekę nad swoim zwierzęciem naszym specjalistom.',
          ),
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
          id: tp1.id,
          blockType: 'teamGrid',
          heading: 'Vets and specialists',
          description:
            'Our veterinarians bring years of experience and a genuine passion for working with animals.',
        },
        {
          id: tp2.id,
          blockType: 'cta',
          richText: richText(
            'Book an appointment and put your pet in the hands of our specialists.',
          ),
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
      layout: [{ blockType: 'mapBlock' }],
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
      layout: [{ id: cmb.id, blockType: 'mapBlock' }],
    } as any,
  })
}
