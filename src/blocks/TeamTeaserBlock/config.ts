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
      name: 'ctaLink',
      type: 'relationship',
      relationTo: 'pages',
      label: 'CTA target page',
      admin: {
        description:
          'Page the CTA button links to (e.g. the Team page). The link uses the page’s localized slug, so it resolves to /en/team or /pl/zespol automatically.',
      },
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
