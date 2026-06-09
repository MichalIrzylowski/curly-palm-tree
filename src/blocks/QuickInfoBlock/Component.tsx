import React, { Suspense } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getTranslations } from 'next-intl/server'

import { OpenBadge } from './OpenBadge.client'

type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

function getTodayDayKey(): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Warsaw',
    weekday: 'long',
  })
    .format(new Date())
    .toLowerCase()
}

export const QuickInfoBlockComponent: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })

  const [openingHours, contact, t] = await Promise.all([
    payload.findGlobal({ slug: 'opening-hours' }),
    payload.findGlobal({ slug: 'contact' }),
    getTranslations('OpeningHours'),
  ])

  const tQuick = await getTranslations('QuickInfo')

  const todayKey = getTodayDayKey()
  const todayEntry = openingHours?.hours?.find((h) => h.day === todayKey)
  const primaryPhone = contact?.phones?.[0]

  const hoursLabel = todayEntry?.isClosed
    ? tQuick('closed')
    : todayEntry?.openTime && todayEntry?.closeTime
      ? `${todayEntry.openTime} – ${todayEntry.closeTime}`
      : null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 xl:relative xl:bottom-auto xl:left-auto xl:right-auto xl:z-auto xl:border-b xl:border-t-0">
      <div className="container flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 xl:py-2">
        {hoursLabel && (
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">{t(`days.${todayKey as DayKey}`)}:</span>
            <span>{hoursLabel}</span>
            <Suspense fallback={null}>
              <OpenBadge
                openTime={todayEntry?.openTime}
                closeTime={todayEntry?.closeTime}
                isClosed={todayEntry?.isClosed}
              />
            </Suspense>
          </div>
        )}

        <div className="flex items-center gap-4">
          {primaryPhone && (
            <a href={`tel:${primaryPhone.number}`} className="text-sm font-medium hover:underline">
              {primaryPhone.number}
            </a>
          )}

          {contact?.address && (
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {contact.address}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
