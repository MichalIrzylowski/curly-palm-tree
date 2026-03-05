'use client'

import { useEffect, useState } from 'react'

type Props = {
  openTime?: string | null
  closeTime?: string | null
  isClosed?: boolean | null
}

function checkOpenNow(openTime: string, closeTime: string): boolean {
  const now = new Date()
  const current = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Warsaw',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now)
  return current >= openTime && current < closeTime
}

export function OpenBadge({ openTime, closeTime, isClosed }: Props) {
  const [open, setOpen] = useState<boolean | null>(null)

  useEffect(() => {
    if (isClosed || !openTime || !closeTime) {
      setOpen(false)
      return
    }

    setOpen(checkOpenNow(openTime, closeTime))

    const timer = setInterval(() => {
      setOpen(checkOpenNow(openTime!, closeTime!))
    }, 60_000)

    return () => clearInterval(timer)
  }, [openTime, closeTime, isClosed])

  // null = not yet hydrated — renders nothing (graceful for <noscript>)
  if (open === null) return null

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
        open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {open ? 'Otwarte' : 'Zamknięte'}
    </span>
  )
}
