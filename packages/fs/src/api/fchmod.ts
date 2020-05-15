import * as fs from "fs";
import { taskEither } from "fp-ts";
import { enforceErrnoException } from "../util";

export function fchmod(permissions: number) {
  return <T extends number>(fileDescriptot: T) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.fchmod(fileDescriptot, permissions, (e) => {
            !e ? resolve(fileDescriptot) : reject(e);
          });
        }),
      enforceErrnoException
    );
}
