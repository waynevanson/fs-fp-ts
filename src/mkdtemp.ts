import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";
import { TaskEither } from "fp-ts/lib/TaskEither";

export function mkdtemp<O extends "buffer">(
  options: O
): (prefix: string) => TaskEither<NodeJS.ErrnoException, Buffer>;

export function mkdtemp<O extends BufferEncoding>(
  options: O
): (prefix: string) => TaskEither<NodeJS.ErrnoException, string>;

export function mkdtemp<O extends BufferEncoding | "buffer">(options: O) {
  return (prefix: string) =>
    taskEither.tryCatch(
      () =>
        new Promise<string | Buffer>((resolve, reject) => {
          fs.mkdtemp(prefix, options, (e, folder) =>
            !e ? resolve(folder) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
