import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileDescriptor } from "./util";
import { ReaderTaskEitherNode } from "./util/types/fp";

export const fsync: ReaderTaskEitherNode<FileDescriptor> = (fileDescriptor) =>
  taskEither.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        fs.fsync(fileDescriptor, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
