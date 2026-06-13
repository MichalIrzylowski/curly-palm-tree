'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { QRCodeSVG } from 'qrcode.react'
import { X, ExternalLink } from 'lucide-react'

import { cn } from '@/utilities/ui'

type Props = {
  /** Campaign document id — used to remember dismissal for the session. */
  id: string
  url: string
  headline?: string | null
  description: string
  variant: 'small-bottom-right'
}

export function CampaignModal({ id, url, headline, description, variant }: Props) {
  const t = useTranslations('Campaign')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem(`campaign-dismissed:${id}`)
    if (!dismissed) setOpen(true)
  }, [id])

  function dismiss() {
    sessionStorage.setItem(`campaign-dismissed:${id}`, '1')
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-label={headline || description}
      className={cn(
        'fixed z-50 w-[calc(100%-2rem)] max-w-sm rounded-lg border bg-background p-4 shadow-lg',
        'animate-in fade-in-0 slide-in-from-bottom-4 duration-300',
        variant === 'small-bottom-right' && 'bottom-4 right-4 left-4 sm:left-auto',
      )}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label={t('close')}
        className="absolute right-2 top-2 rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-4">
        {/* QR code: desktop only — scanning from the same device is pointless. */}
        <div className="hidden shrink-0 sm:block">
          <QRCodeSVG value={url} size={88} className="rounded" />
        </div>

        <div className="min-w-0 pr-4">
          {headline ? <p className="font-semibold leading-tight">{headline}</p> : null}
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          <a
            href={url}
            target="_blank"
            rel="sponsored noopener"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            {t('visit')}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
