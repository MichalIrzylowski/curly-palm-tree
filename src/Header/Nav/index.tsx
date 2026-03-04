'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType; className?: string }> = ({
  data,
  className,
}) => {
  const navItems = data?.navItems || []

  return (
    <nav className={className ?? 'flex gap-6 items-center'}>
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
    </nav>
  )
}
