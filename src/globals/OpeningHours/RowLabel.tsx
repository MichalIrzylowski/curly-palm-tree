'use client'

import { useRowLabel } from '@payloadcms/ui'

const DAY_LABELS: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

export function RowLabel() {
  const { data } = useRowLabel<{ day?: string; isClosed?: boolean; openTime?: string; closeTime?: string }>()

  if (!data?.day) return <span>Day</span>

  const label = DAY_LABELS[data.day] ?? data.day
  const hours =
    data.isClosed
      ? 'Closed'
      : data.openTime && data.closeTime
        ? `${data.openTime} – ${data.closeTime}`
        : ''

  return (
    <span>
      {label}
      {hours && <span style={{ marginLeft: '0.5rem', opacity: 0.6 }}>{hours}</span>}
    </span>
  )
}
