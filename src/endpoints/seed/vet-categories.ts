import type { Payload, PayloadRequest } from 'payload'

export const VET_CATEGORIES = [
  { pl: 'Profilaktyka', en: 'Prevention' },
  { pl: 'Diagnostyka', en: 'Diagnostics' },
  { pl: 'Leczenie', en: 'Treatment' },
  { pl: 'Chirurgia', en: 'Surgery' },
  { pl: 'Specjalistyczne', en: 'Specialist' },
]

export async function seedCategories({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<Record<string, number>> {
  payload.logger.info('— Seeding vet categories...')

  const categoryMap: Record<string, number> = {}

  for (const cat of VET_CATEGORIES) {
    const slug = cat.pl.toLowerCase().replace(/\s+/g, '-')

    const doc = await payload.create({
      collection: 'categories',
      data: { title: cat.pl, slug } as any,
    })

    categoryMap[cat.pl] = doc.id
  }

  return categoryMap
}
