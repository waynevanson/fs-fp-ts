/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileSystemFlags, Permissions } from "./util";

/**
 * @since 0.0.0
 */
export type AppendFileOptions = {
  encoding?: BufferEncoding;
  flags?: FileSystemFlags;
  mode?: Permissions;
};

/**
 * @summary
 *
 * @since 0.0.0
 */
export function appendFile<O extends AppendFileOptions>(options: O) {
  return <
    T extends fs.PathLike | number = never,
    U extends string | Uint8Array = never
  >(
    pathLikeOrFileDescriptor: T,
    data: U
  ) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.appendFile(pathLikeOrFileDescriptor, data, options, (e) => {
            !e ? resolve(pathLikeOrFileDescriptor) : reject(e);
          });
        }),
      enforceErrnoException
    );
}
