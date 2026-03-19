import React from 'react'
import LogoSvg from '@/../public/logo.svg'

interface Props {
  className?: string
  width?: number
  height?: number
  color?: string
  'aria-label'?: string
}

export const Logo: React.FC<Props> = ({
  className,
  width = 310,
  height = 58,
  color = '#3a803b',
  'aria-label': ariaLabel = 'Lecznica Weterynaryjna',
}) => {
  return (
    <LogoSvg
      width={width}
      height={height}
      fill={color}
      className={className}
      aria-label={ariaLabel}
      role="img"
    />
  )
}
