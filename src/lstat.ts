import { taskEither } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException } from "./util";

export function lstat(path: _fs.PathLike) {
  return taskEither.tryCatch(
    () =>
      new Promise<_fs.Stats>((resolve, reject) => {
        _fs.lstat(path, (e, stats) => (!e ? resolve(stats) : reject(e)));
      }),
    enforceErrnoException
  );
}
