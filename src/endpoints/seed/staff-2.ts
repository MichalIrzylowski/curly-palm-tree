import type { Media } from '@/payload-types'

export const staff2: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Zdjęcie członka zespołu',
}
