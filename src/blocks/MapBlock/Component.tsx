import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { MapPin, Navigation, Phone, Mail } from 'lucide-react'

import { SectionWrapper } from '@/components/SectionWrapper'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import RichText from '@/components/RichText'

// ~0.008° ≈ 700–900 m at lat 54 — comfortable street-level view
const BBOX_DELTA = 0.008

type InfoRowProps = {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, children }) => (
  <div className="flex items-start gap-3.5">
    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
      {icon}
    </span>
    <div className="min-w-0 flex-1">
      <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <div className="text-sm font-medium leading-snug text-foreground">{children}</div>
    </div>
  </div>
)

/**
 * Combined Contact & Map block.
 *
 * Layout:
 *   Mobile  — contact info on top, map embed below (DOM order)
 *   Desktop — map embed on the left (dominant), contact info panel on the right
 *
 */
export const MapBlockComponent: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })
  const contact = await payload.findGlobal({ slug: 'contact' })

  const { lat, lng, address, directionsNotes, phones, email } = contact

  const osmEmbedUrl =
    `https://www.openstreetmap.org/export/embed.html` +
    `?bbox=${(lng - BBOX_DELTA).toFixed(6)},${(lat - BBOX_DELTA).toFixed(6)},` +
    `${(lng + BBOX_DELTA).toFixed(6)},${(lat + BBOX_DELTA).toFixed(6)}` +
    `&layer=mapnik&marker=${lat},${lng}`

  const osmLargerUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`
  const directionsUrl = `https://maps.google.com/?q=${lat},${lng}`

  const hasPhones = phones && phones.length > 0
  const hasEmail = Boolean(email)
  const hasAddress = Boolean(address)

  return (
    <SectionWrapper className="bg-muted/30">
      {/* Section header */}
      <div className="mb-8 flex flex-col gap-2">
        <Badge variant="secondary" className="w-fit text-xs font-semibold uppercase tracking-wider">
          Kontakt & Lokalizacja
        </Badge>
        <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
          Jak do nas dotrzeć
        </h2>
      </div>

      {/*
        DOM order: contact info first, map second.
        Mobile (flex-col):  contact info on top, map on bottom — follows source order.
        Desktop (grid):     map moves to col 1 (left), contact stays in col 2 (right)
                            via explicit col-start / row-start placement.
      */}
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_380px] lg:items-stretch">
        {/* ── Contact info panel — DOM first → top on mobile, right on desktop ── */}
        <div className="lg:col-start-2 lg:row-start-1">
          <div className="relative flex h-full flex-col gap-5 overflow-hidden rounded-xl border border-border/60 bg-card px-6 py-6 shadow-sm">
            {/* Decorative accent bar */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent"
            />

            {hasAddress && (
              <InfoRow icon={<MapPin size={18} strokeWidth={1.5} />} label="Adres">
                <span>{address}</span>
              </InfoRow>
            )}

            {hasAddress && (hasPhones || hasEmail) && <Separator />}

            {hasPhones && (
              <InfoRow
                icon={<Phone size={18} strokeWidth={1.5} />}
                label={phones.length > 1 ? 'Telefony' : 'Telefon'}
              >
                <div className="space-y-1.5">
                  {phones.map((phone) => (
                    <div key={phone.id ?? phone.number} className="flex flex-col">
                      {phone.label && (
                        <span className="text-xs text-muted-foreground">{phone.label}</span>
                      )}
                      <a
                        href={`tel:${phone.number.replace(/\s/g, '')}`}
                        className="font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
                      >
                        {phone.number}
                      </a>
                    </div>
                  ))}
                </div>
              </InfoRow>
            )}

            {hasPhones && hasEmail && <Separator />}

            {hasEmail && (
              <InfoRow icon={<Mail size={18} strokeWidth={1.5} />} label="E-mail">
                <a
                  href={`mailto:${email}`}
                  className="font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm"
                >
                  {email}
                </a>
              </InfoRow>
            )}

            {directionsNotes && (
              <>
                <Separator />
                <RichText
                  data={directionsNotes}
                  enableGutter={false}
                  enableProse={false}
                  className="text-sm leading-relaxed text-muted-foreground [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                />
              </>
            )}

            <div className="mt-auto pt-2">
              <Button asChild className="w-full gap-2" size="lg">
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="h-4 w-4" aria-hidden />
                  Nawiguj do nas
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Map embed — DOM second → bottom on mobile, left on desktop ── */}
        <div className="lg:col-start-1 lg:row-start-1 flex flex-col gap-1">
          <div className="relative flex-1 overflow-hidden rounded-xl border border-border shadow-sm">
            <iframe
              title="Mapa — Lecznica Weterynaryjna"
              src={osmEmbedUrl}
              width="100%"
              height="100%"
              className="min-h-[300px] w-full border-0 lg:min-h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label={
                address ? `Mapa z lokalizacją: ${address}` : 'Mapa z lokalizacją lecznicy'
              }
            />
          </div>

          <p className="px-1 text-xs text-muted-foreground">
            Mapa:{' '}
            <a
              href={osmLargerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              OpenStreetMap
            </a>
          </p>

          <noscript>
            <div className="mt-2 flex items-start gap-2 rounded-lg border border-border bg-card p-4">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
              <span className="text-sm font-medium text-foreground">{address}</span>
            </div>
          </noscript>
        </div>
      </div>
    </SectionWrapper>
  )
}
