import React from 'react'
import { getTranslations } from 'next-intl/server'
import { getOpeningHours } from '@/loaders/getOpeningHours'
import { SectionHeading } from '@/components/SectionHeading'
import { OpeningHoursList, type OpeningHoursEntry } from './OpeningHoursList.client'

type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export const OpeningHoursBlockComponent: React.FC = async () => {
  const [openingHours, t] = await Promise.all([
    getOpeningHours(),
    getTranslations('OpeningHours'),
  ])

  const hours = openingHours?.hours ?? []

  const entries: OpeningHoursEntry[] = hours.map((entry) => ({
    day: entry.day,
    label: t(`days.${entry.day as DayKey}`),
    valueLabel: entry.isClosed
      ? t('closed')
      : entry.openTime && entry.closeTime
        ? `${entry.openTime} – ${entry.closeTime}`
        : '—',
    note: entry.note,
  }))

  return (
    <div className="container py-12">
      <SectionHeading>{t('heading')}</SectionHeading>
      <OpeningHoursList entries={entries} />
    </div>
  )
}
