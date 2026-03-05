import type { Block } from 'payload'

export const WhyUsBlock: Block = {
  slug: 'whyUsBlock',
  interfaceName: 'WhyUsBlock',
  labels: {
    singular: 'Why Us',
    plural: 'Why Us',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Dlaczego my?',
      label: 'Section heading',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Value propositions',
      minRows: 3,
      maxRows: 3,
      defaultValue: [
        {
          icon: 'microscope',
          heading: 'Nowoczesny sprzęt diagnostyczny',
          description: 'Dysponujemy zaawansowanym sprzętem do szybkiej i dokładnej diagnozy Twojego zwierzęcia.',
        },
        {
          icon: 'users',
          heading: 'Doświadczony zespół specjalistów',
          description: 'Nasi lekarze weterynarii mają wieloletnie doświadczenie w kompleksowej opiece nad zwierzętami.',
        },
        {
          icon: 'paw-print',
          heading: 'Psy, koty i małe zwierzęta',
          description: 'Zapewniamy profesjonalną opiekę dla psów, kotów i wszelkich małych zwierząt domowych.',
        },
      ],
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon name (Lucide)',
          admin: {
            description: 'Lucide icon name, e.g. microscope, users, paw-print',
          },
        },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          label: 'Heading',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
          label: 'Description',
          admin: {
            description: 'Keep to ≤ 30 words.',
          },
        },
      ],
    },
  ],
}
