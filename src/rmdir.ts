import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "./util";
import { TaskEitherNode } from "./util/types/fp";

export type RmdirOptions =
  | { recursive: false }
  | { recursive: true; maxRetries?: number; retryDelay?: number };

export function rmdir(
  pathLike: fs.PathLike,
  options: RmdirOptions = { recursive: false }
): TaskEitherNode {
  return taskEither.tryCatch(
    () =>
      new Promise((resolve, reject) => {
        fs.rmdir(pathLike, options, (e) => (!e ? resolve() : reject(e)));
      }),
    enforceErrnoException
  );
}
