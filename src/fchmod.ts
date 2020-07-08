import { taskEither as TE } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { FileMode } from "./util/types/file-permissions";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _fchmod(
  fileDescriptor: FileDescriptor,
  mode: FileMode
): TaskEitherNode {
  return TE.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.fchmod(fileDescriptor, mode, (e) => {
          !e ? resolve() : reject(e);
        });
      }),
    enforceErrnoException
  );
}

export function fchmod(mode: FileMode): ReaderTaskEitherNode<FileDescriptor>;

export function fchmod(
  fileDescriptor: FileDescriptor,
  mode: FileMode
): TaskEitherNode;

export function fchmod(a: FileMode | FileDescriptor, b?: FileMode) {
  // first overload
  if (b === undefined) {
    const mode = a as FileMode;
    return (fileDescriptor: FileDescriptor) => _fchmod(fileDescriptor, mode);
  }

  // second overload
  const fileDescriptor = a as FileDescriptor;
  const mode = b as FileMode;
  return _fchmod(fileDescriptor, mode);
}
