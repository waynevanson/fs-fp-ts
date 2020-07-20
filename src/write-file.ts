import * as fs from "fs";
import { taskEither } from "fp-ts";
import {
  enforceErrnoException,
  PathLikeOrFileDescriptor,
  isOptions,
} from "./util";
import { TaskEitherNode, ReaderTaskEitherNode } from "./util/types/fp";

export type WritableData = string | NodeJS.ArrayBufferView;

export function _writeFile(
  pathLikeOrFileDescriptor: PathLikeOrFileDescriptor,
  data: WritableData,
  options: fs.WriteFileOptions
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
  pathLikeOrFileDescriptor: PathLikeOrFileDescriptor,
  data: WritableData,
  options?: fs.WriteFileOptions
): TaskEitherNode;

export function writeFile(
  data: WritableData,
  options?: fs.WriteFileOptions
): ReaderTaskEitherNode<PathLikeOrFileDescriptor>;

export function writeFile(
  options?: fs.WriteFileOptions
): (data: WritableData) => ReaderTaskEitherNode<PathLikeOrFileDescriptor>;

export function writeFile(
  a?: fs.WriteFileOptions | WritableData | PathLikeOrFileDescriptor,
  b?: fs.WriteFileOptions | WritableData,
  c?: fs.WriteFileOptions
) {
  // first overload
  if (isOptions(a)) {
    const options = a ?? {};
    return (data: WritableData) => (
      pathLikeOrFileDescriptor: PathLikeOrFileDescriptor
    ) => _writeFile(pathLikeOrFileDescriptor, data, options);
  }

  // second overload
  if (isOptions(b)) {
    const data = a as WritableData;
    const options = b ?? {};
    return (pathLikeOrFileDescriptor: PathLikeOrFileDescriptor) =>
      _writeFile(pathLikeOrFileDescriptor, data, options);
  }

  // third overload
  if (isOptions(c)) {
    const pathLikeOrFileDescriptor = a as PathLikeOrFileDescriptor;
    const data = b as WritableData;
    const options: fs.WriteFileOptions = c ?? {};

    return _writeFile(pathLikeOrFileDescriptor, data, options);
  }
}
