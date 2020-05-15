import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

export function fstat<T extends number>(fileDescriptor: T) {
  return taskEither.tryCatch(
    () =>
      new Promise<fs.Stats>((resolve, reject) => {
        fs.fstat(fileDescriptor, (e, stats) =>
          !e ? resolve(stats) : reject(e)
        );
      }),
    enforceErrnoException
  );
}
