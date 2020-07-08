import * as _fs from "fs";
import { taskEither as TE } from "fp-ts";
import { enforceErrnoException } from "./util";
import { FileMode } from "./util/types/file-permissions";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _chmod(
  pathLike: _fs.PathLike,
  permissions: FileMode
): TaskEitherNode {
  return TE.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.chmod(pathLike, permissions, (e) => {
          !e ? resolve() : reject(e);
        });
      }),
    enforceErrnoException
  );
}

export function chmod(mode?: FileMode): ReaderTaskEitherNode<_fs.PathLike>;

export function chmod(pathLike: _fs.PathLike, mode?: FileMode): TaskEitherNode;

/**
 * @summary
 * Changes the permissions of a file.
 *
 * @param permissions defaults to `0o444`
 */
export function chmod(a?: _fs.PathLike | FileMode, b?: FileMode) {
  // first overload
  if (a === undefined) {
    const mode: FileMode = 0o444;
    return (pathLike: _fs.PathLike) => _chmod(pathLike, mode);
  }

  // first overload
  if (b === undefined) {
    const mode = a as FileMode;
    return (pathLike: _fs.PathLike) => _chmod(pathLike, mode);
  }

  // second overload
  const pathLike = a as _fs.PathLike;
  const mode = b as FileMode;
  return _chmod(pathLike, mode);
}
