import type { Media } from '@/payload-types'

export const staff1: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Zdjęcie członka zespołu',
}
