/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";
import { ReaderTaskEitherNode } from "./util/types/fp";

/**
 *
 * @summary
 * Copies a file from `src` to `dest`, which is the tuple `[src, dest]`.
 *
 * @todo
 *  Check if the last two here are still valid. type defs don't say they are.
 *
 *  fs.constants.COPYFILE_EXCL: The copy operation will fail if dest already exists.
 *  fs.constants.COPYFILE_FICLONE: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then a fallback copy mechanism is used.
 *  fs.constants.COPYFILE_FICLONE_FORCE: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then the operation will fail.
 *
 * @since 0.0.0
 */
export function copyFile(
  replace = false
): ReaderTaskEitherNode<[fs.PathLike, fs.PathLike]> {
  const flags = replace ? fs.constants.COPYFILE_EXCL : null;
  return ([src, dest]) =>
    taskEither.tryCatch(
      () =>
        new Promise<void>((resolve, reject) => {
          fs.copyFile(src, dest, flags, (e) => (!e ? resolve() : reject(e)));
        }),
      enforceErrnoException
    );
}
