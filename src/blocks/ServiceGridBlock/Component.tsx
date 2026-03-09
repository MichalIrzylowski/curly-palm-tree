import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ServiceCard } from '@/components/ServiceCard'
import { SectionWrapper } from '@/components/SectionWrapper'
import { SectionHeading } from '@/components/SectionHeading'

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

  return (
    <SectionWrapper>
      {heading && <SectionHeading subtitle={description ?? undefined}>{heading}</SectionHeading>}
      {docs.length === 0 ? (
        <p className="text-muted-foreground">Brak usług.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((service) => (
            <ServiceCard key={service.id} service={service} locale={locale as 'pl' | 'en'} />
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
