import { cn } from '@/utilities/ui'
import React from 'react'

export interface TrustSignalsProps {
  className?: string
  items: string[]
}

export const TrustSignals: React.FC<TrustSignalsProps> = ({ className, items }) => {
  if (!items.length) return null

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground',
        className,
      )}
    >
      {items.map((item) => (
        <span key={item} className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {item}
        </span>
      ))}
    </div>
  )
}
