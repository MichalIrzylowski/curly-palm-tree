import React from 'react'
import {
  Microscope,
  Users,
  PawPrint,
  Stethoscope,
  Heart,
  ShieldCheck,
  Clock,
  Star,
  type LucideProps,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import type { WhyUsBlock as WhyUsBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/SectionWrapper'
import { SectionHeading } from '@/components/SectionHeading'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  microscope: Microscope,
  users: Users,
  'paw-print': PawPrint,
  stethoscope: Stethoscope,
  heart: Heart,
  'shield-check': ShieldCheck,
  clock: Clock,
  star: Star,
}

export const WhyUsBlockComponent: React.FC<WhyUsBlockProps> = async ({ heading, items }) => {
  const t = await getTranslations('WhyUs')

  return (
    <SectionWrapper className="bg-muted/40">
      <SectionHeading size="lg" badge={t('badge')}>
        {heading ?? ''}
      </SectionHeading>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(items ?? []).map((item, index) => {
          const IconComponent = item.icon ? ICON_MAP[item.icon] : null

          return (
            <Card
              key={index}
              className="rounded-xl border-border/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  {IconComponent ? (
                    <IconComponent className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  ) : (
                    <PawPrint className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  )}
                </div>
                {item.heading && (
                  <CardTitle className="text-base font-semibold leading-snug">
                    {item.heading}
                  </CardTitle>
                )}
              </CardHeader>
              {item.description && (
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
