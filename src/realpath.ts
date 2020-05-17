/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";
import { TaskEither } from "fp-ts/lib/TaskEither";

/**
 * @since 0.0.0
 */
export function realpath<T extends "Buffer">(
  type: T
): <P extends fs.PathLike>(
  pathLike: P
) => TaskEither<NodeJS.ErrnoException, Buffer>;

/**
 * @since 0.0.0
 */
export function realpath<T extends BufferEncoding>(
  type: T
): <P extends fs.PathLike>(
  pathLike: P
) => TaskEither<NodeJS.ErrnoException, string>;

/**
 * @since 0.0.0
 */
export function realpath<T extends "Buffer" | BufferEncoding>(type: T) {
  const options = {
    encoding: type === "Buffer" ? null : (type as BufferEncoding),
  };
  return <P extends fs.PathLike>(pathLike: P) =>
    taskEither.tryCatch(
      () =>
        new Promise((resolve, reject) => {
          fs.realpath(pathLike, options, (e, data) =>
            !e ? resolve(data) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
