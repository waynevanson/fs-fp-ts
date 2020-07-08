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
export const fdatasync: ReaderTaskEitherNode<FileDescriptor> = (
  fileDescriptor
) =>
  taskEither.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        fs.fdatasync(fileDescriptor, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
