# TASK-01 — EquipmentCard component

Type: component
PRD ref: T-05 (Equipment card)
Depends on: — (collection + types already generated)
Status: [ ] Todo

## Context

Create a reusable `EquipmentCard` React Server Component that renders a single equipment entry: photo, name, and optional description. The card is shared between the `/equipment` page (built separately by the developer) and the `EquipmentHighlightBlock` (TASK-02). Because it is used in two distinct locations, it lives in `src/components/EquipmentCard/`.

## Steps

1. Create `src/components/EquipmentCard/index.tsx`.

2. Import types and components at the top:
   ```ts
   import type { Equipment, Media } from '@/payload-types'
   import Image from 'next/image'
   import RichText from '@/components/RichText'
   import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
   ```
   `Card`, `CardHeader`, `CardTitle`, and `CardContent` are already installed at `src/components/ui/card.tsx` — no `pnpm dlx shadcn` needed.

3. Define and export the component props type:
   ```ts
   type Props = {
     item: Equipment
   }
   ```

4. Inside the component, resolve the photo — `item.photo` is either a populated `Media` object or a numeric ID after depth=1 queries. Cast it: `const photo = item.photo as Media`.

5. Render the card structure using shadcn primitives:
   ```tsx
   <Card className="overflow-hidden rounded-xl border-border/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
     {/* Photo — sits outside CardHeader/CardContent, above the card chrome */}
     <div className="relative aspect-video w-full overflow-hidden bg-muted">
       <Image
         src={photo.url ?? ''}
         alt={item.name as string}
         fill
         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
         className="object-cover"
         loading="lazy"
       />
     </div>

     <CardHeader className="pb-2">
       <CardTitle className="font-heading text-base font-semibold leading-snug text-primary">
         {item.name as string}
       </CardTitle>
     </CardHeader>

     {item.description && (
       <CardContent>
         <RichText
           data={item.description}
           enableGutter={false}
           enableProse={false}
           className="text-sm leading-relaxed text-foreground/75"
         />
       </CardContent>
     )}
   </Card>
   ```
   Note: `CardContent` wrapping the description is omitted entirely when `item.description` is falsy — no empty DOM node is rendered.

6. Do NOT add `'use client'` — this is a Server Component.

7. Run `pnpm exec tsc --noEmit` and fix any type errors before marking done.

## Files

- **Create:** `src/components/EquipmentCard/index.tsx`

## Done when

- [ ] `src/components/EquipmentCard/index.tsx` exists and exports `EquipmentCard`.
- [ ] Photo renders with `next/image`, `fill`, `loading="lazy"`, and a non-empty `alt`.
- [ ] Description block is absent when `item.description` is null or undefined (no empty DOM node rendered).
- [ ] No `any` types — props are typed via `Equipment` from `@/payload-types`.
- [ ] `pnpm exec tsc --noEmit` passes with no errors.
