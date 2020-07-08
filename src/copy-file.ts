/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException } from "./util";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export type CopyFileOptions = {
  /**
   * @summary
   * Replace the file if the location exists.
   *
   * @default true
   */
  replace: boolean;
};

function _copyFile(
  src: _fs.PathLike,
  dest: _fs.PathLike,
  { replace }: CopyFileOptions
) {
  const flags = !replace ? _fs.constants.COPYFILE_EXCL : 0;
  return taskEither.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.copyFile(src, dest, flags, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
}

export function copyFile(
  options?: CopyFileOptions
): (src: _fs.PathLike, dest: _fs.PathLike) => TaskEitherNode;

export function copyFile(
  src: _fs.PathLike,
  dest: _fs.PathLike,
  options?: CopyFileOptions
): TaskEitherNode;

/**
 * @summary
 * Copies a file from `src` to `dest`, which is the tuple `[src, dest]`.
 */
export function copyFile(
  a?: CopyFileOptions | _fs.PathLike,
  b?: _fs.PathLike,
  c?: CopyFileOptions
) {
  // first overload
  if (a === undefined) {
    const options: CopyFileOptions = { replace: true };
    return (src: _fs.PathLike, dest: _fs.PathLike) =>
      _copyFile(src, dest, options);
  }

  // first overload
  if (b === undefined) {
    const options = a as CopyFileOptions;
    return (src: _fs.PathLike, dest: _fs.PathLike) =>
      _copyFile(src, dest, options);
  }

  // second overload
  const src = a as _fs.PathLike;
  const dest = b as _fs.PathLike;
  const options = c as CopyFileOptions;
  return _copyFile(src, dest, options);
}
