import React from 'react'

import type { Contact, OpeningHour, SiteSetting } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'

const SCHEMA_DAYS: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

/**
 * schema.org VeterinaryCare (LocalBusiness) markup for local search, composed
 * entirely from CMS globals so it can never drift from the visible site.
 * Rendered once in the locale layout — identical for every page and locale.
 */
export const VeterinaryCareJsonLd: React.FC = async () => {
  const [contact, openingHours, siteSettings] = (await Promise.all([
    getCachedGlobal('contact', 0)(),
    getCachedGlobal('opening-hours', 0)(),
    getCachedGlobal('site-settings', 0)(),
  ])) as [Contact, OpeningHour, SiteSetting]

  const openingHoursSpecification = (openingHours?.hours ?? [])
    .filter((entry) => !entry.isClosed && entry.openTime && entry.closeTime)
    .map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: SCHEMA_DAYS[entry.day],
      opens: entry.openTime,
      closes: entry.closeTime,
    }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    name: siteSettings?.clinicName,
    url: getServerSideURL(),
    ...(contact?.phones?.[0]?.number && { telephone: contact.phones[0].number }),
    ...(contact?.email && { email: contact.email }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact?.street,
      postalCode: contact?.postalCode,
      addressLocality: contact?.city,
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contact?.lat,
      longitude: contact?.lng,
    },
    ...(openingHoursSpecification.length > 0 && { openingHoursSpecification }),
  }

  return (
    <script
      type="application/ld+json"
      // `<` is escaped so CMS-authored values cannot close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}
