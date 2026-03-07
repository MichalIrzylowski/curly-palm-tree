import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroBlockComponent } from '@/blocks/HeroBlock/Component'
import { MapBlockComponent } from '@/blocks/MapBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { QuickInfoBlockComponent } from '@/blocks/QuickInfoBlock/Component'
import { ServicesHighlightsBlockComponent } from '@/blocks/ServicesHighlightsBlock/Component'
import { TeamTeaserBlockComponent } from '@/blocks/TeamTeaserBlock/Component'
import { WhyUsBlockComponent } from '@/blocks/WhyUsBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  heroBlock: HeroBlockComponent,
  mapBlock: MapBlockComponent,
  mediaBlock: MediaBlock,
  quickInfoBlock: QuickInfoBlockComponent,
  servicesHighlightsBlock: ServicesHighlightsBlockComponent,
  teamTeaserBlock: TeamTeaserBlockComponent,
  whyUsBlock: WhyUsBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const noMargin = blockType === 'quickInfoBlock'
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
