'use client'

import React from 'react'

import type { OpeningHour } from '@/payload-types'

import { cn } from '@/utilities/ui'

const JS_DAY_TO_SLUG: OpeningHour['hours'][number]['day'][] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

function parseMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + (m ?? 0)
}

function isOpenNow(hours: OpeningHour['hours']): boolean {
  const now = new Date()
  const todaySlug = JS_DAY_TO_SLUG[now.getDay()]
  const todayRow = hours.find((h) => h.day === todaySlug)

  if (!todayRow || todayRow.isClosed) return false
  if (!todayRow.openTime || !todayRow.closeTime) return false

  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const openMinutes = parseMinutes(todayRow.openTime)
  const closeMinutes = parseMinutes(todayRow.closeTime)

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes
}

type Props = {
  hours: OpeningHour['hours']
  className?: string
}

export const OpenNowBadge: React.FC<Props> = ({ hours, className }) => {
  const open = isOpenNow(hours)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
        open ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground',
        className,
      )}
    >
      <span
        className={cn('h-2 w-2 rounded-full', open ? 'bg-success' : 'bg-muted-foreground')}
        aria-hidden="true"
      />
      {open ? 'Open now' : 'Closed'}
    </span>
  )
}
