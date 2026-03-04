import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Contact, Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { PhoneLink } from '@/components/PhoneLink'

export async function Footer() {
  const [footerData, contactData] = (await Promise.all([
    getCachedGlobal('footer', 1)(),
    getCachedGlobal('contact', 1)(),
  ])) as [Footer, Contact]

  const navItems = footerData?.navItems || []
  const primaryPhone = contactData?.phones?.[0]

  return (
    <footer className="mt-auto border-t border-border bg-card text-card-foreground">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + copyright */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Lecznica Weterynaryjna. Wszelkie prawa zastrzeżone.
            </p>
          </div>

          {/* Nav links */}
          {navItems.length > 0 && (
            <nav className="flex flex-col gap-3">
              {navItems.map(({ link }, i) => (
                <CMSLink key={i} {...link} />
              ))}
            </nav>
          )}

          {/* Contact info */}
          <div className="flex flex-col gap-2 text-sm">
            {contactData?.address && <p>{contactData.address}</p>}
            {primaryPhone && (
              <PhoneLink
                number={primaryPhone.number}
                label={primaryPhone.label ?? primaryPhone.number}
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
