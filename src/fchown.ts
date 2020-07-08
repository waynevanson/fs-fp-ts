import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _fchown(
  pathLike: FileDescriptor,
  uid: number,
  gid: number
): TaskEitherNode {
  return taskEither.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        fs.fchown(pathLike, uid, gid, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
}

export function fchown(
  pathLike: FileDescriptor,
  uid: number,
  gid: number
): TaskEitherNode;

export function fchown(
  uid: number,
  gid: number
): ReaderTaskEitherNode<FileDescriptor, void>;

/**
 * @summary
 * Changes the owner ship of a file.
 */
export function fchown(a: FileDescriptor, b: number, c?: number) {
  if (c === undefined) {
    const uid = a as number;
    const gid = b as number;
    return (fileDescriptor: FileDescriptor) =>
      _fchown(fileDescriptor, uid, gid);
  }

  const fileDescriptor = a as FileDescriptor;
  const uid = b as number;
  const gid = c as number;
  return _fchown(fileDescriptor, uid, gid);
}
