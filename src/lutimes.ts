import { taskEither } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException, Time } from "./util";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _lutimes(
  pathLike: _fs.PathLike,
  accessTime: Time,
  modifyTime: Time
): TaskEitherNode {
  return taskEither.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.lutimes(pathLike, accessTime, modifyTime, (e) =>
          !e ? resolve() : reject(e)
        );
      }),
    enforceErrnoException
  );
}

export function lutimes(
  accessTime: Time,
  modifyTime: Time
): ReaderTaskEitherNode<_fs.PathLike>;

export function lutimes(
  pathLike: _fs.PathLike,
  accessTime: Time,
  modifyTime: Time
): TaskEitherNode;

export function lutimes(a: _fs.PathLike | Time, b: Time, c?: Time) {
  // first overload
  if (c === undefined) {
    const accessTime = a as Time;
    const modifyTime = b;
    return (pathLike: _fs.PathLike) =>
      _lutimes(pathLike, accessTime, modifyTime);
  }

  // second overload
  const pathLike = a as _fs.PathLike;
  const accessTime = b;
  const modifyTime = c as Time;
  return _lutimes(pathLike, accessTime, modifyTime);
}
