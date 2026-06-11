import type { Payload, PayloadRequest } from 'payload'

interface Localized {
  pl: string
  en: string
}

interface ServiceItem {
  name: Localized
  description?: Localized
  details?: Localized[]
}

interface CategoryData {
  name: Localized
  summary: Localized
  icon: string
  order: number
  services: ServiceItem[]
}

const SERVICE_CATEGORIES: CategoryData[] = [
  {
    name: { pl: 'Profilaktyka', en: 'Preventive care' },
    summary: {
      pl: 'Badania kliniczne, szczepienia, ochrona przed pasożytami, czipowanie oraz paszporty i świadectwa zdrowia.',
      en: 'Clinical examinations, vaccinations, parasite prevention, microchipping, passports and health certificates.',
    },
    icon: 'syringe',
    order: 1,
    services: [
      { name: { pl: 'badanie kliniczne', en: 'clinical examination' } },
      { name: { pl: 'szczepienia psów i kotów', en: 'dog and cat vaccinations' } },
      {
        name: {
          pl: 'profilaktyka przeciwko pasożytom wewnętrznym i zewnętrznym',
          en: 'prevention of internal and external parasites',
        },
      },
      {
        name: {
          pl: 'wszczepienie oraz rejestracja mikroczipu',
          en: 'microchip implantation and registration',
        },
      },
      { name: { pl: 'wystawienie paszportu', en: 'pet passport issuance' } },
      { name: { pl: 'wystawienie świadectwa zdrowia', en: 'health certificate issuance' } },
    ],
  },
  {
    name: { pl: 'Diagnostyka', en: 'Diagnostics' },
    summary: {
      pl: 'Badania laboratoryjne wykonywane na miejscu, USG i RTG — szybka i dokładna diagnoza.',
      en: 'In-house laboratory tests, ultrasound and X-ray — fast and accurate diagnosis.',
    },
    icon: 'microscope',
    order: 2,
    services: [
      {
        name: {
          pl: 'badania laboratoryjne wykonywane na miejscu',
          en: 'in-house laboratory tests',
        },
        details: [
          {
            pl: 'badanie morfologiczne krwi (wynik w ciągu 3 minut)',
            en: 'complete blood count (results within 3 minutes)',
          },
          { pl: 'badanie biochemiczne krwi', en: 'blood biochemistry' },
          { pl: 'badanie moczu', en: 'urinalysis' },
          { pl: 'badanie kału', en: 'faecal examination' },
          { pl: 'badanie mikroskopowe', en: 'microscopic examination' },
        ],
      },
      { name: { pl: 'badanie USG', en: 'ultrasound examination' } },
      { name: { pl: 'badanie RTG', en: 'X-ray examination' } },
    ],
  },
  {
    name: { pl: 'Specjalistyczne', en: 'Specialist care' },
    summary: {
      pl: 'Chirurgia, kardiologia, stomatologia, dermatologia i inne specjalizacje dla psów i kotów.',
      en: 'Surgery, cardiology, dentistry, dermatology and other specialities for dogs and cats.',
    },
    icon: 'heart-pulse',
    order: 3,
    services: [
      {
        name: { pl: 'chirurgia i anestezjologia', en: 'surgery and anaesthesiology' },
        description: {
          pl: 'wykonywanie zabiegów z zakresu chirurgii tkanek miękkich, okulistycznych w znieczuleniu wziewnym',
          en: 'soft tissue and ophthalmic surgical procedures under inhalation anaesthesia',
        },
      },
      {
        name: { pl: 'kardiologia', en: 'cardiology' },
        description: {
          pl: 'diagnostyka schorzeń układu sercowo-naczyniowego',
          en: 'diagnosis of cardiovascular disorders',
        },
        details: [
          { pl: 'EKG', en: 'ECG' },
          { pl: 'echo serca', en: 'echocardiography' },
          { pl: 'pomiar ciśnienia', en: 'blood pressure measurement' },
        ],
      },
      {
        name: { pl: 'stomatologia', en: 'dentistry' },
        details: [
          { pl: 'usuwanie kamienia nazębnego', en: 'dental scaling' },
          { pl: 'ekstrakcje zębów', en: 'tooth extractions' },
        ],
      },
      {
        name: {
          pl: 'choroby wewnętrzne psów i kotów',
          en: 'internal medicine for dogs and cats',
        },
      },
      { name: { pl: 'gastroenterologia', en: 'gastroenterology' } },
      { name: { pl: 'endokrynologia', en: 'endocrinology' } },
      { name: { pl: 'dermatologia', en: 'dermatology' } },
      { name: { pl: 'nefrologia', en: 'nephrology' } },
      { name: { pl: 'urologia', en: 'urology' } },
      { name: { pl: 'okulistyka', en: 'ophthalmology' } },
    ],
  },
]

export async function seedServices({
  payload,
  req: _req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<(string | number)[]> {
  payload.logger.info('— Seeding services...')

  const categoryIds: (string | number)[] = []

  for (const category of SERVICE_CATEGORIES) {
    const doc = await payload.create({
      collection: 'services',
      locale: 'pl',
      data: {
        name: category.name.pl,
        summary: category.summary.pl,
        icon: category.icon,
        order: category.order,
        services: category.services.map((service) => ({
          name: service.name.pl,
          description: service.description?.pl,
          details: service.details?.map((detail) => ({ text: detail.pl })),
        })),
      },
    })

    // Localized sub-fields inside arrays are matched by row id, so reuse the
    // ids returned from the Polish create when writing the English texts.
    await payload.update({
      collection: 'services',
      id: doc.id,
      locale: 'en',
      data: {
        name: category.name.en,
        summary: category.summary.en,
        services: category.services.map((service, i) => ({
          id: doc.services?.[i]?.id,
          name: service.name.en,
          description: service.description?.en,
          details: service.details?.map((detail, j) => ({
            id: doc.services?.[i]?.details?.[j]?.id,
            text: detail.en,
          })),
        })),
      },
    })

    categoryIds.push(doc.id)
  }

  return categoryIds
}
