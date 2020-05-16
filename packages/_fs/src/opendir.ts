/**
 * @since 0.0.0
 */
import * as fs from "fs";
import { taskEither } from "fp-ts";
import { enforceErrnoException } from "./util";

/**
 * @since 0.0.0
 */
export function opendir<O extends fs.OpenDirOptions>(options: O) {
  return (path: string) =>
    taskEither.tryCatch(
      () =>
        new Promise((resolve, reject) => {
          fs.opendir(path, options, (e, dir) =>
            !e ? resolve(dir) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
