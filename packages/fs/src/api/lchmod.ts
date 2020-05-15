import * as fs from "fs";
import { taskEither } from "fp-ts";
import { enforceErrnoException } from "../util";

export function lchmod(permissions: number) {
  return <T extends fs.PathLike>(path: T) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.lchmod(path, permissions, (e) => {
            !e ? resolve(path) : reject(e);
          });
        }),
      enforceErrnoException
    );
}
