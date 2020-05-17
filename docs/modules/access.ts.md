---
title: access.ts
nav_order: 1
parent: Modules
---

# access overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [AccessMode (type alias)](#accessmode-type-alias)
- [access](#access)

---

# AccessMode (type alias)

These are the four access modes that can be checked with `fs.exists`

**Signature**

```ts
export type AccessMode = 'visible' | 'readable' | 'writeable' | 'executable'
```

Added in v0.0.0

# access

Use to check the access level of process calling it,
returning a `Right` if it's true, `Left` otherwise.

**Signature**

```ts
export declare function access<U extends AccessMode[]>(...modes: EnforceNonEmptyArray<U>)
```

Added in v0.0.0
