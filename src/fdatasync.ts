/**
 * @since 0.0.0
 */
import { taskEither as TE } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { ReaderTaskEitherNode } from "./util/types/fp";

/**
 * @since 0.0.0
 */
export const fdatasync: ReaderTaskEitherNode<FileDescriptor> = (
  fileDescriptor
) =>
  TE.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.fdatasync(fileDescriptor, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
