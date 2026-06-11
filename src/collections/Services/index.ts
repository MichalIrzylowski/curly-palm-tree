import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service category',
    plural: 'Services',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'order'],
    useAsTitle: 'name',
    description:
      'Each document is one category section (e.g. Profilaktyka) with its full list of services.',
  },
  fields: [
    {
      name: 'name',
      label: 'Category name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short blurb shown on homepage highlight cards',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        components: {
          Field: '@/components/IconPickerField#IconPickerField',
        },
      },
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
    {
      name: 'services',
      type: 'array',
      labels: {
        singular: 'Service',
        plural: 'Services',
      },
      admin: {
        components: {
          RowLabel: '@/collections/Services/ServiceRowLabel#ServiceRowLabel',
        },
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Optional one-line description shown under the service name',
          },
        },
        {
          name: 'details',
          type: 'array',
          labels: {
            singular: 'Detail',
            plural: 'Details',
          },
          admin: {
            description: 'Optional bullet points (e.g. individual tests or procedures)',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
  ],
}
