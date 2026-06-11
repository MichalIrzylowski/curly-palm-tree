import React from 'react'
import {
  Stethoscope,
  Scissors,
  HeartPulse,
  Syringe,
  Microscope,
  Pill,
  Bandage,
  PawPrint,
} from 'lucide-react'

const LUCIDE_ICONS: Record<string, React.ElementType> = {
  stethoscope: Stethoscope,
  scissors: Scissors,
  'heart-pulse': HeartPulse,
  syringe: Syringe,
  microscope: Microscope,
  pill: Pill,
  bandage: Bandage,
  paw: PawPrint,
}

type Props = {
  name: string
  className?: string
}

export function ServiceIcon({ name, className = 'size-5' }: Props) {
  const Icon = LUCIDE_ICONS[name] ?? Stethoscope
  return <Icon className={className} strokeWidth={1.75} aria-hidden="true" />
}
