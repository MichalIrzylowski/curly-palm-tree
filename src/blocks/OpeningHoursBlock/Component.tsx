import React from 'react'
import { getOpeningHours } from '@/loaders/getOpeningHours'

const DAY_LABELS: Record<string, string> = {
  monday: 'Poniedziałek',
  tuesday: 'Wtorek',
  wednesday: 'Środa',
  thursday: 'Czwartek',
  friday: 'Piątek',
  saturday: 'Sobota',
  sunday: 'Niedziela',
}

function getTodayDayKey(): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Warsaw',
    weekday: 'long',
  })
    .format(new Date())
    .toLowerCase()
}

export const OpeningHoursBlockComponent: React.FC = async () => {
  const openingHours = await getOpeningHours()

  const todayKey = getTodayDayKey()
  const hours = openingHours?.hours ?? []

  return (
    <div className="container py-12">
      <h2 className="mb-6 text-2xl font-semibold">Godziny otwarcia</h2>
      <ul className="divide-y divide-border rounded-lg border border-border">
        {hours.map((entry) => {
          const isToday = entry.day === todayKey
          const label = entry.isClosed
            ? 'Nieczynne'
            : entry.openTime && entry.closeTime
              ? `${entry.openTime} – ${entry.closeTime}`
              : '—'

          return (
            <li
              key={entry.day}
              className={`flex items-center justify-between px-4 py-3 text-sm${isToday ? ' bg-muted font-medium' : ''}`}
            >
              <span>{DAY_LABELS[entry.day] ?? entry.day}</span>
              <span className="flex items-center gap-3">
                {label}
                {entry.note && (
                  <span className="text-xs text-muted-foreground">({entry.note})</span>
                )}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
