import type { Block } from 'payload'

export const ServiceGridBlock: Block = {
  slug: 'serviceGrid',
  labels: {
    singular: 'Service Grid',
    plural: 'Service Grids',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
  ],
}
