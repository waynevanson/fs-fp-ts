---
title: util/util.ts
nav_order: 47
parent: Modules
---

# util overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [enforceErrnoException](#enforceerrnoexception)
- [enforcePartialFields](#enforcepartialfields)

---

# enforceErrnoException

**Signature**

```ts
export declare function enforceErrnoException(e: any)
```

Added in v0.0.0

# enforcePartialFields

**Signature**

```ts
export declare function enforcePartialFields<T extends Record<string, any> = never>(
  fa: (a: T) => Required<Pick<T, PartialKeys<T>>>
)
```

Added in v0.0.0
