/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import { TaskEither } from "fp-ts/lib/TaskEither";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

/**
 * @since 0.0.0
 */
export function readlink<T extends "Buffer">(
  type: T
): <P extends fs.PathLike>(
  path: P
) => TaskEither<NodeJS.ErrnoException, Buffer>;

/**
 * @since 0.0.0
 */
export function readlink<T extends BufferEncoding>(
  type: T
): <P extends fs.PathLike>(
  path: P
) => TaskEither<NodeJS.ErrnoException, string>;

/**
 * @since 0.0.0
 */
export function readlink<T extends "Buffer" | BufferEncoding>(type: T) {
  const options = { encoding: type === "Buffer" ? null : type } as {
    encoding: BufferEncoding | null;
  };

  return <P extends fs.PathLike>(path: P) =>
    taskEither.tryCatch(
      () =>
        new Promise<any>((resolve, reject) => {
          fs.readlink(path, options, (e, string) =>
            !e ? resolve(string) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
