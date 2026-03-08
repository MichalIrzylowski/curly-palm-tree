import type { Block } from 'payload'

export const TeamGridBlock: Block = {
  slug: 'teamGrid',
  labels: {
    singular: 'Team Grid',
    plural: 'Team Grids',
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
