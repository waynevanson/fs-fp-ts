/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";

/**
 * @since 0.0.0
 */
export function lchmod(permissions: number) {
  return <T extends fs.PathLike>(path: T) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.lchmod(path, permissions, (e) => {
            !e ? resolve(path) : reject(e);
          });
        }),
      enforceErrnoException
    );
}
