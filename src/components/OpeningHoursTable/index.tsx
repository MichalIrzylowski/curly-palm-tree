'use client'

import React from 'react'

import type { OpeningHour } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { OpenNowBadge } from '@/components/OpenNowBadge'

const DAY_ORDER: OpeningHour['hours'][number]['day'][] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

const DAY_LABELS: Record<OpeningHour['hours'][number]['day'], string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

const JS_DAY_TO_SLUG: OpeningHour['hours'][number]['day'][] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

type Props = {
  hours: OpeningHour['hours']
  className?: string
}

export const OpeningHoursTable: React.FC<Props> = ({ hours, className }) => {
  const todaySlug = JS_DAY_TO_SLUG[new Date().getDay()]

  const sorted = [...hours].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day),
  )

  return (
    <div className={cn('space-y-4', className)}>
      <OpenNowBadge hours={hours} />

      <table className="w-full text-sm">
        <tbody>
          {sorted.map((row) => {
            const isToday = row.day === todaySlug
            return (
              <tr
                key={row.day}
                className={cn(
                  'border-b border-border last:border-0',
                  isToday && 'rounded bg-accent/10 font-semibold ring-1 ring-inset ring-accent/30',
                )}
              >
                <td className="py-2 pr-4 text-foreground">{DAY_LABELS[row.day]}</td>
                <td className="py-2 text-right">
                  {row.isClosed ? (
                    <span className="text-muted-foreground">Closed</span>
                  ) : row.openTime && row.closeTime ? (
                    <span>
                      {row.openTime}–{row.closeTime}
                      {row.note && (
                        <span className="ml-2 text-xs font-normal italic text-muted-foreground">
                          {row.note}
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
