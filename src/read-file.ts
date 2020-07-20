import { taskEither as TE } from "fp-ts";
import * as _fs from "fs";
import {
  enforceErrnoException,
  isOptions,
  PathLikeOrFileDescriptor,
} from "./util";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";
import { BufferOrStringOptions } from "./util/types/options";

export function _readFile<E extends BufferEncoding>(
  pathLikeOrFileDescriptor: PathLikeOrFileDescriptor,
  options: BufferOrStringOptions<E>
): TaskEitherNode<BufferOrStringResult<E>> {
  const encoding = options.encoding === undefined ? null : options.encoding;

  return TE.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        _fs.readFile(
          pathLikeOrFileDescriptor,
          { flag: options.flag, encoding },
          (e, data) => (!e ? resolve(data as any) : reject(e))
        );
      }),
    enforceErrnoException
  );
}

export type BufferOrStringResult<E extends BufferEncoding> = E extends never
  ? Buffer
  : string;

export function readFile<E extends BufferEncoding = never>(
  options?: BufferOrStringOptions<E>
): ReaderTaskEitherNode<PathLikeOrFileDescriptor, BufferOrStringResult<E>>;

export function readFile<E extends BufferEncoding = never>(
  pathLikeOrFileDescriptor: PathLikeOrFileDescriptor,
  options?: BufferOrStringOptions<E>
): TaskEitherNode<BufferOrStringResult<E>>;

export function readFile<E extends BufferEncoding = never>(
  a?: PathLikeOrFileDescriptor | BufferOrStringOptions<E>,
  b?: BufferOrStringOptions<E>
) {
  // first overload
  if (isOptions(a)) {
    const options = a ?? ({} as BufferOrStringOptions<E>);
    return (z: PathLikeOrFileDescriptor) => _readFile(z, options);
  }

  if (isOptions(b)) {
    const options = b ?? ({} as BufferOrStringOptions<E>);
    return _readFile(a as Exclude<typeof a, BufferOrStringOptions<E>>, options);
  }
}
