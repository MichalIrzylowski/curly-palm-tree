import configPromise from '@payload-config'
import { getPayload } from 'payload'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/SectionWrapper'
import { SectionHeading } from '@/components/SectionHeading'
import { ServiceAccordion } from './ServiceAccordion.client'

type Props = {
  locale?: string
  heading?: string | null
  description?: string | null
}

export async function ServiceGridBlock({ locale = 'pl', heading, description }: Props) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'services',
    sort: 'order',
    locale: locale as 'pl' | 'en',
    depth: 1,
    limit: 100,
    pagination: false,
  })

  const items = docs.map((service) => ({
    id: service.id,
    name: service.name,
    priceText: service.priceText,
    description: service.description ? (
      <RichText
        data={service.description}
        enableGutter={false}
        enableProse={false}
        className="text-sm leading-relaxed text-foreground/70 [&_p]:mb-2 [&_p:last-child]:mb-0"
      />
    ) : null,
  }))

  return (
    <SectionWrapper>
      {heading && <SectionHeading subtitle={description ?? undefined}>{heading}</SectionHeading>}
      {docs.length === 0 ? (
        <p className="text-muted-foreground">Brak usług.</p>
      ) : (
        <ServiceAccordion items={items} />
      )}
    </SectionWrapper>
  )
}
