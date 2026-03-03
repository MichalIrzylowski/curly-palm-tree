import React from 'react'

import { cn } from '@/utilities/ui'

type Props = {
  label: string
  className?: string
}

export const TagBadge: React.FC<Props> = ({ label, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-secondary/15 px-3 py-0.5 text-xs font-medium text-secondary',
        className,
      )}
    >
      {label}
    </span>
  )
}
