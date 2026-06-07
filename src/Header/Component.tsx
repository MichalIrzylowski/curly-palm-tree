import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Contact, Header, SiteSetting } from '@/payload-types'

export async function Header() {
  const [headerData, contactData, siteSettings] = (await Promise.all([
    getCachedGlobal('header', 1)(),
    getCachedGlobal('contact', 1)(),
    getCachedGlobal('site-settings', 0)(),
  ])) as [Header, Contact, SiteSetting]
  return <HeaderClient data={headerData} contact={contactData} clinicName={siteSettings?.clinicName} />
}
