import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Team: CollectionConfig = {
  slug: 'team',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'role', 'order'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'e.g. Lead Veterinarian / Lekarz Weterynarii',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Short biography (~100 words)',
      },
    },
    {
      name: 'specialisations',
      type: 'array',
      localized: true,
      admin: {
        description: 'e.g. Surgery, Dentistry, Exotic animals',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'languages',
      type: 'array',
      admin: {
        description: 'Languages spoken (optional)',
      },
      fields: [
        {
          name: 'language',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower number = shown first)',
        position: 'sidebar',
      },
    },
  ],
}
