import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import {
  Stethoscope,
  Scissors,
  HeartPulse,
  Syringe,
  Microscope,
  Pill,
  Bandage,
  PawPrint,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

import type {
  ServicesHighlightsBlock as ServicesHighlightsBlockProps,
  Service,
} from '@/payload-types'

import { SectionWrapper } from '@/components/SectionWrapper'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const ServicesHighlightsBlockComponent: React.FC<ServicesHighlightsBlockProps> = async ({
  heading,
  services,
}) => {
  const payload = await getPayload({ config: configPromise })

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
            Nasze usługi
          </Badge>
          {heading && (
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {heading}
            </h2>
          )}
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0 gap-1.5">
          <Link href="/services">
            Zobacz wszystkie
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                {service.description && (
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                    {extractPlainText(service.description)}
                  </CardDescription>
                )}
                <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground/50 transition-colors duration-200 group-hover:text-secondary">
                  Dowiedz się więcej
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractPlainText(doc: Service['description']): string {
  if (!doc) return ''
  try {
    return collectText(doc.root as LexicalNode).trim()
  } catch {
    return ''
  }
}

type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
}

function collectText(node: LexicalNode): string {
  if (node.text) return node.text
  if (Array.isArray(node.children)) {
    return node.children.map(collectText).join(' ')
  }
  return ''
}

const LUCIDE_ICONS: Record<string, React.ElementType> = {
  stethoscope: Stethoscope,
  scissors: Scissors,
  'heart-pulse': HeartPulse,
  syringe: Syringe,
  microscope: Microscope,
  pill: Pill,
  bandage: Bandage,
  paw: PawPrint,
}

function ServiceIcon({ name }: { name: string }) {
  const Icon = LUCIDE_ICONS[name] ?? Stethoscope
  return <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
}
