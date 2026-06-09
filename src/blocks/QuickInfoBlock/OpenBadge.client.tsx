'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'

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
  const t = useTranslations('QuickInfo')
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

  if (open === null) return null

  return (
    <Badge
      variant={open ? 'default' : 'destructive'}
      className={open ? 'border-transparent bg-green-100 text-green-800 hover:bg-green-100' : undefined}
    >
      {open ? t('open') : t('closed')}
    </Badge>
  )
}
