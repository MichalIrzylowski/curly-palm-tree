import React from 'react'
import type { EquipmentHighlightBlock as EquipmentHighlightBlockType } from '@/payload-types'
import { EquipmentCard } from '@/components/EquipmentCard'
import { SectionWrapper } from '@/components/SectionWrapper'
import { SectionHeading } from '@/components/SectionHeading'
import { getEquipment } from '@/loaders/getEquipment'

export const EquipmentHighlightBlockComponent: React.FC<EquipmentHighlightBlockType> = async ({
  heading,
}) => {
  const docs = await getEquipment()

  if (!docs.length) return null

  return (
    <SectionWrapper>
      <SectionHeading subtitle="Inwestujemy w nowoczesne narzędzia dla dobra Twoich podopiecznych.">
        {heading ?? 'Nowoczesny sprzęt'}
      </SectionHeading>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((item) => (
          <EquipmentCard key={item.id} item={item} />
        ))}
      </div>
    </SectionWrapper>
  )
}
