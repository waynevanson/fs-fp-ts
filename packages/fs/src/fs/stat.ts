/**
 * @since 0.0.0
 */
import { taskEither } from "fp-ts";
import * as fs from "fs";
import { enforceErrnoException } from "../util";
import { TaskEither } from "fp-ts/lib/TaskEither";

/**
 * @since 0.0.0
 */
export function stat<T extends "BigIntStats">(
  type: T
): <P extends fs.PathLike>(
  pathLike: P
) => TaskEither<NodeJS.ErrnoException, fs.BigIntStats>;

/**
 * @since 0.0.0
 */
export function stat<T extends "Stats">(
  type: T
): <P extends fs.PathLike>(
  pathLike: P
) => TaskEither<NodeJS.ErrnoException, fs.Stats>;

/**
 * @since 0.0.0
 */
export function stat<T extends "BigIntStats" | "Stats">(type: T) {
  return <P extends fs.PathLike>(pathLike: P) =>
    taskEither.tryCatch(
      () =>
        new Promise((resolve, reject) => {
          fs.stat(pathLike, { bigint: type === "BigIntStats" }, (e, stats) =>
            !e ? resolve(stats) : reject(e)
          );
        }),
      enforceErrnoException
    );
}
