import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Contact, Header, SiteSetting } from '@/payload-types'
import type { Locale } from '@/i18n/locales'

export async function Header({ locale }: { locale: Locale }) {
  const [headerData, contactData, siteSettings] = (await Promise.all([
    getCachedGlobal('header', 1, locale)(),
    getCachedGlobal('contact', 1, locale)(),
    getCachedGlobal('site-settings', 0, locale)(),
  ])) as [Header, Contact, SiteSetting]
  return <HeaderClient data={headerData} contact={contactData} clinicName={siteSettings?.clinicName} />
}
