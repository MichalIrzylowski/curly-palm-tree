import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/SectionWrapper'
import { SectionHeading } from '@/components/SectionHeading'
import { ServiceAccordion } from './ServiceAccordion.client'
import { getServices } from '@/loaders/getServices'
import { getTranslations } from 'next-intl/server'

type Props = {
  heading?: string | null
  description?: string | null
}

export async function ServiceGridBlock({ heading, description }: Props) {
  const [docs, t] = await Promise.all([getServices(), getTranslations('ServiceGrid')])

  const groupMap = new Map<string | null, { categoryName: string | null; items: any[] }>()

  for (const service of docs) {
    const cat = service.category as { id: number | string; title: string } | null | undefined
    const key = cat?.id != null ? String(cat.id) : null
    if (!groupMap.has(key)) {
      groupMap.set(key, { categoryName: cat?.title ?? null, items: [] })
    }
    groupMap.get(key)!.items.push({
      id: service.id,
      name: service.name,
      description: service.description ? (
        <RichText
          data={service.description}
          enableGutter={false}
          enableProse={false}
          className="text-sm leading-relaxed text-foreground/70 [&_p]:mb-2 [&_p:last-child]:mb-0"
        />
      ) : null,
    })
  }

  const groups = Array.from(groupMap.values())

  return (
    <SectionWrapper>
      {heading && <SectionHeading subtitle={description ?? undefined}>{heading}</SectionHeading>}
      {docs.length === 0 ? (
        <p className="text-muted-foreground">{t('empty')}</p>
      ) : (
        <ServiceAccordion groups={groups} />
      )}
    </SectionWrapper>
  )
}
