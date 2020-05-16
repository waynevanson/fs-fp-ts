---
title: fs/realpath.ts
nav_order: 33
parent: Modules
---

# realpath overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [realpath](#realpath)

---

# realpath

**Signature**

```ts
export declare function realpath<T extends 'Buffer'>(
  type: T
): <P extends fs.PathLike>(pathLike: P) => TaskEither<NodeJS.ErrnoException, Buffer>
export declare function realpath<T extends BufferEncoding>(
  type: T
): <P extends fs.PathLike>(pathLike: P) => TaskEither<NodeJS.ErrnoException, string>
```

Added in v0.0.0
