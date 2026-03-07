import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { MapPin, Phone, Mail } from 'lucide-react'

import type { Contact } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'

// ─── Sub-components (presentational, used only here) ──────────────────────────

type InfoItemProps = {
  icon: React.ReactNode
  label?: string
  children: React.ReactNode
  className?: string
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, children, className }) => (
  <div className={cn('flex items-start gap-4', className)}>
    <span
      aria-hidden
      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary"
    >
      {icon}
    </span>
    <div className="min-w-0 flex-1">
      {label && (
        <p className="mb-0.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
      )}
      <div className="text-base font-medium text-foreground">{children}</div>
    </div>
  </div>
)

// ─── Phone list (handles 1–3 numbers) ─────────────────────────────────────────

type PhoneListProps = {
  phones: Contact['phones']
}

const PhoneList: React.FC<PhoneListProps> = ({ phones }) => (
  <div className="space-y-1.5">
    {phones.map((phone) => (
      <div key={phone.id ?? phone.number} className="flex flex-col">
        {phone.label && (
          <span className="text-xs text-muted-foreground">{phone.label}</span>
        )}
        <a
          href={`tel:${phone.number.replace(/\s/g, '')}`}
          className="font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          {phone.number}
        </a>
      </div>
    ))}
  </div>
)

// ─── Main server component ─────────────────────────────────────────────────────

type Props = {
  className?: string
}

export const ContactInfo: React.FC<Props> = async ({ className }) => {
  const payload = await getPayload({ config: configPromise })
  const contact = await payload.findGlobal({ slug: 'contact' })

  const hasPhones = contact.phones && contact.phones.length > 0
  const hasEmail = Boolean(contact.email)
  const hasAddress = Boolean(contact.address)

  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-card shadow-sm',
        className,
      )}
    >
      {/* Decorative accent bar — navy-to-teal gradient */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent"
      />

      <div className="space-y-5 px-8 py-7">
        {/* CI-01: Address */}
        {hasAddress && (
          <InfoItem
            icon={<MapPin size={20} strokeWidth={1.5} />}
            label="Adres"
          >
            <span>{contact.address}</span>
          </InfoItem>
        )}

        {hasAddress && (hasPhones || hasEmail) && <Separator />}

        {/* CI-02: Phone(s) */}
        {hasPhones && (
          <InfoItem
            icon={<Phone size={20} strokeWidth={1.5} />}
            label={contact.phones.length > 1 ? 'Telefony' : 'Telefon'}
          >
            <PhoneList phones={contact.phones} />
          </InfoItem>
        )}

        {hasPhones && hasEmail && <Separator />}

        {/* CI-03: Email */}
        {hasEmail && (
          <InfoItem
            icon={<Mail size={20} strokeWidth={1.5} />}
            label="E-mail"
          >
            <a
              href={`mailto:${contact.email}`}
              className="font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              {contact.email}
            </a>
          </InfoItem>
        )}
      </div>
    </Card>
  )
}
