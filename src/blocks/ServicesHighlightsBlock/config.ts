import type { Block } from 'payload'

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
      label: 'Services to highlight',
      admin: {
        description: 'Select 3–4 services to display on the homepage.',
      },
    },
  ],
}
