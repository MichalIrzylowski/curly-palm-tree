import { faker } from '@faker-js/faker'
import type { Payload, PayloadRequest } from 'payload'
import type { Category } from '@/payload-types'

faker.seed(43)

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

export const VET_CATEGORIES = [
  { pl: 'Profilaktyka', en: 'Prevention' },
  { pl: 'Diagnostyka', en: 'Diagnostics' },
  { pl: 'Leczenie', en: 'Treatment' },
  { pl: 'Chirurgia', en: 'Surgery' },
  { pl: 'Specjalistyczne', en: 'Specialist' },
]

const SERVICES = [
  {
    name: { pl: 'Konsultacja weterynaryjna', en: 'Veterinary Consultation' },
    description: {
      pl: 'Kompleksowe badanie kliniczne zwierzęcia, ocena stanu zdrowia oraz omówienie zaleceń profilaktycznych i leczniczych.',
      en: 'A comprehensive clinical examination of your pet, health status assessment and discussion of preventive and therapeutic recommendations.',
    },
    icon: 'stethoscope',
    priceText: { pl: 'od 80 zł', en: 'from 80 PLN' },
    category: 'Profilaktyka',
    order: 1,
  },
  {
    name: { pl: 'Szczepienia', en: 'Vaccinations' },
    description: {
      pl: 'Szczepienia ochronne dla psów, kotów i innych zwierząt towarzyszących zgodnie z aktualnym kalendarzem szczepień.',
      en: 'Protective vaccinations for dogs, cats and other companion animals in line with the current vaccination schedule.',
    },
    icon: 'syringe',
    priceText: { pl: 'od 60 zł', en: 'from 60 PLN' },
    category: 'Profilaktyka',
    order: 2,
  },
  {
    name: { pl: 'Diagnostyka USG', en: 'Ultrasound Diagnostics' },
    description: {
      pl: 'Badanie ultrasonograficzne jamy brzusznej, serca i innych narządów przy użyciu nowoczesnego aparatu USG.',
      en: 'Ultrasound examination of the abdomen, heart and other organs using state-of-the-art equipment.',
    },
    icon: 'monitor',
    priceText: { pl: 'od 120 zł', en: 'from 120 PLN' },
    category: 'Diagnostyka',
    order: 3,
  },
  {
    name: { pl: 'Rentgenografia', en: 'X-Ray Imaging' },
    description: {
      pl: 'Cyfrowe badanie rentgenowskie kości, stawów i klatki piersiowej. Szybki wynik i możliwość konsultacji ze specjalistą.',
      en: 'Digital X-ray of bones, joints and the thoracic cavity. Fast results and specialist consultation available.',
    },
    icon: 'scan-line',
    priceText: { pl: 'od 100 zł', en: 'from 100 PLN' },
    category: 'Diagnostyka',
    order: 4,
  },
  {
    name: { pl: 'Badania laboratoryjne', en: 'Laboratory Tests' },
    description: {
      pl: 'Morfologia krwi, biochemia, badanie moczu i kału. Wyniki dostępne w ciągu kilku godzin.',
      en: 'Blood count, biochemistry, urinalysis and faecal examination. Results available within a few hours.',
    },
    icon: 'flask-conical',
    priceText: { pl: 'od 50 zł', en: 'from 50 PLN' },
    category: 'Diagnostyka',
    order: 5,
  },
  {
    name: { pl: 'Chirurgia ogólna', en: 'General Surgery' },
    description: {
      pl: faker.lorem.sentence(20),
      en: faker.lorem.sentence(20),
    },
    icon: 'scissors',
    priceText: { pl: 'wycena indywidualna', en: 'quote on request' },
    category: 'Chirurgia',
    order: 6,
  },
  {
    name: { pl: 'Kardiologia', en: 'Cardiology' },
    description: {
      pl: 'Echokardiografia, EKG oraz monitorowanie ciśnienia tętniczego. Diagnostyka i leczenie chorób serca u psów i kotów.',
      en: 'Echocardiography, ECG and blood pressure monitoring. Diagnosis and treatment of heart disease in dogs and cats.',
    },
    icon: 'heart-pulse',
    priceText: { pl: 'od 150 zł', en: 'from 150 PLN' },
    category: 'Specjalistyczne',
    order: 7,
  },
  {
    name: { pl: 'Dermatologia', en: 'Dermatology' },
    description: {
      pl: 'Diagnostyka i leczenie chorób skóry, alergii i schorzeń uszu. Pobieranie próbek do badań cytologicznych i histologicznych.',
      en: 'Diagnosis and treatment of skin diseases, allergies and ear disorders. Sample collection for cytological and histological examination.',
    },
    icon: 'shield',
    priceText: { pl: 'od 100 zł', en: 'from 100 PLN' },
    category: 'Specjalistyczne',
    order: 8,
  },
  {
    name: { pl: 'Dentystyka weterynaryjna', en: 'Veterinary Dentistry' },
    description: {
      pl: 'Przegląd i czyszczenie zębów, ekstrakcje oraz leczenie chorób przyzębia w pełnym znieczuleniu ogólnym.',
      en: 'Dental check-up and cleaning, extractions and periodontal treatment under full general anaesthesia.',
    },
    icon: 'smile',
    priceText: { pl: 'od 200 zł', en: 'from 200 PLN' },
    category: 'Leczenie',
    order: 9,
  },
  {
    name: { pl: 'Hospitalizacja', en: 'Hospitalisation' },
    description: {
      pl: 'Całodobowa opieka nad pacjentem w przypadkach wymagających intensywnego nadzoru medycznego.',
      en: 'Round-the-clock patient care for cases requiring intensive medical supervision.',
    },
    icon: 'bed',
    priceText: { pl: 'wycena indywidualna', en: 'quote on request' },
    category: 'Leczenie',
    order: 10,
  },
]

export async function seedServices({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<{ categories: Record<string, Category> }> {
  payload.logger.info('— Seeding vet categories...')

  // Delete services before categories — services.category is a FK to categories
  await payload.db.deleteMany({ collection: 'services', req, where: {} })
  await payload.db.deleteMany({ collection: 'categories', req, where: {} })

  const categoryMap: Record<string, Category> = {}
  for (const cat of VET_CATEGORIES) {
    const slug = cat.pl.toLowerCase().replace(/\s+/g, '-')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = await payload.create({
      collection: 'categories',
      data: { title: cat.pl, slug } as any,
    })
    categoryMap[cat.pl] = doc as unknown as Category
  }

  payload.logger.info('— Seeding services...')

  for (const service of SERVICES) {
    const category = categoryMap[service.category]

    const doc = await payload.create({
      collection: 'services',
      locale: 'pl',
      data: {
        name: service.name.pl,
        description: richText(service.description.pl),
        icon: service.icon,
        priceText: service.priceText.pl,
        category: category?.id ?? null,
        order: service.order,
      },
    })

    await payload.update({
      collection: 'services',
      id: doc.id,
      locale: 'en',
      data: {
        name: service.name.en,
        description: richText(service.description.en),
        priceText: service.priceText.en,
      },
    })
  }

  return { categories: categoryMap }
}
