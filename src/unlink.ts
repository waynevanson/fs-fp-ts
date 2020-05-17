/**
 * @since 0.0.0
 */
import * as fs from "fs";
import { taskEither } from "fp-ts";
import { enforceErrnoException } from "./util";

/**
 * @since 0.0.0
 */
export function unlink<P extends fs.PathLike>(path: P) {
  return taskEither.tryCatch(
    () =>
      new Promise<P>((resolve, reject) => {
        fs.unlink(path, (e) => (!e ? resolve(path) : reject(e)));
      }),
    enforceErrnoException
  );
}
