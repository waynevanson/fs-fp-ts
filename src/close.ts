import { taskEither as TE } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { ReaderTaskEitherNode } from "./util/types/fp";

/**
 * @summary
 * Closes a file descriptor
 */
export const close: ReaderTaskEitherNode<FileDescriptor> = (fileDescriptor) =>
  TE.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.close(fileDescriptor, (e) => (!e ? resolve() : reject));
      }),
    enforceErrnoException
  );
