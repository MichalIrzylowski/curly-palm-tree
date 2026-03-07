import type { Field } from 'payload'

const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')

export const slugField = (fieldToUse = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  required: true,
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeChange: [
      ({ data, operation, originalDoc, value }) => {
        console.log('slugField', { data, operation, value })
        if (value) return value

        const source =
          data?.[fieldToUse] ?? (operation === 'update' ? originalDoc?.[fieldToUse] : undefined)

        if (source) {
          return slugify(source)
        }

        return value
      },
    ],
  },
})
