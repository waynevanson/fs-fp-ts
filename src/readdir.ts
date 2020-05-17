/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";
import { TaskEither } from "fp-ts/lib/TaskEither";

function transformTypeToOptions(type: BufferEncoding | "Buffer" | "Dirent") {
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

/**
 * @since 0.0.0
 */
export function readdir<T extends "Buffer">(
  type: T
): <P extends fs.PathLike>(
  path: P
) => TaskEither<NodeJS.ErrnoException, Buffer[]>;

export function readdir<T extends "Dirent">(
  type: T
): <P extends fs.PathLike>(
  path: P
) => TaskEither<NodeJS.ErrnoException, fs.Dirent[]>;

export function readdir<T extends BufferEncoding>(
  type: T
): <P extends fs.PathLike>(
  path: P
) => TaskEither<NodeJS.ErrnoException, string[]>;

export function readdir<T extends BufferEncoding | "Buffer" | "Dirent">(
  type: T
) {
  const options = transformTypeToOptions(type);
  return <P extends fs.PathLike>(path: P) =>
    taskEither.tryCatch(
      () =>
        new Promise((resolve, reject) => {
          fs.readdir(path, options as any, (e, strings) =>
            !e ? resolve(strings) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
