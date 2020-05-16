/**
 * @summary
 * Hello world
 *
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, Time } from "../util";

/**
 * @since 0.0.0
 */
export function lutimes<A extends Time, B extends Time>(
  accessTime: A,
  modifyTime: B
) {
  return <T extends fs.PathLike>(path: T) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.lutimes(path, accessTime, modifyTime, (e) =>
            !e ? resolve(path) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
