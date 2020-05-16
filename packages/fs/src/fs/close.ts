/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileDescriptor } from "../util";

/**
 * @since 0.0.0
 */
export function close<T extends FileDescriptor>(fileDescriptor: T) {
  return taskEither.tryCatch(
    () =>
      new Promise<T>((resolve, reject) => {
        fs.close(fileDescriptor, (e) =>
          !e ? resolve(fileDescriptor) : reject
        );
      }),
    enforceErrnoException
  );
}
