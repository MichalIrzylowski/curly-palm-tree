import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { locales, localeLabels } from '@/i18n/locales'

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'enabled', 'variant', 'url'],
    useAsTitle: 'name',
    description:
      'Promotional modals shown to visitors. Attach a campaign to a page via the page’s Campaign tab.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal label only — never shown to visitors.',
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Master switch. Turn off to hide this campaign on every page at once.',
      },
    },
    {
      name: 'variant',
      type: 'select',
      required: true,
      defaultValue: 'small-bottom-right',
      options: [{ label: 'Small — bottom right corner', value: 'small-bottom-right' }],
      admin: {
        description: 'How the modal is displayed.',
      },
    },
    {
      name: 'linkType',
      type: 'radio',
      required: true,
      defaultValue: 'external',
      options: [
        { label: 'Internal page or post', value: 'internal' },
        { label: 'External URL', value: 'external' },
      ],
      admin: {
        layout: 'horizontal',
        description: 'Where the campaign sends visitors.',
      },
    },
    {
      name: 'internalDoc',
      type: 'relationship',
      relationTo: ['pages', 'posts'],
      required: true,
      label: 'Document to link to',
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === 'internal',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      required: true,
      label: 'External URL',
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === 'external',
        description: 'e.g. https://parassess.pl',
      },
    },
    {
      name: 'showOnLocales',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: [...locales],
      options: locales.map((code) => ({ label: localeLabels[code], value: code })),
      admin: {
        description: 'Which language versions of the site show this campaign.',
      },
    },
    {
      name: 'headline',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional short hook shown above the description.',
      },
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Short line telling visitors where the link leads.',
      },
    },
  ],
}
