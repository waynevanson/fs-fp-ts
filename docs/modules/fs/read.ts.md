---
title: fs/read.ts
nav_order: 30
parent: Modules
---

# read overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [ReadOptions (type alias)](#readoptions-type-alias)
- [read](#read)

---

# ReadOptions (type alias)

**Signature**

```ts
export type ReadOptions = {
  offset: number
  length: number
  position: number | 'current'
}
```

Added in v0.0.0

# read

**Signature**

```ts
export declare function read<O extends ReadOptions>(options: O)
```

Added in v0.0.0
