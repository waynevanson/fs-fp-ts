/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, Time } from "./util";

/**
 * @since 0.0.0
 */
export function utimes<A extends Time, M extends Time>(atime: A, mtime: M) {
  return <P extends fs.PathLike>(pathLike: P) =>
    taskEither.tryCatch(
      () =>
        new Promise<P>((resolve, reject) => {
          fs.utimes(pathLike, atime, mtime, (e) =>
            !e ? resolve(pathLike) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
