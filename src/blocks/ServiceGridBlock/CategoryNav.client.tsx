'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'

type NavItem = {
  anchorId: string
  label: string
}

type Props = {
  items: NavItem[]
  ariaLabel: string
}

export function CategoryNav({ items, ariaLabel }: Props) {
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.anchorId)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )

    for (const { anchorId } of items) {
      const el = document.getElementById(anchorId)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
        {items.map((item) => (
          <li key={item.anchorId}>
            <a
              href={`#${item.anchorId}`}
              className={cn(
                'block rounded-full border px-4 py-1.5 text-sm transition-colors lg:rounded-md lg:border-0 lg:px-3 lg:py-2',
                activeId === item.anchorId
                  ? 'border-primary/30 bg-primary/8 font-medium text-primary'
                  : 'border-border text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
