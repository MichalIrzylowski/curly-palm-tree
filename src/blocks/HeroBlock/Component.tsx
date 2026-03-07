import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Phone } from 'lucide-react'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrustSignals } from '@/components/TrustSignals'

export const HeroBlockComponent: React.FC<HeroBlockProps> = async ({
  heading,
  tagline,
  primaryCtaLabel,
  media,
  trustSignals,
}) => {
  const payload = await getPayload({ config: configPromise })
  const contact = await payload.findGlobal({ slug: 'contact' })
  const primaryPhone = contact?.phones?.[0]
  const city = contact?.address?.split(',').at(-1)?.trim().split(' ').at(-1)

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Decorative ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-160 w-160 rounded-full bg-secondary/10 blur-[80px]" />
        <div className="absolute bottom-0 left-1/4 h-100 w-100 rounded-full bg-accent/8 blur-[60px]" />
      </div>

      <div className="container relative z-10 flex min-h-[88vh] flex-col items-center gap-10 py-20 lg:flex-row lg:gap-16 lg:py-24">
        {/* ── Left: text content ── */}
        <div className="flex flex-1 flex-col items-start gap-7">
          <Badge variant="secondary" className="gap-2 rounded-full px-4 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-secondary-foreground/60" aria-hidden />
            {city ?? 'Sopot'}
          </Badge>

          {heading && (
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-primary md:text-6xl lg:text-[4.25rem]">
              {heading}
            </h1>
          )}

          {tagline && (
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
              {tagline}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Link href="/contact">{primaryCtaLabel ?? 'Umów wizytę'}</Link>
            </Button>

            {primaryPhone && (
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <a href={`tel:${primaryPhone.number}`}>
                  <Phone className="h-4 w-4" aria-hidden />
                  {primaryPhone.label ? `${primaryPhone.label}: ` : 'Zadzwoń: '}
                  {primaryPhone.number}
                </a>
              </Button>
            )}
          </div>

          <TrustSignals items={(trustSignals ?? []).map(({ text }) => text)} />
        </div>

        {/* ── Right: media ── */}
        {media && typeof media === 'object' && (
          <div className="relative w-full lg:w-135 lg:shrink-0">
            {/* Soft gradient shape behind the image */}
            <div
              aria-hidden
              className="absolute -inset-3 rounded-4xl bg-linear-to-br from-secondary/15 via-accent/8 to-transparent"
            />
            <div className="relative overflow-hidden rounded-[1.25rem] shadow-xl">
              <Media
                resource={media}
                priority
                imgClassName="w-full object-cover"
                className="aspect-4/3 w-full"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
