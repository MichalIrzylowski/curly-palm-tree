'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

export type GalleryItem = {
  media: MediaType
  captionNode: React.ReactNode
}

export function GalleryCarousel({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + items.length) % items.length)
  }, [items.length])

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % items.length)
  }, [items.length])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, prev, next])

  const activeItem = items[activeIndex]

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <Button
            key={item.media.id}
            variant="ghost"
            size="clear"
            onClick={() => {
              setActiveIndex(i)
              setOpen(true)
            }}
            className="relative aspect-square overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={item.media.alt || `Zdjęcie ${i + 1}`}
          >
            <Media
              resource={item.media}
              fill
              imgClassName="object-cover transition-transform duration-300 hover:scale-105"
            />
          </Button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl gap-0 overflow-hidden p-0">
          <div className="relative h-[60vh] w-full bg-secondary">
            {activeItem && <Media resource={activeItem.media} fill imgClassName="object-contain" />}
            {items.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="clear"
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  aria-label="Poprzednie zdjęcie"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="clear"
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  aria-label="Następne zdjęcie"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/70">
              {activeIndex + 1} / {items.length}
            </div>
          </div>
          {activeItem?.captionNode && (
            <div className="px-6 py-3 text-sm text-muted-foreground">{activeItem.captionNode}</div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
