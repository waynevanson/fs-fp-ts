import { taskEither as TE } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException } from "./util";
import { TaskEitherNode, ReaderTaskEitherNode } from "./util/types/fp";

export function _readdir<T extends ReadDirInput>(
  pathLike: _fs.PathLike,
  type: T
): TaskEitherNode<ReadDirResult<T>> {
  const options = transformTypeToOptions(type);
  return TE.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        _fs.readdir(pathLike, options as any, (e, outputs: any) =>
          !e ? resolve(outputs) : reject(e)
        );
      }),
    enforceErrnoException
  );
}

export function transformTypeToOptions(type: ReadDirInput) {
  switch (type) {
    case "Buffer": {
      return { encoding: null, withFileTypes: false };
    }
    case "Dirent": {
      return { encoding: null, withFileTypes: true };
    }
    default: {
      return { encoding: type, withFileTypes: false };
    }
  }
}

export type ReadDirInput = BufferEncoding | "Buffer" | "Dirent";

export type ReadDirResult<T extends ReadDirInput> = T extends "Buffer"
  ? Buffer
  : T extends "Dirent"
  ? _fs.Dirent
  : string;

export function readdir<T extends ReadDirInput>(
  type: T
): ReaderTaskEitherNode<_fs.PathLike, ReadDirResult<T>>;

export function readdir<T extends ReadDirInput>(
  path: _fs.PathLike,
  type: T
): TaskEitherNode<ReadDirResult<T>>;

export function readdir<T extends ReadDirInput>(a: T | _fs.PathLike, b?: T) {
  if (b === undefined) {
    const type = a as T;
    return (pathLike: _fs.PathLike) => _readdir(pathLike, type);
  }

  const pathLike = a as _fs.PathLike;
  const type = b as T;
  return _readdir(pathLike, type);
}
