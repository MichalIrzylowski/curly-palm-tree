import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const HeroBlockComponent: React.FC<HeroBlockProps> = async ({
  heading,
  tagline,
  primaryCtaLabel,
  media,
}) => {
  const payload = await getPayload({ config: configPromise })
  const contact = await payload.findGlobal({ slug: 'contact' })
  const primaryPhone = contact?.phones?.[0]

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center text-white">
      {/* Background image */}
      {media && typeof media === 'object' && (
        <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      {/* Content */}
      <div className="container z-10 flex flex-col items-center gap-6 text-center">
        {heading && <h1 className="text-4xl font-bold md:text-6xl">{heading}</h1>}

        {tagline && (
          <p className="max-w-xl text-lg md:text-xl text-white/90">{tagline}</p>
        )}

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Primary CTA */}
          <Link
            href="/contact"
            className="rounded bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            {primaryCtaLabel ?? 'Umów wizytę'}
          </Link>

          {/* Secondary CTA — phone */}
          {primaryPhone && (
            <a
              href={`tel:${primaryPhone.number}`}
              className="rounded border border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {primaryPhone.label ? `${primaryPhone.label}: ` : ''}
              {primaryPhone.number}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
