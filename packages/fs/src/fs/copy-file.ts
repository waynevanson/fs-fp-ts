/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileSystemFlags } from "../util";

/**
 * @todo
 *
 *  fs.constants.COPYFILE_EXCL: The copy operation will fail if dest already exists.
 *  fs.constants.COPYFILE_FICLONE: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then a fallback copy mechanism is used.
 *  fs.constants.COPYFILE_FICLONE_FORCE: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then the operation will fail.
 *
 * @since 0.0.0
 */
export function copyFile<F extends number>(flags: F) {
  return <S extends fs.PathLike, D extends fs.PathLike>(src: S, dest: D) =>
    taskEither.tryCatch(
      () =>
        new Promise<[S, D]>((resolve, reject) => {
          fs.copyFile(src, dest, flags, (e) =>
            !e ? resolve([src, dest]) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
