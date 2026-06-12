import type { Contact } from '@/payload-types'

/**
 * Single display form of the clinic address, composed from the structured
 * Contact fields so the JSON-LD PostalAddress and the visible address can
 * never drift apart.
 */
export const formatAddress = ({
  street,
  postalCode,
  city,
}: Pick<Contact, 'street' | 'postalCode' | 'city'>): string =>
  `${street}, ${postalCode} ${city}`
