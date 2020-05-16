/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileSystemFlags } from "../util";

/**
 * @since 0.0.0
 */
export function open<F extends FileSystemFlags, M extends number>(
  flags: F,
  mode: M
) {
  return <P extends fs.PathLike>(path: P) =>
    taskEither.tryCatch(
      () =>
        new Promise<number>((resolve, reject) => {
          fs.open(path, flags, mode, (e, fd) => (!e ? resolve(fd) : reject(e)));
        }),
      enforceErrnoException
    );
}
