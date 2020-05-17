---
title: Introduction
permalink: /
nav_order: 1
has_children: false
has_toc: false
---

# fp-ts-fs

The functions in this module reflect functional version of node's `global.fs` module.

These are all async, returning `TaskEither<NodeJS.ErrnoException, T>` where `T` is USUALLY what it returns.
If the function originally returns void, the last useful parameter is used.

I'll be using this all the time, so as others adopt it I'd love to hear your suggestions.
