'use client'

import React, { useEffect, useState } from 'react'

import type { OpeningHour } from '@/payload-types'
import { getWarsawDaySlug } from '@/utilities/getWarsawDaySlug'
import { OpenBadge } from './OpenBadge.client'

type DaySlug = OpeningHour['hours'][number]['day']

export type QuickInfoEntry = {
  day: DaySlug
  label: string
  openTime?: string | null
  closeTime?: string | null
  isClosed?: boolean | null
}

type Props = {
  entries: QuickInfoEntry[]
  closedLabel: string
}

export function QuickInfoToday({ entries, closedLabel }: Props) {
  // Resolved on the client so "today" reflects view time, not build time.
  const [today, setToday] = useState<DaySlug | null>(null)

  useEffect(() => {
    setToday(getWarsawDaySlug())
  }, [])

  if (!today) return null

  const entry = entries.find((e) => e.day === today)
  if (!entry) return null

  const hoursLabel = entry.isClosed
    ? closedLabel
    : entry.openTime && entry.closeTime
      ? `${entry.openTime} – ${entry.closeTime}`
      : null

  if (!hoursLabel) return null

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium">{entry.label}:</span>
      <span>{hoursLabel}</span>
      <OpenBadge openTime={entry.openTime} closeTime={entry.closeTime} isClosed={entry.isClosed} />
    </div>
  )
}
