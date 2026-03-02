Create a Payload CMS plugin based on the user's description. Follow the architecture patterns below exactly.

## Plugin Architecture: Double Arrow (Currying) Pattern

Every Payload plugin is a function that accepts user config options and returns a function that accepts and returns the Payload config:

```ts
import type { Config } from 'payload'

type MyPluginOptions = {
  enabled?: boolean
  collections?: string[]
  // ... your plugin's options
}

export const myPlugin =
  (options: MyPluginOptions) =>
  (config: Config): Config => {
    if (options.enabled === false) {
      // Schema changes are permanent — only disable behavior, not fields
      return config
    }

    return {
      ...config,
      // spread everything and only override what you need
    }
  }
```

## Adding Fields to Existing Collections

```ts
export const myPlugin =
  (options: MyPluginOptions) =>
  (config: Config): Config => {
    const collections = (config.collections ?? []).map((collection) => {
      // Only inject into targeted collections
      if (!options.collections?.includes(collection.slug)) return collection

      return {
        ...collection,
        fields: [
          ...collection.fields,
          {
            name: 'myPluginField',
            type: 'text',
            admin: { readOnly: true },
            // Allow user to override defaults
            ...options.fieldOverrides,
          },
        ],
      }
    })

    return { ...config, collections }
  }
```

## Adding a New Collection

```ts
import type { CollectionConfig } from 'payload'

const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  admin: { hidden: true },
  access: { read: authenticated, create: authenticated },
  fields: [
    { name: 'action', type: 'text', required: true },
    { name: 'user', type: 'relationship', relationTo: 'users' },
    { name: 'document', type: 'text' },
    { name: 'timestamp', type: 'date', required: true },
  ],
}

export const myPlugin =
  (options: MyPluginOptions) =>
  (config: Config): Config => ({
    ...config,
    collections: [...(config.collections ?? []), AuditLogs],
  })
```

## Composing Hooks (Never Overwrite Existing Hooks)

```ts
collections.map((collection) => ({
  ...collection,
  hooks: {
    // WRONG: overwrites existing hooks
    // afterChange: [myHook]

    // CORRECT: compose with existing
    afterChange: [...(collection.hooks?.afterChange ?? []), myAfterChangeHook],
    beforeDelete: [...(collection.hooks?.beforeDelete ?? []), myBeforeDeleteHook],
  },
}))
```

## Adding Root-Level Endpoints

```ts
import type { Endpoint } from 'payload'

const myEndpoint: Endpoint = {
  path: '/my-plugin/webhook',
  method: 'post',
  handler: async (req) => {
    // ...
    return Response.json({ ok: true })
  },
}

return {
  ...config,
  endpoints: [...(config.endpoints ?? []), myEndpoint],
}
```

## Adding Admin Components

```ts
return {
  ...config,
  admin: {
    ...config.admin,
    components: {
      ...config.admin?.components,
      afterNavLinks: [
        ...(config.admin?.components?.afterNavLinks ?? []),
        '/path/to/my-plugin/components/NavItem#NavItem',
      ],
    },
  },
}
```

## onInit Hook (Plugin Initialization)

```ts
return {
  ...config,
  onInit: async (payload) => {
    // Preserve existing onInit
    if (config.onInit) await config.onInit(payload)
    // Plugin initialization (e.g., seed data, connect to service)
    await initMyService(payload)
  },
}
```

## Key Rules

1. Always use the double-arrow currying pattern
2. Always spread `...config`, `...collection`, `...field` — never replace wholesale
3. Compose hooks: `[...(existing.hooks?.afterChange ?? []), newHook]`
4. When `enabled: false`, return unchanged config — schema changes are permanent anyway
5. Allow users to override plugin field defaults via an options param (e.g., `fieldOverrides`)
6. Never import from the host app — plugins must be self-contained
7. Export TypeScript types for plugin options

---

Now implement the plugin the user described. Clarify the plugin's purpose, which collections it targets, what fields/hooks it adds, and what options users should be able to configure.
