import { faker } from '@faker-js/faker'
import type { Payload, PayloadRequest } from 'payload'
import type { Media } from '@/payload-types'

faker.seed(44)

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

const EQUIPMENT = [
  {
    name: { pl: 'Ultrasonograf', en: 'Ultrasound Scanner' },
    description: {
      pl: 'Nowoczesny aparat ultrasonograficzny umożliwia nieinwazyjne obrazowanie narządów wewnętrznych, serca i naczyń krwionośnych. Badanie jest bezpieczne i bezbolesne dla zwierzęcia.',
      en: 'Our state-of-the-art ultrasound scanner enables non-invasive imaging of internal organs, the heart and blood vessels. The examination is safe and painless for your pet.',
    },
    order: 1,
  },
  {
    name: { pl: 'Cyfrowy aparat RTG', en: 'Digital X-Ray Unit' },
    description: {
      pl: 'Cyfrowy rentgen zapewnia wysoką jakość obrazowania przy minimalnej dawce promieniowania. Wyniki dostępne natychmiast, co przyspiesza diagnozę i wdrożenie leczenia.',
      en: 'Digital X-ray provides high-quality imaging with minimal radiation dose. Results are available immediately, speeding up diagnosis and treatment.',
    },
    order: 2,
  },
  {
    name: { pl: 'Analizator hematologiczny', en: 'Haematology Analyser' },
    description: {
      pl: 'Automatyczny analizator krwi pozwala na wykonanie pełnej morfologii w ciągu kilku minut. Dzięki temu możliwa jest szybka ocena stanu zdrowia pacjenta.',
      en: 'Our automated blood analyser performs a full blood count within minutes, allowing rapid assessment of your pet\'s health.',
    },
    order: 3,
  },
  {
    name: { pl: 'Echokardiograf', en: 'Echocardiograph' },
    description: {
      pl: faker.lorem.sentence(18),
      en: faker.lorem.sentence(18),
    },
    order: 4,
  },
  {
    name: { pl: 'Aparat EKG', en: 'ECG Machine' },
    description: {
      pl: 'Urządzenie do elektrokardiografii umożliwia rejestrację czynności elektrycznej serca i wykrywanie arytmii oraz innych zaburzeń kardiologicznych.',
      en: 'Our ECG machine records the electrical activity of the heart and detects arrhythmias and other cardiac disorders.',
    },
    order: 5,
  },
  {
    name: { pl: 'Sterylizator parowy', en: 'Steam Steriliser' },
    description: {
      pl: 'Profesjonalny autoklaw zapewnia sterylizację narzędzi chirurgicznych zgodnie z najwyższymi standardami bezpieczeństwa, gwarantując ochronę pacjentów przed zakażeniami.',
      en: 'Our professional autoclave sterilises surgical instruments to the highest safety standards, protecting patients from infection.',
    },
    order: 6,
  },
]

export async function seedEquipment({
  payload,
  req,
  images,
}: {
  payload: Payload
  req: PayloadRequest
  images: Media[]
}): Promise<void> {
  payload.logger.info('— Seeding equipment...')

  await payload.db.deleteMany({ collection: 'equipment', req, where: {} })

  for (const [i, item] of EQUIPMENT.entries()) {
    const photo = images[i % images.length]!

    const doc = await payload.create({
      collection: 'equipment',
      locale: 'pl',
      data: {
        name: item.name.pl,
        description: richText(item.description.pl),
        photo: photo.id,
        order: item.order,
      },
    })

    await payload.update({
      collection: 'equipment',
      id: doc.id,
      locale: 'en',
      data: {
        name: item.name.en,
        description: richText(item.description.en),
      },
    })
  }
}
