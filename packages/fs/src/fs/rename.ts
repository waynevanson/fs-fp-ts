/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

/**
 * @since 0.0.0
 */
export function rename<N extends fs.PathLike, O extends fs.PathLike>(
  f: (currentPath: O) => N
) {
  return (currentPath: O) => {
    const newPath = f(currentPath);
    return taskEither.tryCatch(
      () =>
        new Promise<N>((resolve, reject) => {
          fs.rename(currentPath, newPath, (e) =>
            !e ? resolve(newPath) : reject(e)
          );
        }),
      enforceErrnoException
    );
  };
}
