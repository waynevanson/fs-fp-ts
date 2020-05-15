import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException, FileSystemFlags } from "../util";

export function readFileBuffer(flag?: FileSystemFlags) {
  return <P extends fs.PathLike | number>(path: P) =>
    taskEither.tryCatch(
      () =>
        new Promise<Buffer>((resolve, reject) => {
          fs.readFile(path, { encoding: null, flag }, (e, buffer) =>
            !e ? resolve(buffer) : reject(e)
          );
        }),
      enforceErrnoException
    );
}

export function readFileString<T extends BufferEncoding>(
  encoding?: T,
  flag?: FileSystemFlags
) {
  return <P extends fs.PathLike | number>(path: P) =>
    taskEither.tryCatch(
      () =>
        new Promise<string>((resolve, reject) => {
          fs.readFile(path, { encoding, flag }, (e, data) =>
            !e ? resolve(data) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
