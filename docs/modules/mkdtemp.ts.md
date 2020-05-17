---
title: mkdtemp.ts
nav_order: 22
parent: Modules
---

# mkdtemp overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [mkdtemp](#mkdtemp)

---

# mkdtemp

**Signature**

```ts
export declare function mkdtemp<O extends 'buffer'>(
  options: O
): (prefix: string) => TaskEither<NodeJS.ErrnoException, Buffer>
export declare function mkdtemp<O extends BufferEncoding>(
  options: O
): (prefix: string) => TaskEither<NodeJS.ErrnoException, string>
```

Added in v0.0.0
