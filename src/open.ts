import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { FileAttributes } from "./util/types/file-attributes";
import { FileMode } from "./util/types/file-permissions";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _open(
  path: fs.PathLike,
  // rename to FileFlag
  flag: FileAttributes,
  mode: FileMode
): TaskEitherNode<FileDescriptor> {
  return taskEither.tryCatch(
    () =>
      new Promise<FileDescriptor>((resolve, reject) => {
        fs.open(path, flag, mode, (e, fd) => (!e ? resolve(fd) : reject(e)));
      }),
    enforceErrnoException
  );
}

export function open(
  flag: FileAttributes,
  mode?: FileMode
): ReaderTaskEitherNode<fs.PathLike, FileDescriptor>;

export function open(
  pathLike: fs.PathLike,
  flag: FileAttributes,
  mode?: FileMode
): TaskEitherNode<FileDescriptor>;

export function open(
  a: FileAttributes | fs.PathLike,
  b?: FileMode | FileAttributes,
  c?: FileMode
) {
  // first overload
  if (b === undefined) {
    const flag = a as FileAttributes;
    const mode = 0o666;
    return (pathLike: fs.PathLike) => _open(pathLike, flag, mode);
  }

  // first overload
  if (c === undefined) {
    const flag = a as FileAttributes;
    const mode = b as FileMode;
    return (pathLike: fs.PathLike) => _open(pathLike, flag, mode);
  }

  // second overload
  const pathLike = a as fs.PathLike;
  const flag = b as FileAttributes;
  const mode = c as FileMode;
  return _open(pathLike, flag, mode);
}
