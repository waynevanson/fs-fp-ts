---
title: rmdir.ts
nav_order: 31
parent: Modules
---

# rmdir overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [RmdirOptions (type alias)](#rmdiroptions-type-alias)
- [rmdir](#rmdir)

---

# RmdirOptions (type alias)

**Signature**

```ts
export type RmdirOptions = { recursive: false } | { recursive: true; maxRetries?: number; retryDelay?: number }
```

Added in v0.0.0

# rmdir

**Signature**

```ts
export declare function rmdir(options: RmdirOptions)
```

Added in v0.0.0
