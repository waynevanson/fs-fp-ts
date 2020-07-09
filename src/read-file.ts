import { taskEither as TE } from "fp-ts";
import * as _fs from "fs";
import { MkdTempInput, MkdTempResult } from "./mkdtemp";
import {
  enforceErrnoException,
  FileDescriptor,
  PathLikeOrFileDescriptor,
} from "./util";
import { FileAttributes } from "./util/types/file-attributes";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _read<T extends MkdTempInput>(
  pathLikeOrFileDescriptor: PathLikeOrFileDescriptor,
  type: T,
  // fix name
  flag?: FileAttributes
): TaskEitherNode<MkdTempResult<T>> {
  const encoding = type === "Buffer" ? null : (type as BufferEncoding);
  return TE.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        _fs.readFile(pathLikeOrFileDescriptor, { flag, encoding }, (e, data) =>
          !e ? resolve(data as MkdTempResult<T>) : reject(e)
        );
      }),
    enforceErrnoException
  );
}

export function read<T extends MkdTempInput>(
  type: T,
  flag?: FileAttributes
): ReaderTaskEitherNode<_fs.PathLike | FileDescriptor, MkdTempResult<T>>;

export function read<T extends MkdTempInput>(
  pathLikeOrFileDescriptor: PathLikeOrFileDescriptor,
  type: T,
  flag?: FileAttributes
): TaskEitherNode<MkdTempResult<T>>;

export function read<T extends MkdTempInput>(
  a: T | PathLikeOrFileDescriptor,
  b?: FileAttributes | T,
  c?: FileAttributes
) {
  // first overload
  if (b === undefined) {
    const type = a as T;
    return (pathLikeOrFileDescriptor: PathLikeOrFileDescriptor) =>
      _read(pathLikeOrFileDescriptor, type);
  }

  // first overload
  if (c === undefined) {
    const type = a as T;
    const flag = b as FileAttributes;
    return (pathLikeOrFileDescriptor: PathLikeOrFileDescriptor) =>
      _read(pathLikeOrFileDescriptor, type, flag);
  }

  const pathLikeOrFileDescriptor = a as PathLikeOrFileDescriptor;
  const type = b as T;
  const flag = c as FileAttributes;
  return _read(pathLikeOrFileDescriptor, type, flag);
}
