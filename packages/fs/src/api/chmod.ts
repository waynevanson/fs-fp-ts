import * as fs from "fs";
import { taskEither } from "fp-ts";
import { enforceErrnoException } from "../util";

export function chmod(permissions: number) {
  return <T extends fs.PathLike>(pathLike: T) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.chmod(pathLike, permissions, (e) => {
            !e ? resolve(pathLike) : reject(e);
          });
        }),
      enforceErrnoException
    );
}
