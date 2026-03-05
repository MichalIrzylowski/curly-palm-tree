import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { ServicesHighlightsBlock as ServicesHighlightsBlockProps, Service } from '@/payload-types'

export const ServicesHighlightsBlockComponent: React.FC<ServicesHighlightsBlockProps> = async ({
  heading,
  services,
}) => {
  const payload = await getPayload({ config: configPromise })

  // Resolve IDs to full documents if not already populated
  const resolvedServices: Service[] = await Promise.all(
    (services ?? []).map(async (s) => {
      if (typeof s === 'object' && s !== null) return s as Service
      const doc = await payload.findByID({ collection: 'services', id: s as number })
      return doc as Service
    }),
  )

  return (
    <section className="container py-16">
      {/* S-05: Localized heading */}
      {heading && (
        <h2 className="mb-10 text-center text-3xl font-bold">{heading}</h2>
      )}

      {/* S-01: Service cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {resolvedServices.map((service) => (
          // S-02: Card links to services page
          <Link
            key={service.id}
            href={`/services#service-${service.id}`}
            className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition hover:shadow-md"
          >
            {/* Icon */}
            {service.icon && (
              <span className="text-3xl text-primary" aria-hidden="true">
                {/* Render icon name as accessible text placeholder; swap for Lucide if bundled */}
                <ServiceIcon name={service.icon} />
              </span>
            )}

            {/* Name */}
            <h3 className="text-lg font-semibold group-hover:text-primary">{service.name}</h3>

            {/* Short description — plain text only */}
            {service.description && (
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {extractPlainText(service.description)}
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* S-03: "View all services" link */}
      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="inline-block rounded border border-primary px-6 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          Zobacz wszystkie usługi
        </Link>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Extract a plain-text snippet from Payload's Lexical rich-text JSON. */
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

/** Minimal icon renderer using a Unicode emoji fallback until Lucide is wired up. */
const ICON_MAP: Record<string, string> = {
  stethoscope: '🩺',
  scissors: '✂️',
  'heart-pulse': '💓',
  syringe: '💉',
  microscope: '🔬',
  pill: '💊',
  bandage: '🩹',
  paw: '🐾',
}

function ServiceIcon({ name }: { name: string }) {
  const emoji = ICON_MAP[name]
  if (emoji) return <span role="img" aria-label={name}>{emoji}</span>
  // Fallback: first letter of icon name
  return <span className="font-mono text-sm uppercase">{name.slice(0, 2)}</span>
}
