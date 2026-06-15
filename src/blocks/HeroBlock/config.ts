import type { Block } from 'payload'

import { link } from '@/fields/link'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      label: 'Clinic name / Heading (h1)',
      admin: {
        description: 'Main heading displayed as h1. Should match the clinic name.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      label: 'Tagline',
      admin: {
        description:
          'PL: "Dbamy o Twoje zwierzę — profesjonalnie i z troską." / EN: "Expert care, every visit."',
      },
    },
    link({
      appearances: false,
      overrides: {
        name: 'primaryCta',
        label: 'Primary CTA',
        admin: {
          description: 'The main booking call-to-action button (e.g. links to the contact page).',
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
      admin: {
        description: 'Full-bleed background image (clinic exterior or calming animal photo).',
      },
    },
    {
      name: 'trustSignals',
      type: 'array',
      label: 'Trust signals',
      admin: {
        description: 'Short trust bullets shown below the CTAs (e.g. "Doświadczony zespół weterynarzy").',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          localized: true,
          label: 'Text',
        },
      ],
    },
  ],
}
