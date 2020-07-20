import { taskEither as TE } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";
import { WriteFileOptions } from "./util/types/options";

export function _appendFile(
  pathLikeOrFileDescriptor: _fs.PathLike | FileDescriptor,
  data: string | Uint8Array,
  options: WriteFileOptions
): TaskEitherNode {
  return TE.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.appendFile(pathLikeOrFileDescriptor, data, options, (e) => {
          !e ? resolve() : reject(e);
        });
      }),
    enforceErrnoException
  );
}

export function appendFile(
  options?: WriteFileOptions
): (
  data: string | Uint8Array
) => ReaderTaskEitherNode<_fs.PathLike | FileDescriptor>;

export function appendFile(
  data: string | Uint8Array,
  options?: WriteFileOptions
): ReaderTaskEitherNode<_fs.PathLike | FileDescriptor>;

export function appendFile(
  pathLikeOrFileDescriptor: _fs.PathLike | FileDescriptor,
  data: string | Uint8Array,
  options?: WriteFileOptions
): TaskEitherNode;

/**
 * @summary
 * Append some data to the end of a file.
 */
export function appendFile(
  a?: _fs.PathLike | FileDescriptor | string | Uint8Array | WriteFileOptions,
  b?: string | Uint8Array | WriteFileOptions,
  c?: WriteFileOptions
) {
  // first overload
  if (a === undefined) {
    return (data: string | Uint8Array) => (
      pathLikeOrFileDescriptor: _fs.PathLike | FileDescriptor
    ) => _appendFile(pathLikeOrFileDescriptor, data, {});
  }

  // first overload
  if (b === undefined) {
    return (data: string | Uint8Array) => (
      pathLikeOrFileDescriptor: _fs.PathLike | FileDescriptor
    ) => _appendFile(pathLikeOrFileDescriptor, data, a as WriteFileOptions);
  }

  // second overload
  if (c === undefined) {
    const data = b as string | Uint8Array;
    return (pathLikeOrFileDescriptor: _fs.PathLike | FileDescriptor) =>
      _appendFile(pathLikeOrFileDescriptor, data, a as WriteFileOptions);
  }

  // third overload
  const data = b as string | Uint8Array;
  const options = c as WriteFileOptions;
  const pathLikeOrFileDescriptor = a as _fs.PathLike | FileDescriptor;

  return _appendFile(pathLikeOrFileDescriptor, data, options);
}
