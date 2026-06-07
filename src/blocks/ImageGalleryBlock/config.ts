import type { Block } from 'payload'

export const ImageGalleryBlock: Block = {
  slug: 'imageGalleryBlock',
  interfaceName: 'ImageGalleryBlock',
  labels: {
    singular: 'Galeria zdjęć',
    plural: 'Galerie zdjęć',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: 'Nagłówek sekcji',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Zdjęcia',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
