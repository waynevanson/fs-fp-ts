import * as fs from "fs";
import { taskEither } from "fp-ts";
import { enforceErrnoException } from "./util";
import { FilePermissions } from "./util/types/file-permissions";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _chmod(
  pathLike: fs.PathLike,
  permissions: FilePermissions
): TaskEitherNode {
  return taskEither.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        fs.chmod(pathLike, permissions, (e) => {
          !e ? resolve() : reject(e);
        });
      }),
    enforceErrnoException
  );
}

export function chmod(
  permissions?: FilePermissions
): ReaderTaskEitherNode<fs.PathLike>;

export function chmod(
  pathLike: fs.PathLike,
  permissions?: FilePermissions
): TaskEitherNode;

/**
 * @summary
 * Changes the permissions of a file.
 *
 * @param permissions defaults to `0o444`
 */
export function chmod(a?: fs.PathLike | FilePermissions, b?: FilePermissions) {
  // first overload
  if (a === undefined) {
    const permissions: FilePermissions = 0o444;
    return (pathLike: fs.PathLike) => _chmod(pathLike, permissions);
  }

  // first overload
  if (b === undefined) {
    const permissions = a as FilePermissions;
    return (pathLike: fs.PathLike) => _chmod(pathLike, permissions);
  }

  // second overload
  const permissions = b as FilePermissions;
  const pathLike = a as fs.PathLike;
  return _chmod(pathLike, permissions);
}
