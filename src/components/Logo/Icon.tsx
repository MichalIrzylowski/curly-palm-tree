import React from 'react'
import FaviconSvg from '@/../public/favicon.svg'

const DEFAULT_SIZE = 18

interface Props {
  className?: string
  width?: number
  height?: number
}

export const Icon: React.FC<Props> = ({
  className,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
}) => {
  return (
    <FaviconSvg
      width={width}
      height={height}
      className={className}
      aria-label="Lecznica Weterynaryjna"
      role="img"
    />
  )
}

export default Icon
