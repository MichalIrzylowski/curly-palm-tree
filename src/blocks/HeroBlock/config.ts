import type { Block } from 'payload'

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
    {
      name: 'primaryCtaLabel',
      type: 'text',
      localized: true,
      label: 'Primary CTA label',
      defaultValue: 'Umów wizytę',
      admin: {
        description: 'Label for the booking button. Links to /contact.',
      },
    },
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
