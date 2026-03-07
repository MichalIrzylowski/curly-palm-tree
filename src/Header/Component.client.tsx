'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Contact, Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { PhoneLink } from '@/components/PhoneLink'
import { LanguageSwitcher } from './LanguageSwitcher'
import { HeaderNav } from './Nav'
import { Menu, Phone, X } from 'lucide-react'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
  contact: Contact
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, contact }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = data?.navItems || []
  const primaryPhone = contact?.phones?.[0]

  useEffect(() => {
    setMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <header className="sticky top-0 z-20 bg-background border-b border-border">
      <div className="container">
        <div className="py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Logo loading="eager" priority="high" />
          </Link>

          {/* Desktop nav + controls */}
          <div className="hidden md:flex items-center gap-6">
            <HeaderNav data={data} />
            <LanguageSwitcher />
            {primaryPhone && (
              <a
                href={`tel:${primaryPhone.number.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {primaryPhone.number}
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded hover:bg-accent/10"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-border py-6 flex flex-col gap-5">
            <nav className="flex flex-col gap-4">
              {navItems.map(({ link }, i) => (
                <CMSLink key={i} {...link} appearance="link" />
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
            </div>
            {primaryPhone && (
              <PhoneLink
                number={primaryPhone.number}
                label={primaryPhone.label ?? primaryPhone.number}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium w-fit"
              />
            )}
          </div>
        )}
      </div>
    </header>
  )
}
