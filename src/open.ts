import { taskEither } from "fp-ts";
import * as fs from "fs";
import {
  enforceErrnoException,
  EnforceNonEmptyArray,
  FileDescriptor,
} from "./util";
import { FileAttributes } from "./util/types/file-attributes";
import { FileMode } from "./util/types/file-permissions";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _open(
  path: fs.PathLike,
  // rename to FileFlag
  flags: EnforceNonEmptyArray<FileAttributes[]>,
  mode: FileMode
): TaskEitherNode<FileDescriptor> {
  const f = flags.join("");
  return taskEither.tryCatch(
    () =>
      new Promise<FileDescriptor>((resolve, reject) => {
        fs.open(path, f, mode, (e, fd) => (!e ? resolve(fd) : reject(e)));
      }),
    enforceErrnoException
  );
}

export function open(
  flags: EnforceNonEmptyArray<FileAttributes[]>,
  mode?: FileMode
): ReaderTaskEitherNode<fs.PathLike, FileDescriptor>;

export function open(
  pathLike: fs.PathLike,
  flags: EnforceNonEmptyArray<FileAttributes[]>,
  mode?: FileMode
): TaskEitherNode<FileDescriptor>;

export function open(
  a: EnforceNonEmptyArray<FileAttributes[]> | fs.PathLike,
  b?: FileMode | EnforceNonEmptyArray<FileAttributes[]>,
  c?: FileMode
) {
  // first overload
  if (b === undefined) {
    const flags = a as EnforceNonEmptyArray<FileAttributes[]>;
    const mode = 0o666;
    return (pathLike: fs.PathLike) => _open(pathLike, flags, mode);
  }
  // first overload
  if (c === undefined) {
    const flags = a as EnforceNonEmptyArray<FileAttributes[]>;
    const mode = b as FileMode;
    return (pathLike: fs.PathLike) => _open(pathLike, flags, mode);
  }

  // second overload
  const pathLike = a as fs.PathLike;
  const flags = b as EnforceNonEmptyArray<FileAttributes[]>;
  const mode = c as FileMode;
  return _open(pathLike, flags, mode);
}
