/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { ReaderTaskEitherNode } from "./util/types/fp";

/**
 * @since 0.0.0
 */
export function fchown(
  uid: number,
  gid: number
): ReaderTaskEitherNode<FileDescriptor> {
  return (fileDescriptor) =>
    taskEither.tryCatch(
      () =>
        new Promise<void>((resolve, reject) => {
          fs.fchown(fileDescriptor, uid, gid, (e) =>
            !e ? resolve() : reject(e)
          );
        }),
      enforceErrnoException
    );
}
