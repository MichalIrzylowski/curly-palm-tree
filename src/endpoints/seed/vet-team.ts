import { faker } from '@faker-js/faker'
import type { Payload, PayloadRequest } from 'payload'
import type { Media } from '@/payload-types'

faker.seed(42)

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

const MEMBERS = [
  {
    name: 'dr n. wet. Anna Kowalska',
    role: { pl: 'Lekarz Weterynarii', en: 'Veterinarian' },
    specialisations: {
      pl: ['Chirurgia', 'Ortopedia'],
      en: ['Surgery', 'Orthopedics'],
    },
    bio: {
      pl: 'Doktor Anna Kowalska specjalizuje się w chirurgii i ortopedii małych zwierząt. Po studiach na Wydziale Medycyny Weterynaryjnej w Gdańsku odbyła staż w klinice specjalistycznej w Warszawie. Pasją dr Kowalskiej są zabiegi minimalnoinwazyjne oraz rehabilitacja pooperacyjna.',
      en: 'Dr. Anna Kowalska specialises in small animal surgery and orthopaedics. After graduating from the Faculty of Veterinary Medicine in Gdańsk she completed a residency at a specialist clinic in Warsaw. Her passion lies in minimally invasive procedures and post-operative rehabilitation.',
    },
    languages: ['Polski', 'English'],
    order: 1,
  },
  {
    name: 'dr Marek Wiśniewski',
    role: { pl: 'Lekarz Weterynarii', en: 'Veterinarian' },
    specialisations: {
      pl: ['Kardiologia', 'Diagnostyka obrazowa'],
      en: ['Cardiology', 'Imaging Diagnostics'],
    },
    bio: {
      pl: 'Dr Marek Wiśniewski od ponad dziesięciu lat zajmuje się kardiologią weterynaryjną oraz diagnostyką ultrasonograficzną i echokardiograficzną. Jest absolwentem Akademii Medycyny Weterynaryjnej we Wrocławiu.',
      en: 'Dr. Marek Wiśniewski has been practicing veterinary cardiology and ultrasound diagnostics for over ten years. He graduated from the Academy of Veterinary Medicine in Wrocław.',
    },
    languages: ['Polski', 'Deutsch'],
    order: 2,
  },
  {
    name: 'dr Katarzyna Nowak',
    role: { pl: 'Lekarz Weterynarii', en: 'Veterinarian' },
    specialisations: {
      pl: ['Dermatologia', 'Onkologia'],
      en: ['Dermatology', 'Oncology'],
    },
    bio: {
      pl: 'Dr Katarzyna Nowak specjalizuje się w dermatologii i onkologii weterynaryjnej. Ukończyła studia na Wydziale Medycyny Weterynaryjnej w Warszawie, a następnie szkolenia podyplomowe w zakresie chorób skóry u zwierząt towarzyszących.',
      en: 'Dr. Katarzyna Nowak specialises in veterinary dermatology and oncology. She graduated from the Faculty of Veterinary Medicine in Warsaw and completed postgraduate training in companion animal skin diseases.',
    },
    languages: ['Polski', 'English', 'Français'],
    order: 3,
  },
  {
    name: 'Joanna Wróbel',
    role: { pl: 'Technik Weterynarii', en: 'Veterinary Technician' },
    specialisations: {
      pl: ['Opieka pooperacyjna', 'Anestezjologia'],
      en: ['Post-operative care', 'Anaesthesiology'],
    },
    bio: {
      pl: faker.lorem.paragraph(),
      en: faker.lorem.paragraph(),
    },
    languages: ['Polski'],
    order: 4,
  },
  {
    name: 'Piotr Zając',
    role: { pl: 'Technik Weterynarii', en: 'Veterinary Technician' },
    specialisations: {
      pl: ['Diagnostyka laboratoryjna', 'Radiografia'],
      en: ['Laboratory diagnostics', 'Radiography'],
    },
    bio: {
      pl: faker.lorem.paragraph(),
      en: faker.lorem.paragraph(),
    },
    languages: ['Polski', 'English'],
    order: 5,
  },
]

export async function seedTeam({
  payload,
  req,
  images,
}: {
  payload: Payload
  req: PayloadRequest
  images: Media[]
}): Promise<void> {
  payload.logger.info('— Seeding team...')

  await payload.db.deleteMany({ collection: 'team', req, where: {} })

  for (const [i, member] of MEMBERS.entries()) {
    const photo = images[i % images.length]!

    const doc = await payload.create({
      collection: 'team',
      locale: 'pl',
      data: {
        name: member.name,
        role: member.role.pl,
        bio: richText(member.bio.pl),
        specialisations: member.specialisations.pl.map((tag) => ({ tag })),
        languages: member.languages.map((language) => ({ language })),
        photo: photo.id,
        order: member.order,
      },
    })

    await payload.update({
      collection: 'team',
      id: doc.id,
      locale: 'en',
      data: {
        role: member.role.en,
        bio: richText(member.bio.en),
        specialisations: member.specialisations.en.map((tag) => ({ tag })),
      },
    })
  }
}
