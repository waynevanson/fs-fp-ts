import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

export function fsync<T extends number>(fileDescriptor: T) {
  return taskEither.tryCatch(
    () =>
      new Promise<T>((resolve, reject) => {
        fs.fsync(fileDescriptor, (e) =>
          !e ? resolve(fileDescriptor) : reject(e)
        );
      }),
    enforceErrnoException
  );
}
