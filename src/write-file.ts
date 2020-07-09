import * as fs from "fs";
import { taskEither } from "fp-ts";
import { enforceErrnoException, PathLikeOrFileDescriptor } from "./util";
import { WriteFileOptions } from "./util/options/write-file-options";
import { TaskEitherNode, ReaderTaskEitherNode } from "./util/types/fp";

export type WritableValue = string | NodeJS.ArrayBufferView;

export function _writeFile(
  pathLikeOrFileDescriptor: PathLikeOrFileDescriptor,
  data: WritableValue,
  options: WriteFileOptions
): TaskEitherNode {
  return taskEither.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        fs.writeFile(pathLikeOrFileDescriptor, data, options, (e) =>
          !e ? resolve() : reject(e)
        );
      }),
    enforceErrnoException
  );
}

export function writeFile(
  options?: WriteFileOptions
): (data: WritableValue) => ReaderTaskEitherNode<PathLikeOrFileDescriptor>;

export function writeFile(
  data: WritableValue,
  options?: WriteFileOptions
): ReaderTaskEitherNode<PathLikeOrFileDescriptor>;

export function writeFile(
  pathLikeOrFileDescriptor: PathLikeOrFileDescriptor,
  data: WritableValue,
  options?: WriteFileOptions
): TaskEitherNode;

export function writeFile(
  a?: WriteFileOptions | WritableValue | PathLikeOrFileDescriptor,
  b?: WriteFileOptions | WritableValue,
  c?: WriteFileOptions
) {
  // first overload
  if (a === undefined) {
    const options: WriteFileOptions = {};
    return (data: WritableValue) => (
      pathLikeOrFileDescriptor: PathLikeOrFileDescriptor
    ) => _writeFile(pathLikeOrFileDescriptor, data, options);
  }

  // first overload
  if (b === undefined) {
    const data = a as WritableValue;
    const options: WriteFileOptions = {};
    return (pathLikeOrFileDescriptor: PathLikeOrFileDescriptor) =>
      _writeFile(pathLikeOrFileDescriptor, data, options);
  }

  if (c === undefined) {
    const pathLikeOrFileDescriptor = a as PathLikeOrFileDescriptor;
    const data = b as WritableValue;
    const options: WriteFileOptions = {};

    return _writeFile(pathLikeOrFileDescriptor, data, options);
  }

  const pathLikeOrFileDescriptor = a as PathLikeOrFileDescriptor;
  const data = b as WritableValue;
  const options = c as WriteFileOptions;
  return _writeFile(pathLikeOrFileDescriptor, data, options);
}
