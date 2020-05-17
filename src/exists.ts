/**
 * @since 0.0.0
 */
import * as fs from "fs";
import * as access from "./access";
import { pipe } from "fp-ts/lib/pipeable";
import { taskEither, task } from "fp-ts";

/**
 * @since 0.0.0
 */
export function exists<P extends fs.PathLike>(pathLike: P) {
  return pipe(
    pathLike,
    access.access("visible"),
    taskEither.fold(
      () => task.of(false),
      () => task.of(true)
    )
  );
}
