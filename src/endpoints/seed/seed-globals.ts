import type { Payload } from 'payload'
import { richText } from './utils'

export async function seedGlobals(payload: Payload): Promise<void> {
  payload.logger.info('— Seeding globals...')

  // Opening hours
  await payload.updateGlobal({
    slug: 'opening-hours',
    data: {
      hours: [
        { day: 'monday', openTime: '08:00', closeTime: '20:00', isClosed: false },
        { day: 'tuesday', openTime: '08:00', closeTime: '20:00', isClosed: false },
        { day: 'wednesday', openTime: '08:00', closeTime: '20:00', isClosed: false },
        { day: 'thursday', openTime: '08:00', closeTime: '20:00', isClosed: false },
        { day: 'friday', openTime: '08:00', closeTime: '20:00', isClosed: false },
        { day: 'saturday', openTime: '09:00', closeTime: '14:00', isClosed: false },
        { day: 'sunday', isClosed: true },
      ],
    } as any,
  })

  // Contact — Polish locale
  await payload.updateGlobal({
    slug: 'contact',
    locale: 'pl',
    data: {
      lat: 54.4472595,
      lng: 18.5504898,
      address: 'ul. 23 Marca 32E, 81-820 Sopot',
      phones: [{ label: 'Rejestracja', number: '+48 58 555 01 01' }],
      email: 'kontakt@lecznica-weterynaryjna.pl',
      directionsNotes: richText(
        'Bezpłatny parking dostępny przed kliniką oraz na ulicy 23 Marca.',
      ),
    } as any,
  })

  // Contact — English locale
  await payload.updateGlobal({
    slug: 'contact',
    locale: 'en',
    data: {
      lat: 54.4472595,
      lng: 18.5504898,
      address: 'ul. 23 Marca 32E, 81-820 Sopot',
      phones: [{ label: 'Reception', number: '+48 58 555 01 01' }],
      email: 'kontakt@lecznica-weterynaryjna.pl',
      directionsNotes: richText(
        'Free parking available in front of the clinic and on ul. 23 Marca.',
      ),
    } as any,
  })

  // Navigation items (shared across locales)
  const navItems = [
    { url: '/', label: 'Strona główna' },
    { url: '/services', label: 'Usługi' },
    { url: '/team', label: 'Zespół' },
    { url: '/contact', label: 'Kontakt' },
  ].map(({ url, label }) => ({ link: { type: 'custom' as const, url, label } }))

  await payload.updateGlobal({ slug: 'header', data: { navItems } as any })
  await payload.updateGlobal({ slug: 'footer', data: { navItems } as any })
}
