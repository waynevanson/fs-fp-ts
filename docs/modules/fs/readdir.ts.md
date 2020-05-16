---
title: fs/readdir.ts
nav_order: 31
parent: Modules
---

# readdir overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [readdir](#readdir)

---

# readdir

**Signature**

```ts
export declare function readdir<T extends 'Buffer'>(
  type: T
): <P extends fs.PathLike>(path: P) => TaskEither<NodeJS.ErrnoException, Buffer[]>
export declare function readdir<T extends 'Dirent'>(
  type: T
): <P extends fs.PathLike>(path: P) => TaskEither<NodeJS.ErrnoException, fs.Dirent[]>
export declare function readdir<T extends BufferEncoding>(
  type: T
): <P extends fs.PathLike>(path: P) => TaskEither<NodeJS.ErrnoException, string[]>
```

Added in v0.0.0
