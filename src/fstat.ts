/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { ReaderTaskEitherNode } from "./util/types/fp";

/**
 * @since 0.0.0
 */
export const fstat: ReaderTaskEitherNode<FileDescriptor, _fs.Stats> = (
  fileDescriptor
) => {
  return taskEither.tryCatch(
    () =>
      new Promise<_fs.Stats>((resolve, reject) => {
        _fs.fstat(fileDescriptor, (e, stats) =>
          !e ? resolve(stats) : reject(e)
        );
      }),
    enforceErrnoException
  );
};
