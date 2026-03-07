import type { Media } from '@/payload-types'

export const vetMan: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Zdjęcie członka zespołu',
}
