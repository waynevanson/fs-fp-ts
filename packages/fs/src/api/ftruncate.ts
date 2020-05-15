import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

export function ftruncate<N extends number>(length: N) {
  return <T extends number>(fileDescriptor: T) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.ftruncate(fileDescriptor, (e) =>
            !e ? resolve(fileDescriptor) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
