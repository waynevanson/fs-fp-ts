import { taskEither as TE } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";
import { TaskEitherNode } from "./util/types/fp";

export function _mkdtemp(prefix: string, as: BufferEncodingOrBuffer) {
  const encoding = as === "Buffer" ? null : as;
  return TE.tryCatch(
    () =>
      new Promise<string | Buffer>((resolve, reject) => {
        fs.mkdtemp(prefix, encoding, (e, folder) =>
          !e ? resolve(folder) : reject(e)
        );
      }),
    enforceErrnoException
  );
}

export type BufferEncodingOrBuffer = BufferEncoding | "Buffer";

export type CreateBufferOrString<
  T extends BufferEncodingOrBuffer
> = T extends "Buffer" ? Buffer : string;

export function mkdtemp<T extends BufferEncodingOrBuffer>(
  as?: BufferEncoding | "Buffer"
): (prefix: string) => TaskEitherNode<CreateBufferOrString<T>>;

export function mkdtemp<T extends BufferEncodingOrBuffer>(
  prefix: string,
  as?: BufferEncoding | "Buffer"
): TaskEitherNode<CreateBufferOrString<T>>;

export function mkdtemp<T extends BufferEncodingOrBuffer = "Buffer">(
  a?: T | string,
  b?: T
) {
  // first overload
  if (a === undefined) {
    return (prefix: string) => _mkdtemp(prefix, "Buffer");
  }

  if (b === undefined) {
    const as = a as T;
    return (prefix: string) => _mkdtemp(prefix, as);
  }

  const prefix = a as string;
  const as = b as T;
  return _mkdtemp(prefix, as);
}
