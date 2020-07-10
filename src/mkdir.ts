import { taskEither, option } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";
import { TaskEitherNode, ReaderTaskEitherNode } from "./util/types/fp";
import { MakeDirectoryOptions } from "./util/options/make-directory-options";

export function _mkdir(
  pathLike: fs.PathLike,
  options: MakeDirectoryOptions
): TaskEitherNode {
  return taskEither.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        fs.mkdir(pathLike, options, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
}

export function mkdir(
  pathLike: fs.PathLike,
  options?: MakeDirectoryOptions
): TaskEitherNode;

export function mkdir(
  options?: MakeDirectoryOptions
): ReaderTaskEitherNode<fs.PathLike>;

export function mkdir(
  a?: fs.PathLike | MakeDirectoryOptions,
  b?: MakeDirectoryOptions
) {
  if (a === undefined || b === undefined) {
    const options = {};
    return (pathLike: fs.PathLike) => _mkdir(pathLike, options);
  }

  const pathLike = a as fs.PathLike;
  const options = b as MakeDirectoryOptions;
  return _mkdir(pathLike, options);
}
