import React from 'react'

import { cn } from '@/utilities/ui'

type Props = {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  as?: React.ElementType
}

export const SectionWrapper: React.FC<Props> = ({
  children,
  className,
  innerClassName,
  as: Tag = 'section',
}) => {
  return (
    <Tag className={cn('w-full py-16', className)}>
      <div className={cn('mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8', innerClassName)}>
        {children}
      </div>
    </Tag>
  )
}
