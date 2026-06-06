import React from 'react'
import LogoSvg from '@/../public/logo.svg'

interface Props {
  className?: string
  width?: number
  height?: number
  'aria-label'?: string
  multiline?: boolean
}

export const Logo: React.FC<Props> = ({
  className,
  width = 50,
  height = 50,
  'aria-label': ariaLabel = 'Lecznica Weterynaryjna',
  multiline = true,
}) => {
  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`} aria-label={ariaLabel} role="img">
      <LogoSvg width={width} height={height} className="fill-secondary" aria-hidden="true" />
      <span className="font-semibold leading-tight text-xl text-secondary">
        {multiline ? (
          <>
            Lecznica
            <br />
            Weterynaryjna
          </>
        ) : (
          'Lecznica Weterynaryjna'
        )}
      </span>
    </div>
  )
}

export default Logo
