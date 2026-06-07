import React from 'react'
import type { ImageGalleryBlock as ImageGalleryBlockType, Media } from '@/payload-types'
import { SectionWrapper } from '@/components/SectionWrapper'
import { SectionHeading } from '@/components/SectionHeading'
import RichText from '@/components/RichText'
import { GalleryCarousel, type GalleryItem } from './GalleryCarousel.client'

export const ImageGalleryBlockComponent: React.FC<ImageGalleryBlockType> = ({
  heading,
  images,
}) => {
  if (!images?.length) return null

  const items: GalleryItem[] = images.flatMap(({ image }) => {
    if (!image || typeof image !== 'object') return []
    const media = image as Media
    const caption = media.caption
    return [
      {
        media,
        captionNode: caption ? (
          <RichText data={caption} enableGutter={false} enableProse={false} />
        ) : null,
      },
    ]
  })

  return (
    <SectionWrapper>
      {heading && <SectionHeading>{heading}</SectionHeading>}
      <GalleryCarousel items={items} />
    </SectionWrapper>
  )
}
