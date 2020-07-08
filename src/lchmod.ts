import { taskEither } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException } from "./util";
import { FileMode } from "./util/types/file-permissions";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _lchmod(
  pathLike: _fs.PathLike,
  mode: FileMode
): TaskEitherNode {
  return taskEither.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.lchmod(pathLike, mode, (e) => {
          !e ? resolve() : reject(e);
        });
      }),
    enforceErrnoException
  );
}

export function lchmod(mode: FileMode): ReaderTaskEitherNode<_fs.PathLike>;

export function lchmod(pathLike: _fs.PathLike, mode: FileMode): TaskEitherNode;

export function lchmod(mode: FileMode): ReaderTaskEitherNode<_fs.PathLike> {}
