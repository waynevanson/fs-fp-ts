import { taskEither as TE } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _lchown(
  pathLike: _fs.PathLike,
  uid: number,
  gid: number
): TaskEitherNode {
  return TE.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.lchown(pathLike, uid, gid, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
}

export function lchown(
  pathLike: _fs.PathLike,
  uid: number,
  gid: number
): TaskEitherNode;

export function lchown(
  uid: number,
  gid: number
): ReaderTaskEitherNode<_fs.PathLike, void>;

/**
 * @summary
 * Changes the owner ship of a file.
 */
export function lchown(a: _fs.PathLike | number, b: number, c?: number) {
  if (c === undefined) {
    const uid = a as number;
    const gid = b as number;
    return (fileDescriptor: _fs.PathLike) => _lchown(fileDescriptor, uid, gid);
  }

  const fileDescriptor = a as _fs.PathLike;
  const uid = b as number;
  const gid = c as number;
  return _lchown(fileDescriptor, uid, gid);
}
