import { taskEither } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { ReaderTaskEitherNode } from "./util/types/fp";

export const fsync: ReaderTaskEitherNode<FileDescriptor> = (fileDescriptor) =>
  taskEither.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.fsync(fileDescriptor, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
