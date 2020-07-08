import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";
import { TaskEitherNode, ReaderTaskEitherNode } from "./util/types/fp";

export function _link(
  existingPath: fs.PathLike,
  newPath: fs.PathLike
): TaskEitherNode {
  return taskEither.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        fs.link(existingPath, newPath, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
}

export function link(
  existingPath: fs.PathLike,
  newPath: fs.PathLike
): TaskEitherNode;

export function link(
  existingPath: fs.PathLike
): ReaderTaskEitherNode<fs.PathLike>;

/**
 * @summary
 * Creates a hard link between two directories.
 *
 * This means the newPath can be opened and it will take you to the existing path.
 */
export function link(existingPath: fs.PathLike, b?: fs.PathLike) {
  if (b === undefined) {
    return (newPath: fs.PathLike) => _link(existingPath, newPath);
  }

  const newPath = b as fs.PathLike;
  return _link(existingPath, newPath);
}
