# TASK-02 — EquipmentHighlightBlock layout block

Type: block
PRD ref: T-03 (Should-have — Equipment highlight block for homepage)
Depends on: TASK-01 (EquipmentCard component)
Status: [ ] Todo

## Context

Create the `EquipmentHighlightBlock` layout builder block. This is a Should-have block for the homepage "Modern equipment" section. It auto-fetches the first 3–4 equipment entries sorted by `order` ascending and renders them using `EquipmentCard`. A "Cały sprzęt" / "See all equipment" CTA links to `/equipment`. The block has one optional configurable heading field.

## Steps

### 1. Create the block config

Create `src/blocks/EquipmentHighlightBlock/config.ts`:

```ts
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
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 4,
      label: 'Liczba pozycji',
      admin: {
        description: 'Ile pozycji wyświetlić (1–4).',
      },
    },
  ],
}
```

### 2. Create the block component

Create `src/blocks/EquipmentHighlightBlock/Component.tsx`:

```tsx
import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { ArrowRight } from 'lucide-react'

import type { EquipmentHighlightBlock as EquipmentHighlightBlockProps } from '@/payload-types'

import { EquipmentCard } from '@/components/EquipmentCard'
import { SectionWrapper } from '@/components/SectionWrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const EquipmentHighlightBlockComponent: React.FC<EquipmentHighlightBlockProps> = async ({
  heading,
  limit,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'equipment',
    limit: limit ?? 3,
    sort: 'order',
    depth: 1,
  })

  if (!docs.length) return null

  return (
    <SectionWrapper>
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3 text-xs font-medium uppercase tracking-wider">
            Wyposażenie
          </Badge>
          {heading && (
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {heading}
            </h2>
          )}
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0 gap-1.5">
          <Link href="/equipment">
            Cały sprzęt
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((item) => (
          <EquipmentCard key={item.id} item={item} />
        ))}
      </div>
    </SectionWrapper>
  )
}
```

### 3. Register the block in Pages collection

Open `src/collections/Pages/index.ts`.

Add the import at the top alongside other block imports:
```ts
import { EquipmentHighlightBlock } from '../../blocks/EquipmentHighlightBlock/config'
```

Add `EquipmentHighlightBlock` to the `blocks` array inside the `layout` field (after `WhyUsBlock` is a natural place):
```ts
blocks: [
  HeroBlock,
  QuickInfoBlock,
  ServicesHighlightsBlock,
  ServiceGridBlock,
  TeamGridBlock,
  TeamTeaserBlock,
  WhyUsBlock,
  EquipmentHighlightBlock,   // ← add here
  MapBlock,
  CallToAction,
  Content,
  MediaBlock,
  Archive,
  FormBlock,
],
```

### 4. Register the component in RenderBlocks

Open `src/blocks/RenderBlocks.tsx`.

Add the import:
```ts
import { EquipmentHighlightBlockComponent } from '@/blocks/EquipmentHighlightBlock/Component'
```

Add the entry to `blockComponents`:
```ts
equipmentHighlightBlock: EquipmentHighlightBlockComponent,
```

### 5. Regenerate types and verify

Run `pnpm generate:types` to add `EquipmentHighlightBlock` interface to `src/payload-types.ts`.

Run `pnpm exec tsc --noEmit` and fix any type errors.

## Files

- **Create:** `src/blocks/EquipmentHighlightBlock/config.ts`
- **Create:** `src/blocks/EquipmentHighlightBlock/Component.tsx`
- **Modify:** `src/collections/Pages/index.ts` — add import + add block to `layout.blocks` array
- **Modify:** `src/blocks/RenderBlocks.tsx` — add import + add `equipmentHighlightBlock` entry

## Done when

- [ ] `EquipmentHighlightBlock` appears in the Pages admin layout builder block picker.
- [ ] Adding the block to a page and setting a heading shows 3 equipment cards (sorted by `order`) when the page is rendered.
- [ ] The "Cały sprzęt" button links to `/equipment`.
- [ ] Returning zero equipment entries causes the block to render nothing (no empty section).
- [ ] `pnpm exec tsc --noEmit` passes with no errors.
- [ ] `pnpm generate:types` has been run and `src/payload-types.ts` contains the `EquipmentHighlightBlock` interface.
