import React from 'react'
import { SectionWrapper } from '@/components/SectionWrapper'
import { SectionHeading } from '@/components/SectionHeading'
import { ServiceIcon } from '@/components/ServiceIcon'
import { Separator } from '@/components/ui/separator'
import { CategoryNav } from './CategoryNav.client'
import { getServices } from '@/loaders/getServices'
import { getTranslations } from 'next-intl/server'

type Props = {
  heading?: string | null
  description?: string | null
}

export async function ServiceGridBlock({ heading, description }: Props) {
  const [docs, t] = await Promise.all([getServices(), getTranslations('ServiceGrid')])

  const categories = docs
    .filter((category) => (category.services ?? []).length > 0)
    .map((category) => ({ ...category, anchorId: `service-${category.id}` }))

  return (
    <SectionWrapper>
      {heading && <SectionHeading size="lg" subtitle={description ?? undefined}>{heading}</SectionHeading>}
      {categories.length === 0 ? (
        <p className="text-muted-foreground">{t('empty')}</p>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
          <aside>
            <div className="lg:sticky lg:top-24">
              <CategoryNav
                ariaLabel={t('navLabel')}
                items={categories.map((category) => ({
                  anchorId: category.anchorId,
                  label: category.name,
                }))}
              />
            </div>
          </aside>

          <div className="min-w-0 space-y-16">
            {categories.map((category) => (
              <section key={category.id} id={category.anchorId} className="scroll-mt-24">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <ServiceIcon name={category.icon ?? ''} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
                    {category.name}
                  </h3>
                </div>
                {category.summary && (
                  <p className="mt-3 max-w-prose text-muted-foreground">{category.summary}</p>
                )}
                <Separator className="my-6" />

                <div>
                  {(category.services ?? []).map((service, index) => {
                    const details = service.details ?? []

                    return (
                      <React.Fragment key={service.id ?? service.name}>
                        {index > 0 && <Separator className="my-5 bg-border/60" />}
                        <div>
                          <h4 className="font-medium text-foreground">{service.name}</h4>
                          {service.description && (
                            <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-foreground/70">
                              {service.description}
                            </p>
                          )}
                          {details.length > 0 && (
                            <ul className="mt-3 flex list-disc flex-col gap-2 pl-4">
                              {details.map((detail) => (
                                <li key={detail.id ?? detail.text} className="text-sm leading-relaxed text-foreground/70">{detail.text}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </React.Fragment>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}
