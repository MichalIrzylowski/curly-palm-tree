'use client'
import { Button } from '@/components/ui/button'
import { CopyIcon } from '@payloadcms/ui/icons/Copy'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function CopyButton({ code }: { code: string }) {
  const t = useTranslations('CopyButton')
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex justify-end align-middle">
      <Button
        className="flex gap-1"
        variant={'secondary'}
        onClick={async () => {
          await navigator.clipboard.writeText(code)
          if (!copied) {
            setCopied(true)
            setTimeout(() => setCopied(false), 1000)
          }
        }}
      >
        <p>{copied ? t('copied') : t('copy')}</p>
        <CopyIcon />
      </Button>
    </div>
  )
}
