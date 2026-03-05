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

// Map of supported Lucide icon names → components
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
    <section className="container py-16">
      {heading && (
        <h2 className="mb-10 text-center text-3xl font-bold">{heading}</h2>
      )}

      <div className="grid gap-8 sm:grid-cols-3">
        {(items ?? []).map((item, index) => {
          const IconComponent = item.icon ? ICON_MAP[item.icon] : null

          return (
            <div key={index} className="flex flex-col items-center gap-4 text-center">
              {/* W-03: 24px Lucide icon in secondary colour; emoji fallback */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                {IconComponent ? (
                  <IconComponent size={24} className="text-secondary" aria-hidden="true" />
                ) : item.icon ? (
                  <span className="text-2xl" role="img" aria-label={item.icon}>
                    🐾
                  </span>
                ) : null}
              </div>

              {/* W-01: Heading */}
              {item.heading && (
                <h3 className="text-lg font-semibold">{item.heading}</h3>
              )}

              {/* W-01: Description ≤ 30 words */}
              {item.description && (
                <p className="text-sm text-muted-foreground">{item.description}</p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
