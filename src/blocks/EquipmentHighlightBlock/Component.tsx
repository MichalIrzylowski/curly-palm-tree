import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { EquipmentHighlightBlock as EquipmentHighlightBlockType } from '@/payload-types'
import { EquipmentCard } from '@/components/EquipmentCard'
import { SectionWrapper } from '@/components/SectionWrapper'
import { SectionHeading } from '@/components/SectionHeading'
import { getEquipment } from '@/loaders/getEquipment'

export const EquipmentHighlightBlockComponent: React.FC<EquipmentHighlightBlockType> = async ({
  heading,
}) => {
  const [docs, t] = await Promise.all([getEquipment(), getTranslations('EquipmentHighlight')])

  if (!docs.length) return null

  return (
    <SectionWrapper>
      <SectionHeading subtitle={t('defaultSubtitle')}>
        {heading ?? t('defaultHeading')}
      </SectionHeading>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((item) => (
          <EquipmentCard key={item.id} item={item} />
        ))}
      </div>
    </SectionWrapper>
  )
}
