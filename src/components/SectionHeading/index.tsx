import React from 'react'

import { cn } from '@/utilities/ui'

type Props = {
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}

export const SectionHeading: React.FC<Props> = ({
  title,
  subtitle,
  align = 'left',
  className,
}) => {
  return (
    <div className={cn('mb-8', { 'text-center': align === 'center' }, className)}>
      <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
