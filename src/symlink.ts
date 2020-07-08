import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";
/**
 * @todo research fs.symlink
 * @since 0.0.0
 */
export function symlink() {
  return () =>
    taskEither.tryCatch(
      () =>
        new Promise((resolve, reject) => {
          fs.symlink;
        }),
      enforceErrnoException
    );
}
