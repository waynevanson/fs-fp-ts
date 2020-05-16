/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

/**
 * @since 0.0.0
 */
export function link<U extends fs.PathLike>(existingPath: U) {
  return <T extends fs.PathLike>(newPath: T) =>
    taskEither.tryCatch(
      () =>
        new Promise((resolve, reject) => {
          fs.link(existingPath, newPath, (e) =>
            !e ? resolve(newPath) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
