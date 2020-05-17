/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, Time } from "./util";

/**
 * @since 0.0.0
 */
export function futimes<A extends Time, B extends Time>(
  accessTime: A,
  modifyTime: B
) {
  return <T extends number>(fileDescriptor: T) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.futimes(fileDescriptor, accessTime, modifyTime, (e) =>
            !e ? resolve(fileDescriptor) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
