import React from 'react'

import { cn } from '@/utilities/ui'

type Props = {
  number: string
  label?: string
  className?: string
}

export const PhoneLink: React.FC<Props> = ({ number, label, className }) => {
  const href = `tel:${number.replace(/\s/g, '')}`

  return (
    <a href={href} className={cn('hover:underline', className)}>
      {label ?? number}
    </a>
  )
}
