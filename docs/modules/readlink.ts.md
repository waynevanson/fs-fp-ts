---
title: readlink.ts
nav_order: 28
parent: Modules
---

# readlink overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [readlink](#readlink)

---

# readlink

**Signature**

```ts
export declare function readlink<T extends 'Buffer'>(
  type: T
): <P extends fs.PathLike>(path: P) => TaskEither<NodeJS.ErrnoException, Buffer>
export declare function readlink<T extends BufferEncoding>(
  type: T
): <P extends fs.PathLike>(path: P) => TaskEither<NodeJS.ErrnoException, string>
```

Added in v0.0.0
