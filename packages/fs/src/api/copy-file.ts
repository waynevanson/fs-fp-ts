import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

export function copyFile(flags: number) {
  return <S extends fs.PathLike, D extends fs.PathLike>(src: S, dest: D) =>
    taskEither.tryCatch(
      () =>
        new Promise<[S, D]>((resolve, reject) => {
          fs.copyFile(src, dest, flags, (e) =>
            !e ? resolve([src, dest]) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
