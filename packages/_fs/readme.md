# fp-ts-node/fs

`fp-ts` bindings for the Node File System API's

Most are covered, but some are left out due to their immutable nature.
We could cover this, but it's not a required feature for `v1.x`

All node bindings that throw are caught and returned as `Right<NodeJS.ErrnoException>`

## Installation

`fp-ts-node` has a peer dependency of `fp-ts`.

```ts
// yarn
yarn add fp-ts-node fp-ts

// npm
npm install fp-ts-node fp-ts
```

## Usage

`fp-ts-node/fs` has he following exports:

```ts
// Standard FS functions
export * from "./fs";

// Same as above but as it's own module
export * as fs from "./fs";

// Methods for File Descriptors only
export * as fd from "./fd";

// Methods that do not dereference symbolic links
export * as ln from "./ln";
```
