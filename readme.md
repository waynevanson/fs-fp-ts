# fs-fp-ts

`fp-ts` bindings for the Node File System API's

Most are covered, but some are left out due to their immutable nature.
We could cover this, but it's not a required feature for `v1.x`

## Feedback

This is in early stages and not complete yet, almost usable.

If there are any changes you want to see, even if small, please raise an issue.

## Goals

- [ ] All existing `fs` API's but functional.
- [ ] Clearer documentation.
- [ ] Partially applied functions sensibly implemented.
- [ ] Reader implementations with File Descriptor and PathLike.

## Installation

`fp-ts-node` has a peer dependency of `fp-ts`.

```ts
// yarn
yarn add fs-fp-ts fp-ts

// npm
npm install fs-fp-ts fp-ts
```

## Excluded

Any node stream API has been left out.

- read
- opendir
