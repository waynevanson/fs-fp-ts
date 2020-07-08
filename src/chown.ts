import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _chown(
  pathLike: fs.PathLike,
  uid: number,
  gid: number
): TaskEitherNode {
  return taskEither.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        fs.chown(pathLike, uid, gid, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
}

export function chown(
  pathLike: fs.PathLike,
  uid: number,
  gid: number
): TaskEitherNode;

export function chown(
  uid: number,
  gid: number
): ReaderTaskEitherNode<fs.PathLike, void>;

/**
 * @summary
 * Changes the owner ship of a file.
 */
export function chown(a: fs.PathLike | number, b: number, c?: number) {
  if (c === undefined) {
    const uid = a as number;
    const gid = b as number;
    return (pathLike: fs.PathLike) => _chown(pathLike, uid, gid);
  }

  const pathLike = a as fs.PathLike;
  const uid = b as number;
  const gid = c as number;
  return _chown(pathLike, uid, gid);
}
