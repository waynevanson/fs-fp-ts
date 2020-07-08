/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _ftruncate(
  fileDescriptor: FileDescriptor,
  { length }: TruncateOptions
) {
  return taskEither.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        _fs.ftruncate(fileDescriptor, length, (e) =>
          !e ? resolve() : reject(e)
        );
      }),
    enforceErrnoException
  );
}

export interface TruncateOptions {
  length?: number;
}

export function ftruncate(
  options?: TruncateOptions
): ReaderTaskEitherNode<FileDescriptor>;

export function ftruncate(
  fileDescriptor: FileDescriptor,
  options?: TruncateOptions
): TaskEitherNode;

export function ftruncate(
  a?: FileDescriptor | TruncateOptions,
  b?: TruncateOptions
) {
  // first overload
  if (a === undefined || b === undefined) {
    return (fileDescriptor: FileDescriptor) => _ftruncate(fileDescriptor, {});
  }

  // second overload
  const fileDescriptor = a as FileDescriptor;
  const options = b as TruncateOptions;
  return _ftruncate(fileDescriptor, options);
}
