import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getTranslations } from 'next-intl/server'

import { formatAddress } from '@/utilities/formatAddress'
import { QuickInfoToday, type QuickInfoEntry } from './QuickInfoToday.client'

type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export const QuickInfoBlockComponent: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })

  const [openingHours, contact, t] = await Promise.all([
    payload.findGlobal({ slug: 'opening-hours' }),
    payload.findGlobal({ slug: 'contact' }),
    getTranslations('OpeningHours'),
  ])

  const tQuick = await getTranslations('QuickInfo')

  const primaryPhone = contact?.phones?.[0]

  const entries: QuickInfoEntry[] = (openingHours?.hours ?? []).map((entry) => ({
    day: entry.day,
    label: t(`days.${entry.day as DayKey}`),
    openTime: entry.openTime,
    closeTime: entry.closeTime,
    isClosed: entry.isClosed,
  }))

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 xl:relative xl:bottom-auto xl:left-auto xl:right-auto xl:z-auto xl:border-b xl:border-t-0">
      <div className="container flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 xl:py-2">
        <QuickInfoToday entries={entries} closedLabel={tQuick('closed')} />

        <div className="flex items-center gap-4">
          {primaryPhone && (
            <a href={`tel:${primaryPhone.number}`} className="text-sm font-medium hover:underline">
              {primaryPhone.number}
            </a>
          )}

          {contact && (
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {formatAddress(contact)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
