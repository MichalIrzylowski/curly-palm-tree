import type { Block } from 'payload'

import { link } from '@/fields/link'

export const ServicesHighlightsBlock: Block = {
  slug: 'servicesHighlightsBlock',
  interfaceName: 'ServicesHighlightsBlock',
  labels: {
    singular: 'Services Highlights',
    plural: 'Services Highlights',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Nasze usługi',
      label: 'Section heading',
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      maxRows: 4,
      label: 'Service categories to highlight',
      admin: {
        description: 'Select the service categories to display as cards on the homepage.',
      },
    },
    link({
      disableLabel: true,
      appearances: false,
      overrides: {
        name: 'valLink',
        label: '"View all" button link',
        admin: {
          description: 'Where the "View all services" button should point.',
        },
      },
    }),
  ],
}
