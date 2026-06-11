'use client'

import { useRowLabel } from '@payloadcms/ui'

export function ServiceRowLabel() {
  const { data, rowNumber } = useRowLabel<{ name?: string }>()

  return <span>{data?.name || `Service ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`}</span>
}
