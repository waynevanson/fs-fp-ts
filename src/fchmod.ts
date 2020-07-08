import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { FilePermissions } from "./util/types/file-permissions";
import { TaskEitherNode, ReaderTaskEitherNode } from "./util/types/fp";
import { _chown } from "./chown";
import { _chmod } from "./chmod";

export function _fchmod(
  fileDescriptor: FileDescriptor,
  mode: FilePermissions
): TaskEitherNode {
  return taskEither.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        fs.fchmod(fileDescriptor, mode, (e) => {
          !e ? resolve() : reject(e);
        });
      }),
    enforceErrnoException
  );
}

export function fchmod(
  mode: FilePermissions
): ReaderTaskEitherNode<FileDescriptor>;

export function fchmod(
  fileDescriptor: FileDescriptor,
  mode: FilePermissions
): TaskEitherNode;

export function fchmod(
  a: FilePermissions | FileDescriptor,
  b?: FilePermissions
) {
  // first overload
  if (b === undefined) {
    const mode = a as FilePermissions;
    return (fileDescriptor: FileDescriptor) => _fchmod(fileDescriptor, mode);
  }

  // second overload
  const fileDescriptor = a as FileDescriptor;
  const mode = b as FilePermissions;
  return _fchmod(fileDescriptor, mode);
}
