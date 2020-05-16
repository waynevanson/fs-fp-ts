/**
 * @since 0.0.0
 */
import * as fs from "fs";
import { taskEither } from "fp-ts";
import { enforceErrnoException, FileSystemFlags, Permissions } from "../util";

/**
 * @since 0.0.0
 */
export type WriteFileOptions = {
  flags?: FileSystemFlags;
  mode?: Permissions;
};

/**
 * @since 0.0.0
 */
export function writeFile<O extends WriteFileOptions>(options: O) {
  return <
    T extends fs.PathLike | number,
    U extends string | NodeJS.ArrayBufferView
  >(
    path: T,
    data: U
  ) => {
    return taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.writeFile(path, data, options, (e) =>
            !e ? resolve(path) : reject(e)
          );
        }),
      enforceErrnoException
    );
  };
}
