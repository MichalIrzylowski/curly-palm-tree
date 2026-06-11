import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getTranslations } from 'next-intl/server'
import { ArrowRight, ChevronRight } from 'lucide-react'

import type {
  ServicesHighlightsBlock as ServicesHighlightsBlockProps,
  Service,
} from '@/payload-types'

import { Link } from '@/i18n/navigation'
import { CMSLink } from '@/components/Link'
import { SectionWrapper } from '@/components/SectionWrapper'
import { ServiceIcon } from '@/components/ServiceIcon'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const ServicesHighlightsBlockComponent: React.FC<ServicesHighlightsBlockProps> = async ({
  heading,
  services,
  valLink,
}) => {
  const [payload, t] = await Promise.all([
    getPayload({ config: configPromise }),
    getTranslations('ServicesHighlights'),
  ])

  const resolvedServices: Service[] = await Promise.all(
    (services ?? []).map(async (s) => {
      if (typeof s === 'object' && s !== null) return s as Service
      const doc = await payload.findByID({ collection: 'services', id: s as number })
      return doc as Service
    }),
  )

  return (
    <SectionWrapper className="bg-muted/40">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3 text-xs font-medium uppercase tracking-wider">
            {t('badge')}
          </Badge>
          {heading && (
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {heading}
            </h2>
          )}
        </div>
        {valLink && (
          <CMSLink
            {...valLink}
            appearance="outline"
            size="sm"
            className="shrink-0 gap-1.5"
          >
            {t('viewAll')}
            <ArrowRight className="size-3.5" />
          </CMSLink>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resolvedServices.map((service) => (
          <Link key={service.id} href={`/services#service-${service.id}`} className="group">
            <Card className="h-full rounded-xl border-border/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors duration-200 group-hover:bg-secondary/15 group-hover:text-secondary">
                  <ServiceIcon name={service.icon ?? ''} />
                </div>
                <CardTitle className="text-base font-semibold leading-snug transition-colors duration-200 group-hover:text-secondary">
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {service.summary && (
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                    {service.summary}
                  </CardDescription>
                )}
                <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground/50 transition-colors duration-200 group-hover:text-secondary">
                  {t('learnMore')}
                  <ChevronRight className="size-3" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  )
}
