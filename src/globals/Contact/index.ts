import type { GlobalConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Contact: GlobalConfig = {
  slug: 'contact',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Clinic Info',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'lat',
          type: 'number',
          required: true,
          defaultValue: 54.4472595,
          admin: {
            description: 'Latitude (e.g. 54.4472595)',
            width: '50%',
          },
        },
        {
          name: 'lng',
          type: 'number',
          required: true,
          defaultValue: 18.5504898,
          admin: {
            description: 'Longitude (e.g. 18.5504898)',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'ul. 23 Marca 32E, 81-820 Sopot',
    },
    {
      name: 'phones',
      type: 'array',
      required: true,
      admin: {
        description: 'One or more phone numbers',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          admin: {
            description: 'e.g. "Reception" / "Rejestracja"',
          },
        },
        {
          name: 'number',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'directionsNotes',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Parking, public transport, or other directions notes',
      },
    },
  ],
}
