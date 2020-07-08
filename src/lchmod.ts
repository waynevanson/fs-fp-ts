import { taskEither } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException } from "./util";
import { FilePermissions } from "./util/types/file-permissions";
import { ReaderTaskEitherNode } from "./util/types/fp";

export function lchmod(
  permissions: FilePermissions
): ReaderTaskEitherNode<_fs.PathLike> {
  return (pathLike) =>
    taskEither.tryCatch(
      () =>
        new Promise<void>((resolve, reject) => {
          _fs.lchmod(pathLike, permissions, (e) => {
            !e ? resolve() : reject(e);
          });
        }),
      enforceErrnoException
    );
}
