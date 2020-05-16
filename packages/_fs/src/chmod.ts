/**
 * @since 0.0.0
 */
import * as fs from "fs";
import { taskEither } from "fp-ts";
import { enforceErrnoException, Permissions } from "./util";

/**
 * @since 0.0.0
 */
export function chmod<N extends Permissions>(permissions: N) {
  return <T extends fs.PathLike>(pathLike: T) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.chmod(pathLike, permissions, (e) => {
            !e ? resolve(pathLike) : reject(e);
          });
        }),
      enforceErrnoException
    );
}
