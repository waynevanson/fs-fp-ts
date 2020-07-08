import { taskEither } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException } from "./util";
import { TaskEitherNode, ReaderTaskEitherNode } from "./util/types/fp";

export function _link(
  existingPath: _fs.PathLike,
  newPath: _fs.PathLike
): TaskEitherNode {
  return taskEither.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        _fs.link(existingPath, newPath, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
}

export function link(
  existingPath: _fs.PathLike,
  newPath: _fs.PathLike
): TaskEitherNode;

export function link(
  existingPath: _fs.PathLike
): ReaderTaskEitherNode<_fs.PathLike>;

/**
 * @summary
 * Creates a hard link between two directories.
 *
 * This means the newPath can be opened and it will take you to the existing path.
 */
export function link(existingPath: _fs.PathLike, b?: _fs.PathLike) {
  if (b === undefined) {
    return (newPath: _fs.PathLike) => _link(existingPath, newPath);
  }

  const newPath = b as _fs.PathLike;
  return _link(existingPath, newPath);
}
