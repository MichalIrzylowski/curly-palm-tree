import type { GlobalConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Clinic Info',
  },
  fields: [
    {
      name: 'clinicName',
      type: 'text',
      required: true,
      defaultValue: 'Lecznica Weterynaryjna',
      admin: {
        description: 'Brand name shown in the logo, page titles, and accessibility labels',
      },
    },
    {
      name: 'legalName',
      type: 'text',
      required: true,
      defaultValue: 'Lecznica Weterynaryjna',
      admin: {
        description: 'Legal entity name shown in the footer copyright line',
      },
    },
  ],
}
