import type { GlobalConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const OpeningHours: GlobalConfig = {
  slug: 'opening-hours',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Clinic Info',
  },
  fields: [
    {
      name: 'hours',
      type: 'array',
      required: true,
      admin: {
        description: 'One entry per day of the week',
        components: {
          RowLabel: '@/globals/OpeningHours/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'day',
          type: 'select',
          required: true,
          options: [
            { label: 'Monday / Poniedziałek', value: 'monday' },
            { label: 'Tuesday / Wtorek', value: 'tuesday' },
            { label: 'Wednesday / Środa', value: 'wednesday' },
            { label: 'Thursday / Czwartek', value: 'thursday' },
            { label: 'Friday / Piątek', value: 'friday' },
            { label: 'Saturday / Sobota', value: 'saturday' },
            { label: 'Sunday / Niedziela', value: 'sunday' },
          ],
        },
        {
          name: 'openTime',
          type: 'text',
          admin: {
            description: 'e.g. 08:00',
            condition: (data, siblingData) => !siblingData?.isClosed,
          },
        },
        {
          name: 'closeTime',
          type: 'text',
          admin: {
            description: 'e.g. 18:00',
            condition: (data, siblingData) => !siblingData?.isClosed,
          },
        },
        {
          name: 'isClosed',
          type: 'checkbox',
          defaultValue: false,
          label: 'Closed this day',
        },
        {
          name: 'note',
          type: 'text',
          localized: true,
          admin: {
            description: 'Optional note shown alongside hours (e.g. "Emergency only")',
          },
        },
      ],
    },
  ],
}
