import React from 'react'
import LogoSvg from '@/../public/logo.svg'

const FALLBACK_NAME = 'Lecznica Weterynaryjna'

interface Props {
  className?: string
  width?: number
  height?: number
  name?: string
  multiline?: boolean
}

export const Logo: React.FC<Props> = ({
  className,
  width = 50,
  height = 50,
  name = FALLBACK_NAME,
  multiline = true,
}) => {
  return (
    <div
      className={`flex items-center gap-2 ${className ?? ''}`}
      aria-label={name}
      role="img"
    >
      <LogoSvg width={width} height={height} className="fill-secondary" aria-hidden="true" />
      <span
        className={`font-semibold leading-tight text-xl text-secondary${multiline ? ' max-w-36' : ''}`}
      >
        {name}
      </span>
    </div>
  )
}

export default Logo
