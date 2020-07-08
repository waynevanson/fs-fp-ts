/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, Time, FileDescriptor } from "./util";
import { ReaderTaskEitherNode } from "./util/types/fp";

/**
 * @since 0.0.0
 */
export function futimes(
  accessTime: Time,
  modifyTime: Time
): ReaderTaskEitherNode<FileDescriptor> {
  return (fileDescriptor) =>
    taskEither.tryCatch(
      () =>
        new Promise<void>((resolve, reject) => {
          fs.futimes(fileDescriptor, accessTime, modifyTime, (e) =>
            !e ? resolve() : reject(e)
          );
        }),
      enforceErrnoException
    );
}
