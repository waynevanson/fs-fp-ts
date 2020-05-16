---
title: fs/access.ts
nav_order: 5
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

**Signature**

```ts
export type AccessMode = 'visible' | 'readable' | 'writeable' | 'executable'
```

Added in v0.0.0

# access

**Signature**

```ts
export declare function access<U extends AccessMode[]>(...modes: EnforceNonEmptyArray<U>)
```

Added in v0.0.0
