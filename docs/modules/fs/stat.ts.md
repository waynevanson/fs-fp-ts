---
title: fs/stat.ts
nav_order: 36
parent: Modules
---

# stat overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [stat](#stat)

---

# stat

**Signature**

```ts
export declare function stat<T extends 'BigIntStats'>(
  type: T
): <P extends fs.PathLike>(pathLike: P) => TaskEither<NodeJS.ErrnoException, fs.BigIntStats>
export declare function stat<T extends 'Stats'>(
  type: T
): <P extends fs.PathLike>(pathLike: P) => TaskEither<NodeJS.ErrnoException, fs.Stats>
```

Added in v0.0.0
