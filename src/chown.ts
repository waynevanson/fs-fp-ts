import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";
import { FilePermissions } from "./util/types/file-permissions";
import { ReaderTaskEitherNode } from "./util/types/fp";

/**
 * @summary
 * Changes the owner ship of a file.
 */
export function chown(
  uid: FilePermissions,
  gid: FilePermissions
): ReaderTaskEitherNode<fs.PathLike, void> {
  return (path) =>
    taskEither.tryCatch(
      () =>
        new Promise<void>((resolve, reject) => {
          fs.chown(path, uid, gid, (e) => (!e ? resolve() : reject(e)));
        }),
      enforceErrnoException
    );
}
