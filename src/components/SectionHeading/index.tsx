import React from 'react'

import { cn } from '@/utilities/ui'
import { Badge } from '@/components/ui/badge'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type Props = {
  children: string
  as?: HeadingTag
  size?: 'md' | 'lg'
  badge?: string
  subtitle?: string
  actions?: React.ReactNode
  align?: 'center' | 'left'
  className?: string
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  md: 'font-heading text-2xl font-bold text-foreground md:text-3xl',
  lg: 'font-heading text-3xl font-bold text-foreground md:text-4xl',
}

export const SectionHeading: React.FC<Props> = ({
  children,
  as: Tag = 'h2',
  size = 'md',
  badge,
  subtitle,
  actions,
  align = 'left',
  className,
}) => {
  const hasTopRow = badge || actions

  return (
    <div
      className={cn(
        size === 'lg' ? 'mb-10' : 'mb-8',
        { 'text-center': align === 'center' },
        className,
      )}
    >
      {hasTopRow ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {badge && (
              <Badge
                variant="secondary"
                className="mb-3 text-xs font-medium uppercase tracking-wider"
              >
                {badge}
              </Badge>
            )}
            <Tag className={sizeClasses[size ?? 'md']}>{children}</Tag>
            {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      ) : (
        <>
          <Tag className={sizeClasses[size ?? 'md']}>{children}</Tag>
          {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
        </>
      )}
    </div>
  )
}
