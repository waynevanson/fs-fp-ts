import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileSystemFlags, Permissions } from "../util";

export type AppendFileOptions = {
  encoding?: BufferEncoding;
  flags?: FileSystemFlags;
  mode?: Permissions;
};

export function appendFile<O extends AppendFileOptions>(options: O) {
  return <
    T extends fs.PathLike | number = never,
    U extends string | Uint8Array = never
  >(
    path: T,
    data: U
  ) =>
    taskEither.tryCatch(
      () =>
        new Promise<T>((resolve, reject) => {
          fs.appendFile(path, data, options, (e) => {
            !e ? resolve(path) : reject(e);
          });
        }),
      enforceErrnoException
    );
}
appendFile({ flags: "a" });
