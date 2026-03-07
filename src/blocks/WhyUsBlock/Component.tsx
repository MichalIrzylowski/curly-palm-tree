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

import type { WhyUsBlock as WhyUsBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/SectionWrapper'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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

export const WhyUsBlockComponent: React.FC<WhyUsBlockProps> = ({ heading, items }) => {
  return (
    <SectionWrapper className="bg-muted/40">
      <div className="mb-10">
        <Badge variant="secondary" className="mb-3 text-xs font-medium uppercase tracking-wider">
          Dlaczego my
        </Badge>
        {heading && (
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{heading}</h2>
        )}
      </div>

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
