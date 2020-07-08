/**
 * @since 0.0.0
 */
import { reader as R, task as T, taskEither } from "fp-ts";
import { flow } from "fp-ts/lib/function";
import * as _fs from "fs";
import { access } from "./access";

/**
 * @summary
 * Returns a boolean if the path exists.
 * If false should be an error for your code, use `access` instead.
 */
export const exists: R.Reader<_fs.PathLike, T.Task<boolean>> = flow(
  access(["visible"]),
  taskEither.fold(
    () => T.of(false),
    () => T.of(true)
  )
);
