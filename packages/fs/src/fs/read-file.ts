/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileSystemFlags } from "../util";
import { TaskEither } from "fp-ts/lib/TaskEither";

/**
 * @since 0.0.0
 */
export function readFile<T extends "Buffer" | BufferEncoding = never>(
  encoding: T,
  flag?: FileSystemFlags
) {
  const options = {
    encoding: encoding === "Buffer" ? null : encoding,
    flag,
  };
  return <P extends fs.PathLike | number = never>(
    path: P
  ): TaskEither<NodeJS.ErrnoException, T extends "Buffer" ? Buffer : string> =>
    taskEither.tryCatch(
      () =>
        new Promise((resolve, reject) => {
          fs.readFile(path, options as any, (e, data) =>
            !e
              ? resolve(data as T extends "Buffer" ? Buffer : string)
              : reject(e)
          );
        }),
      enforceErrnoException
    );
}
