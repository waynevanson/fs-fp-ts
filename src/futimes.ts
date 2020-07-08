import { taskEither } from "fp-ts";
import * as _fs from "fs";
import { enforceErrnoException, Time, FileDescriptor } from "./util";
import { ReaderTaskEitherNode, TaskEitherNode } from "./util/types/fp";

export function _futimes(
  fileDescriptor: FileDescriptor,
  accessTime: Time,
  modifyTime: Time
): TaskEitherNode {
  return taskEither.tryCatch(
    () =>
      new Promise<void>((resolve, reject) => {
        _fs.futimes(fileDescriptor, accessTime, modifyTime, (e) =>
          !e ? resolve() : reject(e)
        );
      }),
    enforceErrnoException
  );
}

export function futimes(
  accessTime: Time,
  modifyTime: Time
): ReaderTaskEitherNode<FileDescriptor>;

export function futimes(
  fileDescriptor: FileDescriptor,
  accessTime: Time,
  modifyTime: Time
): TaskEitherNode;

export function futimes(a: FileDescriptor | Time, b: Time, c?: Time) {
  // first overload
  if (c === undefined) {
    const accessTime = a as Time;
    const modifyTime = b;
    return (fileDescriptor: FileDescriptor) =>
      _futimes(fileDescriptor, accessTime, modifyTime);
  }

  // second overload
  const fileDescriptor = a as FileDescriptor;
  const accessTime = b;
  const modifyTime = c as Time;
  return _futimes(fileDescriptor, accessTime, modifyTime);
}
