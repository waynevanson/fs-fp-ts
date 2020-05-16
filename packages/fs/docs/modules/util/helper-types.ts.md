---
title: util/helper-types.ts
nav_order: 45
parent: Modules
---

# helper-types overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [EnforceNonEmptyArray (type alias)](#enforcenonemptyarray-type-alias)
- [PartialKeys (type alias)](#partialkeys-type-alias)

---

# EnforceNonEmptyArray (type alias)

**Signature**

```ts
export type EnforceNonEmptyArray<T extends Array<any>> = T extends Array<infer U> ? T & { 0: U } : never
```

Added in v0.0.0

# PartialKeys (type alias)

**Signature**

```ts
export type PartialKeys<T extends Record<string, any>> = {
  [P in keyof T]: T extends { [K in P]-?: T[K] } ? never : P
}[keyof T]
```

Added in v0.0.0
