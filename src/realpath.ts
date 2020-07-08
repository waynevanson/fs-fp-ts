import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";
import { TaskEither } from "fp-ts/lib/TaskEither";

export function realpath<T extends "Buffer">(
  type: T
): <P extends fs.PathLike>(
  pathLike: P
) => TaskEither<NodeJS.ErrnoException, Buffer>;

export function realpath<T extends BufferEncoding>(
  type: T
): <P extends fs.PathLike>(
  pathLike: P
) => TaskEither<NodeJS.ErrnoException, string>;

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
