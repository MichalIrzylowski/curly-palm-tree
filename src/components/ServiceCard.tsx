import React from 'react'
import {
  Stethoscope,
  Scissors,
  HeartPulse,
  Syringe,
  Microscope,
  Pill,
  Bandage,
  PawPrint,
  Monitor,
  ScanLine,
  FlaskConical,
  Shield,
  Smile,
  Bed,
} from 'lucide-react'

import type { Service } from '@/payload-types'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface ServiceCardProps {
  service: Service
  locale?: 'pl' | 'en'
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, locale = 'pl' }) => {
  // Get localized name
  const name = typeof service.name === 'string'
    ? service.name
    : (locale in (service.name ?? {}) ? service.name?.[locale as keyof typeof service.name] : service.name?.['pl' as keyof typeof service.name]) ?? ''

  // Get localized description
  const description = typeof service.description === 'string'
    ? service.description
    : (service.description && typeof service.description === 'object' && 'root' in service.description)
      ? service.description
      : (locale in (service.description ?? {})
        ? service.description?.[locale as keyof typeof service.description]
        : service.description?.['pl' as keyof typeof service.description])

  // Get localized price text
  const priceText = typeof service.priceText === 'string'
    ? service.priceText
    : (locale in (service.priceText ?? {}) ? service.priceText?.[locale as keyof typeof service.priceText] : service.priceText?.['pl' as keyof typeof service.priceText])

  return (
    <Card className="h-full rounded-xl border-border/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors duration-200 hover:bg-secondary/15 hover:text-secondary">
          <ServiceIcon name={service.icon ?? ''} />
        </div>
        <CardTitle className="text-base font-semibold leading-snug transition-colors duration-200 hover:text-secondary">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {description && (
          <CardDescription className="line-clamp-3 text-sm leading-relaxed">
            {extractPlainText(description as Service['description'])}
          </CardDescription>
        )}
        {priceText && typeof priceText === 'string' && (
          <span className="inline-block text-sm italic text-muted-foreground">
            {priceText}
          </span>
        )}
      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractPlainText(doc: Service['description']): string {
  if (!doc) return ''
  if (typeof doc === 'string') return doc

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
  monitor: Monitor,
  'scan-line': ScanLine,
  'flask-conical': FlaskConical,
  shield: Shield,
  smile: Smile,
  bed: Bed,
}

function ServiceIcon({ name }: { name: string }) {
  const Icon = LUCIDE_ICONS[name] ?? Stethoscope
  return <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
}
