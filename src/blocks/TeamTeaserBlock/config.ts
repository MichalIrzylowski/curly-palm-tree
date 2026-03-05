import type { Block } from 'payload'

export const TeamTeaserBlock: Block = {
  slug: 'teamTeaserBlock',
  interfaceName: 'TeamTeaserBlock',
  labels: {
    singular: 'Team Teaser',
    plural: 'Team Teasers',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Poznaj nasz zespół',
      label: 'Section heading',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Poznaj nasz zespół',
      label: 'CTA button label',
    },
    {
      name: 'pinnedMembers',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
      label: 'Pinned team members',
      admin: {
        description: 'Leave empty to show all active team members (sorted by order). Select specific members to override.',
      },
    },
  ],
}
