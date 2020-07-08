import { taskEither as TE } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException } from "./util";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _chown(
  pathLike: _fs.PathLike,
  uid: number,
  gid: number
): TaskEitherNode {
  return TE.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.chown(pathLike, uid, gid, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
}

export function chown(
  pathLike: _fs.PathLike,
  uid: number,
  gid: number
): TaskEitherNode;

export function chown(
  uid: number,
  gid: number
): ReaderTaskEitherNode<_fs.PathLike, void>;

/**
 * @summary
 * Changes the owner ship of a file.
 */
export function chown(a: _fs.PathLike | number, b: number, c?: number) {
  if (c === undefined) {
    const uid = a as number;
    const gid = b as number;
    return (pathLike: _fs.PathLike) => _chown(pathLike, uid, gid);
  }

  const pathLike = a as _fs.PathLike;
  const uid = b as number;
  const gid = c as number;
  return _chown(pathLike, uid, gid);
}
