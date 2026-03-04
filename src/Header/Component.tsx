import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Contact, Header } from '@/payload-types'

export async function Header() {
  const [headerData, contactData] = (await Promise.all([
    getCachedGlobal('header', 1)(),
    getCachedGlobal('contact', 1)(),
  ])) as [Header, Contact]
  return <HeaderClient data={headerData} contact={contactData} />
}
