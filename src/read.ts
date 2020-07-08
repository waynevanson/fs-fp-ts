import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";

export type ReadOptions = {
  offset: number;
  length: number;
  position: number | "current";
};

export function read<O extends ReadOptions>(options: O) {
  const { length, offset, position } = options;
  return <T extends number, U extends NodeJS.ArrayBufferView>(
    fd: T,
    buffer: U
  ) =>
    taskEither.tryCatch(
      () =>
        new Promise<[T, U, number]>((resolve, reject) => {
          fs.read(
            fd,
            buffer,
            offset,
            length,
            position === "current" ? null : position,
            (e, bytesRead: number, newBuffer: U) =>
              !e ? resolve([fd, newBuffer, bytesRead]) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
