import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";

export function chown<U extends number, G extends number>(uid: U, gid: G) {
  return <T extends fs.PathLike>(path: T) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.chown(path, uid, gid, (e) => (!e ? resolve(path) : reject(e)));
        }),
      enforceErrnoException
    );
}
