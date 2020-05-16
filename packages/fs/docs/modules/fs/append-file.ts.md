---
title: fs/append-file.ts
nav_order: 6
parent: Modules
---

# append-file overview

Added in v0.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [AppendFileOptions (type alias)](#appendfileoptions-type-alias)
- [appendFile](#appendfile)

---

# AppendFileOptions (type alias)

**Signature**

```ts
export type AppendFileOptions = {
  encoding?: BufferEncoding
  flags?: FileSystemFlags
  mode?: Permissions
}
```

Added in v0.0.0

# appendFile

**Signature**

```ts
export declare function appendFile<O extends AppendFileOptions>(options: O)
```

Added in v0.0.0
