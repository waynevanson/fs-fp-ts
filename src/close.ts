import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { ReaderTaskEitherNode } from "./util/types/fp";

/**
 * @summary
 * Closes a file descriptor
 */
export const close: ReaderTaskEitherNode<FileDescriptor> = (fileDescriptor) =>
  taskEither.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        fs.close(fileDescriptor, (e) => (!e ? resolve() : reject));
      }),
    enforceErrnoException
  );
