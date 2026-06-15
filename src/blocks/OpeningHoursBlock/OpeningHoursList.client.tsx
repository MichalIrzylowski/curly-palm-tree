'use client'

import React, { useEffect, useState } from 'react'

import type { OpeningHour } from '@/payload-types'
import { getWarsawDaySlug } from '@/utilities/getWarsawDaySlug'

type DaySlug = OpeningHour['hours'][number]['day']

export type OpeningHoursEntry = {
  day: DaySlug
  label: string
  valueLabel: string
  note?: string | null
}

type Props = {
  entries: OpeningHoursEntry[]
}

export function OpeningHoursList({ entries }: Props) {
  // Resolved on the client so "today" reflects view time, not build time.
  const [today, setToday] = useState<DaySlug | null>(null)

  useEffect(() => {
    setToday(getWarsawDaySlug())
  }, [])

  return (
    <ul className="divide-y divide-border rounded-lg border border-border">
      {entries.map((entry) => {
        const isToday = entry.day === today
        return (
          <li
            key={entry.day}
            className={`flex items-center justify-between px-4 py-3 text-sm${isToday ? ' bg-muted font-medium' : ''}`}
          >
            <span>{entry.label}</span>
            <span className="flex items-center gap-3">
              {entry.valueLabel}
              {entry.note && <span className="text-xs text-muted-foreground">({entry.note})</span>}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
