# fs-fp-ts

`fp-ts` bindings for the Node File System API's

Most are covered, but some are left out due to their immutable nature.
We could cover this, but it's not a required feature for `v1.x`

## Goals

- [ ] curried and partially applied implementations
- [ ] provide coverage of all existing node.fs apis
- [ ] additions, similar to fs-extra, to make complicated tasks easier.
- [ ] offer different overloads, such as all in one (standard) and `reader<path>`

## Installation

`fp-ts-node` has a peer dependency of `fp-ts`.

```ts
// yarn
yarn add fs-fp-ts fp-ts

// npm
npm install fs-fp-ts fp-ts
```
