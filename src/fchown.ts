import { taskEither as TE } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _fchown(
  fileDescriptor: FileDescriptor,
  uid: number,
  gid: number
): TaskEitherNode {
  return TE.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.fchown(fileDescriptor, uid, gid, (e) =>
          !e ? resolve() : reject(e)
        );
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
export function fchown(a: FileDescriptor | number, b: number, c?: number) {
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
