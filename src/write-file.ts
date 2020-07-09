import * as fs from "fs";
import { taskEither } from "fp-ts";
import { enforceErrnoException } from "./util";

export function writeFile(options: any) {
  return <
    T extends fs.PathLike | number,
    U extends string | NodeJS.ArrayBufferView
  >(
    path: T,
    data: U
  ) => {
    return taskEither.tryCatch(
      () =>
        new Promise((resolve, reject) => {
          fs.writeFile(path, data, options, (e) =>
            !e ? resolve() : reject(e)
          );
        }),
      enforceErrnoException
    );
  };
}
