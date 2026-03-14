import type { Block } from 'payload'

export const EquipmentHighlightBlock: Block = {
  slug: 'equipmentHighlightBlock',
  interfaceName: 'EquipmentHighlightBlock',
  labels: {
    singular: 'Wyposażenie — wyróżnienie',
    plural: 'Wyposażenie — wyróżnienie',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Nowoczesny sprzęt',
      label: 'Nagłówek sekcji',
    },
  ],
}
