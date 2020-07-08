/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { ReaderTaskEitherNode } from "./util/types/fp";

/**
 *
 * @param length default is 0
 */
export function ftruncate(
  length?: number
): ReaderTaskEitherNode<FileDescriptor> {
  return (fileDescriptor) =>
    taskEither.tryCatch(
      () =>
        new Promise((resolve, reject) => {
          fs.ftruncate(fileDescriptor, length, (e) =>
            !e ? resolve() : reject(e)
          );
        }),
      enforceErrnoException
    );
}
