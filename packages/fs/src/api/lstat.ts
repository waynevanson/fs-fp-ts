import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

export function lstat<T extends fs.PathLike>(path: T) {
  return taskEither.tryCatch(
    () =>
      new Promise<fs.Stats>((resolve, reject) => {
        fs.lstat(path, (e, stats) => (!e ? resolve(stats) : reject(e)));
      }),
    enforceErrnoException
  );
}
