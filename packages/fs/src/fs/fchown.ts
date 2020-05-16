/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

/**
 * @since 0.0.0
 */
export function fchown<U extends number, G extends number>(uid: U, gid: G) {
  return <T extends number>(fileDescriptor: T) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.fchown(fileDescriptor, uid, gid, (e) =>
            !e ? resolve(fileDescriptor) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
