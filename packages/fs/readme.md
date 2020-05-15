# fp-ts-node/fs

`fp-ts` bindings for the Node File System API's

Most are covered, but some are left out due to their immutable nature.
We could cover this, but it's not a required feature for `v1.x`

All node bindings that throw are caught and returned as `Right<NodeJS.ErrnoException>`
