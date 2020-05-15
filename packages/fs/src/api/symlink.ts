import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";
/**
 * @todo research fs.symlink
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
