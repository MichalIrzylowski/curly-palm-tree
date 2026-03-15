# TASK-02 — Apply `IconPickerField` to `Services.icon` and `WhyUsBlock.items[].icon`

| Field | Value |
|-------|-------|
| Type | config |
| PRD ref | Must: applied to `Services.icon`; Must: applied to `WhyUsBlock.items[].icon` |
| Depends on | TASK-01 |
| Status | [ ] Todo |

## Context

Wires the `IconPickerField` component into the two existing icon fields. No schema or data migration is needed — both fields remain `type: 'text'` and store the same string value. Only the `admin.components.Field` entry is added.

## Steps

1. Open `src/collections/Services/index.ts`. Locate the `icon` field (currently `type: 'text'`). Add `admin.components.Field`:
   ```ts
   {
     name: 'icon',
     type: 'text',
     admin: {
       components: {
         Field: '@/components/IconPickerField#IconPickerField',
       },
     },
   },
   ```
   Remove the existing `admin.description` string — the picker makes it redundant.

2. Open `src/blocks/WhyUsBlock/config.ts`. Locate the `icon` field inside the `items` array's `fields` array. Add `admin.components.Field` in the same way:
   ```ts
   {
     name: 'icon',
     type: 'text',
     label: 'Icon name (Lucide)',
     admin: {
       components: {
         Field: '@/components/IconPickerField#IconPickerField',
       },
     },
   },
   ```
   Remove the existing `admin.description` string.

3. Run `pnpm generate:importmap` to ensure the admin bundle picks up the component reference from both locations.

4. Run `pnpm exec tsc --noEmit` and fix any type errors.

## Files

- **Modify:** `src/collections/Services/index.ts`
- **Modify:** `src/blocks/WhyUsBlock/config.ts`

## Done when

- [ ] Opening a `services` document in the admin shows the icon picker for the `icon` field, not a text input.
- [ ] Opening a page with a `WhyUsBlock` in the admin shows the icon picker for each `items[].icon` field.
- [ ] Selecting an icon in either location saves the kebab-case icon name string to the database (verify in the Payload API response or admin list view).
- [ ] `pnpm exec tsc --noEmit` exits with no errors.
