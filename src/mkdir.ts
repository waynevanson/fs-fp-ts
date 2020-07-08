import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";

export function mkdir<O extends fs.MakeDirectoryOptions>(options: O) {
  return <T extends fs.PathLike>(path: T) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.mkdir(path, options, (e) => (!e ? resolve(path) : reject(e)));
        }),
      enforceErrnoException
    );
}
