/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { FilePermissions } from "./util/types/file-permissions";
import { ReaderTaskEitherNode } from "./util/types/fp";

/**
 * @since 0.0.0
 */
export function fchmod(
  permissions: FilePermissions
): ReaderTaskEitherNode<FileDescriptor> {
  return (fileDescriptor) =>
    taskEither.tryCatch(
      () =>
        new Promise<void>((resolve, reject) => {
          fs.fchmod(fileDescriptor, permissions, (e) => {
            !e ? resolve() : reject(e);
          });
        }),
      enforceErrnoException
    );
}
